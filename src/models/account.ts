import {
  BeforeCreate,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { AccountStatus, AccountType } from "@helpers/types";

import { Checkpoint, Wallet, KycInfo } from "./";

interface AccountAttributes {
  id: string;
  type: AccountType;
  status: AccountStatus;
  email: string;
  password: string;
  name: string;
}

@Table({ tableName: "account", timestamps: true })
export class Account extends Model<AccountAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.ENUM({ values: Object.values(AccountType) }))
  type!: AccountType;

  @Column(
    DataType.ENUM(
      AccountStatus.ACTIVE,
      AccountStatus.INACTIVE,
      AccountStatus.LOCKED
    )
  )
  status!: AccountStatus;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  name!: string;

  @HasOne(() => KycInfo, {
    foreignKey: "accountId",
    as: "KycInfoDetails",
  })
  kycInfoDetails!: KycInfo;

  @HasMany(() => Wallet, {
    foreignKey: "accountId",
    as: "WalletDetails",
  })
  walletDetails!: Wallet[];

  @HasMany(() => Checkpoint, {
    foreignKey: "accountId",
    as: "Checkpoints",
  })
  checkpoints!: Checkpoint[];

  @BeforeCreate
  static addUUID(instance: Account) {
    instance.id = uuidv4();
  }
}

export default Account;
