import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"
import { v4 as uuidv4 } from "uuid"

import { TransactionMetaType } from "@helpers/types"

import Transaction from "./transaction"

interface TransactionMetadataAttributes {
  id: string
  type: TransactionMetaType
  hash?: string
  narration: string
  invoice?: string
  address?: string
  transactionId: Transaction["id"]
}

@Table({ tableName: "transactionMetadata", timestamps: true })
export class TransactionMetadata extends Model<TransactionMetadataAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @Column(DataType.ENUM({ values: Object.values(TransactionMetaType) }))
  type!: TransactionMetaType

  @Column(DataType.TEXT)
  narration!: string

  @Column(DataType.TEXT)
  hash?: string

  @Column(DataType.TEXT)
  invoice?: string

  @Column(DataType.STRING)
  address?: string

  @ForeignKey(() => Transaction)
  @Column(DataType.UUID)
  transactionId!: Transaction["id"]

  @BelongsTo(() => Transaction)
  transaction!: Transaction

  @BeforeCreate
  static addUUID(instance: TransactionMetadata) {
    instance.id = uuidv4()
  }
}

export default TransactionMetadata
