import { KycStatus } from "@helpers/types";
import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

interface KycInfoAttributes {
  address: string;
  phone: string;
  businessName: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  status: string;
}

@Table
export class KycInfo extends Model<KycInfoAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column
  address!: string;

  @Column
  phone!: string;

  @Column
  businessName!: string;

  @Column
  bankName?: string;

  @Column
  bankAccountNumber?: string;

  @Column
  bankAccountName?: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(KycStatus) }),
    defaultValue: KycStatus.PENDING,
  })
  status!: KycStatus;

  @BeforeCreate
  static addUUID(instance: KycInfo) {
    instance.id = uuidv4();
  }
}
