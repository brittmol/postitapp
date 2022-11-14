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
  "/:noteId/checklistItems",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const checklist = await ChecklistItem.findAll({ where: { noteId } });
    if (!checklist || !checklist.length)
      throw new Error("Cannot find Checklist");
    await checklist.forEach((item) => {
      item.destroy();
    });
    return res.json(checklist);
  })
);

router.post(
  "/:noteId/checklistItems",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const checklist = req.body;

    // use a for loop instead of forEach or map
    // because for every item, it passes it to a callback
    // can be weird for racing conditions
    // for loop keeps everything in the same scope
    for (let i = 0; i < checklist.length; i++) {
      const item = checklist[i];
      await ChecklistItem.create(item);
    }

    const newChecklist = await ChecklistItem.findAll({ where: { noteId } });
    console.log("newChecklist in backend", newChecklist);
    return res.json(newChecklist);
  })
);

router.get(
  "/:noteId/checklistItems",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const oldChecklist = await ChecklistItem.findAll({ where: { noteId } });
    return res.json(oldChecklist);
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

// router.put(
//   "/:noteId/checklistItems",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const { noteId } = req.params;
//     const checklist = req.body;
//     const oldChecklist = await ChecklistItem.findAll({ where: { noteId } });

//     if (!checklist.length) {
//       for (let i = 0; i < oldChecklist.length; i++) {
//         const item = oldChecklist[i];
//         await item.destroy();
//       }
//     } else if (!oldChecklist.length) {
//       for (let i = 0; i < checklist.length; i++) {
//         const item = checklist[i];
//         await ChecklistItem.create(item);
//       }
//     } else {
//       for (let i = 0; i < checklist.length; i++) {
//         const item = checklist[i];
//         // const oldItem = oldChecklist[i]
//         const oldItem = await ChecklistItem.findByPk(item.id);
//         if (oldItem) {
//           await oldItem.update(item);
//         } else {
//           await ChecklistItem.create(item);
//         }
//       }
//     }

//     const newChecklist = await ChecklistItem.findAll({ where: { noteId } });
//     console.log("newChecklist in backend", newChecklist);
//     return res.json(newChecklist);
//   })
// );



module.exports = router;
