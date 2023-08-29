import { KycStatus } from "@domain/shared/primitives"
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
import Account from "./account"

interface KycInfoAttributes {
  address: string
  phone: string
  businessName: string
  bankName?: string
  bankAccountNumber?: string
  bankAccountName?: string
  status: string
  accountId: Account["id"]
}

@Table({ tableName: "kycInfo", timestamps: true })
export class KycInfo extends Model<KycInfoAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string

  @Column(DataType.STRING)
  address!: string

  @Column(DataType.STRING)
  phone!: string

  @Column(DataType.STRING)
  businessName!: string

  @Column(DataType.STRING)
  bankName?: string

  @Column(DataType.STRING)
  bankAccountNumber?: string

  @Column(DataType.STRING)
  bankAccountName?: string

  @Column({
    type: DataType.ENUM({ values: Object.values(KycStatus) }),
    defaultValue: KycStatus.PENDING,
  })
  status!: KycStatus

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId!: Account["id"]

  @BelongsTo(() => Account)
  account!: Account

  @BeforeCreate
  static addUUID(instance: KycInfo) {
    instance.id = uuidv4()
  }
}

export default KycInfo
