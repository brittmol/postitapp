"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Notes",
      [
        {
          title: "First Project",
          color: "00ffff",
          pinned: true,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Second Project",
          pinned: false,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Third Project",
          color: "faebd7",
          pinned: false,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fourth Project",
          color: "7fff00",
          pinned: false,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Pinned Project",
          color: "7fffd4",
          pinned: true,
          archived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Trash",
          color: "a9a9a9",
          pinned: false,
          archived: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Archived",
          pinned: false,
          archived: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Notes", null, {});
  },
};
