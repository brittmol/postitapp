import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ChecklistItems from "../Notes/checklistItems";
import { updateNote, removeNote } from "../../store/notes";

export default function Title({ note, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note?.title || "");

  const onSave = () => {
    const noteData = { ...note, title };
    dispatch(updateNote(noteData));
    onClose();
  };

  return (
    <div id="note-modal" style={{ backgroundColor: note?.color }}>
      <input
        type="text"
        placeholder={title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // onKeyDown={onKeyDown}
      />
      <ChecklistItems note={note} />
      <button onClick={() => onSave()}>Save</button>
      <button onClick={() => onClose()}>Cancel</button>
      <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
    </div>
  );
}
