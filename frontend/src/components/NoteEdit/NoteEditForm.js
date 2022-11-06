import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import ChecklistItems from "../Notes/checklistItems";
import { updateNote, removeNote } from "../../store/notes";

export default function NoteEditForm({ note, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note?.title || "");
  const [color, setColor] = useState(note?.color || "");
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);
  const [errors, setErrors] = useState([]);

  // *** escape = save
  // *** enter = new checklist item

  //   const onKeyDown = (event) => {
  //     if (event.key === "Enter" || event.key === "Escape") {
  //       event.target.blur();
  //     }
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      id: note?.id,
      userId: note?.userId,
      title,
      color,
      pinned,
      archived,
    };

    const updatedNote = dispatch(updateNote(noteData));
    if (updatedNote) {
      onClose();
    } else {
      setErrors(updatedNote);
      onClose();
    }
  };

  return (
    <>
      <form
        id="note-modal"
        onSubmit={handleSubmit}
        style={{ backgroundColor: `#${color}` }}
      >
        <h3>{title}</h3>
        <input
          type="text"
          placeholder={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onKeyDown={onKeyDown}
        />
        <ChecklistItems note={note} />
        <button type="submit">Close</button>
      </form>
      <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
    </>
  );
}
