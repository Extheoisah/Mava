"use strict";
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // id: string;
  // type: AccountType;
  // status: AccountStatus;
  // email: string;
  // password: string;
  // name: string;
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("account", null, {});
  },
};
