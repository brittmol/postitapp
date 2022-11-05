const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note, ChecklistItem } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const notes = await Note.findAll({
      // include model: User
      include: [{ model: ChecklistItem }],
    });
    return res.json(notes);
  })
);

module.exports = router;
