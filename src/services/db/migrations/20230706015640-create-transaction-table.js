"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("transaction", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      walletId: {
        type: Sequelize.UUID,
        references: {
          model: "wallet",
          key: "id",
        },
      },
      checkpointId: {
        type: Sequelize.UUID,
        references: {
          model: "checkpoint",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fees: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("WITHDRAW", "DEPOSIT"),
        allowNull: false,
      },
      target: {
        type: Sequelize.ENUM(
          "INTERNAL_WALLET",
          "EXTERNAL_WALET",
          "EXTERNAL_BANK"
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("SUCCESS", "FAILURE", "PENDING"),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("transaction");
  },
};
