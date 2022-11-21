"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        email: "newbie@coder.edu",
        username: "Newbie-Coder",
        hashedPassword: bcrypt.hashSync("newbiecoderpwd"),
      },
      {
        email: "faker@user.com",
        username: "fake-user",
        hashedPassword: bcrypt.hashSync("fakeuserpwd"),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Users";
    return queryInterface.bulkDelete(options);
  },
};
