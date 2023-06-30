"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("checkpoint", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "account",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("checkpoint");
  },
};
