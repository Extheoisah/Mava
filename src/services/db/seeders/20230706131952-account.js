"use strict";
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('account', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    //Creating Account
    await queryInterface.bulkInsert(
      "account",
      [
        {
          id: v4(),
          name: "John Doe",
          type: "CUSTOMER",
          email: "teebams@gmail.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
          status: "ACTIVE",
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {}
    );
    const accounts = await queryInterface.sequelize.query(
      `SELECT id from ACCOUNT;`
    );
    const accountId = accounts[0][0].id;

    //Creating Wallet
    await queryInterface.bulkInsert(
      "wallet",
      [
        {
          id: v4(),
          type: "BTC",
          balance: 100000000000,
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          type: "USD",
          balance: 100000000000,
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("account", null, {});
    await queryInterface.bulkDelete("wallet", null, {});
  },
};
