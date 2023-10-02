import LoggerInstance from "@server/loaders/logger"
import { Account } from "../../models/account"

export async function AccountRepository(id: string): Promise<Account | null> {
  try {
    const user = (await Account.findOne({
      where: { id },
    })) as Account
    return user
  } catch (error) {
    LoggerInstance.error(`User with id(${id}) not found`)
    return null
  }
}
