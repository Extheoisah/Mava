import "reflect-metadata" // We need this in order to use @Decorators

import express from "express"
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
} from "sequelize"

import config from "@config"
import expressApp from "@server/loaders/express"
import Logger from "@server/loaders/logger"
import { sequelize } from "@services/db/sequelize"

const app = express()
async function startServer() {
  expressApp({ app })

  async function synchronizeModels() {
    try {
      await sequelize.sync()
      Logger.info("Tables have been created.")
      console.log("created tables")
    } catch (error) {
      switch (error) {
        case UniqueConstraintError:
          Logger.error("A unique constraint error occurred:", error)
          break
        case ForeignKeyConstraintError:
          Logger.error("A foreign key constraint error occurred:", error)
          break
        case DatabaseError:
          Logger.error("A general database error occurred:", error)
          break
        default:
          break
      }
    }
  }

  synchronizeModels()

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
    })
    .on("error", (err) => {
      Logger.error(err)
      process.exit(1)
    })
}

startServer()
