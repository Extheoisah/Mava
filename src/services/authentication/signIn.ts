import joi from "joi"
import bcrypt from "bcrypt"
import { LoginUser } from "@domain/authentication/types"
import { CreateCustomSuccess, CustomSuccess } from "@server/middlewares/success"
import { CreateCustomError, InternalServerError } from "@server/middlewares/error"
import { AccountRepositoryByEmail } from "@services/sequelize/Account"
import LoggerInstance from "@server/loaders/logger"
import { createJwtToken } from "./token"
import { AccountType } from "@domain/shared/primitives"

export async function signIn(cred: LoginUser): Promise<CustomSuccess> {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })

  const validation = schema.validate({
    email: cred.email,
    password: cred.password,
  })

  if (validation.error) {
    const error = new CreateCustomError(
      validation.error.details[0].message,
      422,
      "Validation Error",
    )
    throw error
  }

  try {
    const user = await AccountRepositoryByEmail(cred.email)
    if (!user) {
      const error = new CreateCustomError("invalid email or password", 404)
      throw error
    }
    const validatePassword = await bcrypt.compare(cred.password, user.password)
    if (!validatePassword) {
      const error = new CreateCustomError("invalid email or password", 404)
      throw error
    }

    const token = createJwtToken({
      sub: user.id,
      name: user.name,
      admin: user.type === AccountType.ADMIN ? true : false,
    })

    const response: CustomSuccess = new CreateCustomSuccess("login successfull", 200, {
      token,
    })
    return response
  } catch (error: any) {
    //Throw error
    LoggerInstance.error("Error creating a new user %o:", error)
    if (error.message && error.status) throw error
    const err = new InternalServerError()
    throw err
  }
}
