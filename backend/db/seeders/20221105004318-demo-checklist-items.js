"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ChecklistItems",
      [
        {
          noteId: 1,
          item: "first item",
          checked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 1,
          item: "2nd item",
          checked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 1,
          item: "3rd item",
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 1,
          item: "4th item",
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 1,
          item: "5th item",
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 2,
          item: "stuff",
          checked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 2,
          item: "morrrrrrreeeeeeeeeee",
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          noteId: 3,
          item: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ChecklistItems", null, {});
  },
};
