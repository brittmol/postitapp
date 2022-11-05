"use strict";
module.exports = (sequelize, DataTypes) => {
  const ChecklistItem = sequelize.define(
    "ChecklistItem",
    {
      noteId: DataTypes.INTEGER,
      item: DataTypes.TEXT,
      checked: DataTypes.BOOLEAN,
    },
    {}
  );
  ChecklistItem.associate = function (models) {
    // associations can be defined here
    ChecklistItem.belongsTo(models.Note, { foreignKey: "noteId" });
  };
  return ChecklistItem;
};
