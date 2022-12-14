"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        title: "First Project",
        color: "#00ffff",
        pinned: true,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Second Project",
        pinned: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Third Project",
        color: "#faebd7",
        pinned: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Fourth Project",
        color: "#7fff00",
        pinned: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Pinned Project",
        color: "#7fffd4",
        pinned: true,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Trash",
        color: "#a9a9a9",
        pinned: false,
        archived: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Archived",
        pinned: false,
        archived: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: "user 2 note",
        pinned: false,
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Notes";
    return queryInterface.bulkDelete(options);
  },
};
