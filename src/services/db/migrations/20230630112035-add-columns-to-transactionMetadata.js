"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("transactionMetadata", "invoice", {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("transactionMetadata", "address", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("transactionMetadata", "hash", {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("transactionMetadata", "invoice");
    await queryInterface.removeColumn("transactionMetadata", "address");
    await queryInterface.removeColumn("transactionMetadata", "hash");
  },
};
