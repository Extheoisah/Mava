import { config } from "dotenv";
config();
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || "mava",
  dialect: "postgres",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "mysecretpassword",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  models: [__dirname + "../../models"],
});
