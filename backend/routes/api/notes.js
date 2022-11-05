const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Note, ChecklistItem } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const notes = await Note.findAll({
      where: { userId },
      include: [{ model: ChecklistItem }],
    });
    return res.json(notes);
  })
);

module.exports = router;
