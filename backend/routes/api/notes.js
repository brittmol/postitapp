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

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const note = await Note.create(req.body);
    const newNote = await Note.findByPk(note.id, {
      include: [{ model: ChecklistItem }],
    });
    return res.json(newNote);
  })
);

router.post(
  "/:noteId/checklistItems",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const item = await ChecklistItem.create(req.body);
    const newItem = await ChecklistItem.findByPk(item.id);
    return res.json(newItem);
  })
);

router.put(
  "/:noteId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    const updatedNote = await note.update(req.body);
    const newNote = await Note.findByPk(updatedNote.id, {
      include: [{ model: ChecklistItem }],
    });
    return res.json(newNote);
  })
);

router.put(
  "/:noteId/checklistItems/:itemId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId, itemId } = req.params;
    const item = await ChecklistItem.findByPk(itemId);
    const updatedItem = await item.update(req.body);
    const newItem = await ChecklistItem.findByPk(updatedItem.id);
    return res.json(newItem);
  })
);

router.delete(
  "/:noteId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    if (!note) throw new Error("Cannot find Note");
    await note.destroy();
    return res.json(note);
  })
);

router.delete(
  "/:noteId/checklistItems/:itemId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId, itemId } = req.params;
    const item = await ChecklistItem.findByPk(itemId);
    if (!item) throw new Error("Cannot find Checklist Item");
    await item.destroy();
    return res.json(item);
  })
);

module.exports = router;
