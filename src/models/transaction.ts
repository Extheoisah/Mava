import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { TargetType, TransactionStatus, TransactionType } from "@helpers/types";

import { Checkpoint, Wallet, TransactionMetadata } from "./";

interface TransactionAttributes {
  id: string;
  walletId: Wallet["id"];
  checkpointId: Checkpoint["id"];
  amount: number;
  fees: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  target: TargetType;
}

@Table({ tableName: "transaction", timestamps: true })
export class Transaction extends Model<TransactionAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Wallet)
  @Column(DataType.UUID)
  walletId!: Wallet["id"];

  @ForeignKey(() => Checkpoint)
  @Column(DataType.UUID)
  checkpointId!: Checkpoint["id"];

  @Column(DataType.FLOAT)
  amount!: number;

  @Column(DataType.FLOAT)
  fees!: number;

  @Column(DataType.STRING)
  currency!: string;

  @Column(DataType.ENUM({ values: Object.values(TransactionType) }))
  type!: TransactionType;

  @Column(DataType.ENUM({ values: Object.values(TransactionStatus) }))
  status!: TransactionStatus;

  @Column(DataType.ENUM({ values: Object.values(TargetType) }))
  target!: TargetType;

  @HasOne(() => TransactionMetadata)
  transactionMetadata!: TransactionMetadata;

  @BelongsTo(() => Wallet)
  wallet!: Wallet;

  @BelongsTo(() => Checkpoint)
  checkpoint!: Checkpoint;

  @BeforeCreate
  static addUUID(instance: Transaction) {
    instance.id = uuidv4();
  }
}

export default Transaction;