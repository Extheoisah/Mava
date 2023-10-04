import joi from "joi"
import { CreateUser } from "@domain/authentication/types"
import { CreateCustomError, InternalServerError } from "@server/middlewares/error"
import { sequelize } from "@services/db/sequelize"
import { AccountRepositoryByEmail } from "@services/sequelize/Account"
import { Account, Wallet } from "../../models"
import { WalletType } from "@domain/shared/primitives"
import LoggerInstance from "@server/loaders/logger"
import bcrypt from "bcrypt"
import { createJwtToken } from "./token"
import { CreateCustomSuccess, CustomSuccess } from "@server/middlewares/success"

export async function signUp(user: CreateUser): Promise<CustomSuccess> {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name: joi.string().required(),
  })

  const validation = schema.validate({
    email: user.email,
    password: user.password,
    name: user.name,
  })

  if (validation.error) {
    const error = new CreateCustomError(
      validation.error.details[0].message,
      422,
      "Validation Error",
    )
    throw error
  }
  const t = await sequelize.transaction()
  try {
    //check if user exist
    const userExist = await AccountRepositoryByEmail(user.email)
    if (userExist) {
      const error = new CreateCustomError(
        "unable to create an account with this email address",
        409,
      )
      throw error
    }
    //create user account
    const createdUser = await Account.create(
      {
        email: user.email,
        name: user.name,
        type: user.accountType,
        status: user.accountStatus,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
        id: "",
      },
      { transaction: t },
    )

    //create USD wallet
    await Wallet.create(
      { id: "", accountId: createdUser.id, type: WalletType.USD, balance: 0 },
      { transaction: t },
    )
    //create BTC wallet
    await Wallet.create(
      { id: "", accountId: createdUser.id, type: WalletType.BTC, balance: 0 },
      { transaction: t },
    )
    await t.commit()

    //get jwt token
    const token = createJwtToken({
      sub: createdUser.id,
      name: createdUser.name,
      admin: user.isAdmin,
    })
    //return response
    const response: CustomSuccess = new CreateCustomSuccess(
      "user created successfully",
      201,
      { token },
    )
    return response
  } catch (error: unknown) {
    //Roll back
    await t.rollback()
    //Throw error
    LoggerInstance.error("Error creating a new user %o:", error)
    if (error instanceof CreateCustomError) {
      throw error
    }
    const err = new InternalServerError()
    throw err
  }
}
