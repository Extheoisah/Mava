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

    //Creating Checkpoint
    await queryInterface.bulkInsert(
      "checkpoint",
      [
        {
          id: v4(),
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {}
    );

    //Creating kycinfo
    await queryInterface.bulkInsert(
      "kycInfo",
      [
        {
          id: v4(),
          address: "Benin City, Close to Redeem Church",
          phone: "2348123234345",
          businessName: "Sharp Drink Store",
          bankName: "Trinity Bank",
          bankAccountNumber: "1234567890",
          bankAccountName: "Sharp Drink Store",
          status: "APPROVED",
          accountId,
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {}
    );

    const wallets = await queryInterface.sequelize.query(
      `SELECT id from WALLET;`
    );

    const checkpoints = await queryInterface.sequelize.query(
      `SELECT id from CHECKPOINT;`
    );

    //Creating kycinfo
    await queryInterface.bulkInsert(
      "transaction",
      [
        {
          id: v4(),
          walletId: wallets[0][0].id,
          checkpointId: checkpoints[0][0].id,
          amount: 1000,
          fees: 10,
          currency: "USD",
          type: "DEPOSIT",
          status: "SUCCESS",
          target: "EXTERNAL_WALLET",
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          walletId: wallets[0][1].id,
          checkpointId: checkpoints[0][1].id,
          amount: 10000000,
          fees: 10,
          currency: "BTC",
          type: "DEPOSIT",
          status: "SUCCESS",
          target: "EXTERNAL_WALLET",
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
    await queryInterface.bulkDelete("transaction", null, {});
    await queryInterface.bulkDelete("wallet", null, {});
    await queryInterface.bulkDelete("kycInfo", null, {});
    await queryInterface.bulkDelete("checkpoint", null, {});
    await queryInterface.bulkDelete("account", null, {});
  },
};
