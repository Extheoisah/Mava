"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.ENUM("CUSTOMER", "ADMIN"),
        allowNull: false,
        defaultValue: "CUSTOMER",
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE", "LOCKED"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kycInfoId: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: true,
        references: {
          model: "kycInfo",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account");
    await queryInterface.dropTable("kycInfo");
  },
};
