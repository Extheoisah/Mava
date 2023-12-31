import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"

import { WalletType } from "@domain/shared/primitives"

import Account from "./account"

interface WalletAttributes {
  id: string
  type: WalletType
  balance: number
  accountId: Account["id"]
}

@Table({ tableName: "wallet", timestamps: true })
export class Wallet extends Model<WalletAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id!: string

  @Column(DataType.ENUM({ values: Object.values(WalletType) }))
  type!: WalletType

  @Column(DataType.FLOAT)
  balance!: number

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId!: Account["id"]

  @BelongsTo(() => Account)
  account!: Account

  @BeforeCreate
  static addUUID(instance: Wallet) {
    instance.id = uuidv4()
  }
}

export default Wallet
