/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
"use strict"
const bcrypt = require("bcryptjs")
const { v4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
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
        {
          id: v4(),
          name: "Mr. Admin",
          type: "ADMIN",
          email: "admin@gmail.com",
          password: bcrypt.hashSync("admin_pass", bcrypt.genSaltSync(10)),
          status: "ACTIVE",
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {},
    )
    const accounts = await queryInterface.sequelize.query(`SELECT id, type from ACCOUNT;`)

    function selectId(records, key, value) {
      let id = ""
      for (let i = 0; i < records[0].length; i++) {
        const record = records[0][i]
        if (record[key] === value) {
          id = record.id
          break
        }
      }
      return id
    }

    const accountId = selectId(accounts, "type", "CUSTOMER")

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
      {},
    )

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
      {},
    )

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
      {},
    )

    const wallets = await queryInterface.sequelize.query(`SELECT id, type from WALLET;`)

    const checkpoints = await queryInterface.sequelize.query(`SELECT id from CHECKPOINT;`)

    //Creating kycinfo
    await queryInterface.bulkInsert(
      "transaction",
      [
        {
          id: v4(),
          walletId: selectId(wallets, "type", "USD"),
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
          walletId: selectId(wallets, "type", "BTC"),
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
      {},
    )

    const transactions = await queryInterface.sequelize.query(
      `SELECT id, currency from TRANSACTION;`,
    )

    //Creating Transaction Meta data
    await queryInterface.bulkInsert(
      "transactionMetadata",
      [
        {
          id: v4(),
          type: "FIAT",
          hash: v4(),
          narration: "Payment for Farm Fresh",
          transactionId: selectId(transactions, "currency", "USD"),
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
        {
          id: v4(),
          type: "ONCHAIN",
          hash: v4(),
          narration: "Payment for Farm Fresh",
          transactionId: selectId(transactions, "currency", "BTC"),
          address: v4(),
          createdAt: "2023-07-07",
          updatedAt: "2023-07-09",
        },
      ],
      {},
    )
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("transactionMetadata", null, {})
    await queryInterface.bulkDelete("transaction", null, {})
    await queryInterface.bulkDelete("wallet", null, {})
    await queryInterface.bulkDelete("kycInfo", null, {})
    await queryInterface.bulkDelete("checkpoint", null, {})
    await queryInterface.bulkDelete("account", null, {})
  },
}
