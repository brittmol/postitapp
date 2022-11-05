'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    pinned: DataTypes.BOOLEAN,
    archived: DataTypes.BOOLEAN
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.hasMany(models.ChecklistItem, { foreignKey: "noteId", onDelete: 'CASCADE', hooks: true })
  };
  return Note;
};
