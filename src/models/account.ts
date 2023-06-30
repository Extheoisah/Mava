import {
  BeforeCreate,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { AccountStatus, AccountType } from "@helpers/types";

import { KycInfo } from "./kycinfo";

interface AccountAttributes {
  id: string;
  type: AccountType;
  status: AccountStatus;
  email: string;
  password: string;
  name: string;
  kycInfoId: KycInfo["id"];
}

@Table
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

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @ForeignKey(() => KycInfo)
  @HasOne(() => KycInfo)
  @Column
  kycInfoId!: KycInfo["id"];

  @BeforeCreate
  static addUUID(instance: Account) {
    instance.id = uuidv4();
  }
}
