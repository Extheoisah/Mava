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
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

import { Account } from "./account";

interface CheckpointAttributes {
  id: string;
  accountId: Account["id"];
}

@Table
export class Checkpoint extends Model<CheckpointAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  accountId!: Account["id"];

  @BelongsTo(() => Account)
  account!: Account;

  @BeforeCreate
  static addUUID(instance: Checkpoint) {
    instance.id = uuidv4();
  }
}
