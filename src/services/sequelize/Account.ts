import LoggerInstance from "@server/loaders/logger"
import { Account } from "../../models/account"
import { CustomError, InternalServerError } from "@server/middlewares/error"

export async function AccountRepository(id: string): Promise<Account | CustomError> {
  try {
    const user = (await Account.findOne({
      where: { id },
    })) as Account
    return user
  } catch (error) {
    LoggerInstance.error(`User with id (${id}) not found`, error)
    const err = new InternalServerError()
    return err
  }
}

export async function AccountRepositoryByEmail(email: string): Promise<Account> {
  try {
    const user = (await Account.findOne({
      where: { email },
    })) as Account
    return user
  } catch (error) {
    LoggerInstance.error(`finding user with email (${email}) caused an error`, error)
    const err = new InternalServerError()
    throw err
  }
}
