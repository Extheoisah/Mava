"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactionMetadata", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.ENUM("LIGHTNING", "ONCHAIN", "FIAT"),
        allowNull: false,
      },
      narration: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      transactionId: {
        type: Sequelize.UUID,
        references: {
          model: "transaction",
          key: "id",
        },
      },
      invoice: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hash: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("transactionMetadata");
  },
};
