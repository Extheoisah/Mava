import "module-alias/register";
import "reflect-metadata"; // We need this in order to use @Decorators

import express from "express";
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
} from "sequelize";

import config from "@config";
import expressApp from "@loaders/express";
import Logger from "@loaders/logger";
import { sequelize } from "@services/db/sequelize";

async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  expressApp({ app });

  async function synchronizeModels() {
    try {
      await sequelize.sync();
      Logger.info("Tables have been created.");
    } catch (error) {
      switch (error) {
        case UniqueConstraintError:
          Logger.error("A unique constraint error occurred:", error);
          break;
        case ForeignKeyConstraintError:
          Logger.error("A foreign key constraint error occurred:", error);
          break;
        case DatabaseError:
          Logger.error("A general database error occurred:", error);
          break;
        default:
          break;
      }
    }
  }

  synchronizeModels();

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
