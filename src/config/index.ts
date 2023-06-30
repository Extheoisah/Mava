import dotenv from "dotenv";
import { resolve } from "path";


interface Config {
  port: number;
  api: {
    prefix: string;
  };
  logs: {
    level: string;
  };
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({
  path: resolve(__dirname, '../../.env'),
});
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config: Config = {
  port: parseInt(process.env.PORT || "8000", 10),
  api: {
    prefix: "/api",
  },
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },
};

export default config;
