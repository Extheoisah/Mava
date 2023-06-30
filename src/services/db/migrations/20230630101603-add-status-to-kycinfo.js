"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("kycInfo", "status", {
      type: Sequelize.ENUM("PENDING", "APPROVED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("kycInfo", "status");
  },
};
