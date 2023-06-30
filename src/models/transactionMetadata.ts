import {
  BeforeCreate,
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { TransactionMetaType } from "@helpers/types";

import { Transaction } from "./transaction";

interface TransactionMetadataAttributes {
  id: string;
  type: TransactionMetaType;
  hash?: string;
  narration: string;
  invoice?: string;
  address?: string;
}

@Table
export class TransactionMetadata extends Model<TransactionMetadataAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.ENUM({ values: Object.values(TransactionMetaType) }))
  type!: TransactionMetaType;

  @Column(DataType.TEXT)
  narration!: string;

  @Column
  hash?: string;

  @Column
  invoice?: string;

  @Column
  address?: string;

  @HasOne(() => Transaction)
  transaction!: Transaction;

  @BeforeCreate
  static addUUID(instance: TransactionMetadata) {
    instance.id = uuidv4();
  }
}
