import { createHash } from "crypto"
import { v4 as uuidv4 } from "uuid"

export function genenrateTransactionId(): string {
  const date = new Date().getTime()
  const uuid = uuidv4()
  const content = `${date}${uuid}`
  const id = createHash("sha256").update(content).digest("hex")
  return `#${id}`
}
