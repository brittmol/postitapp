import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ChecklistItems from "../Notes/checklistItems";
import Features from "../Features/Features";
import { updateNote } from "../../store/notes";
import AddToChecklist from "../NoteCreate/AddToChecklist";

export default function NoteEditForm({ note, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(note?.title || "");
  const [errors, setErrors] = useState([]);

  const list = note?.ChecklistItems
  console.log('list', list)

  // *** escape = save
  // *** enter = new checklist item

  //   const onKeyDown = (event) => {
  //     if (event.key === "Enter" || event.key === "Escape") {
  //       event.target.blur();
  //     }
  //   }

  const onSave = () => {
    const noteData = { ...note, title };
    dispatch(updateNote(noteData));
    onClose();
    // const updatedNote = dispatch(updateNote(noteData));
    // if (updatedNote) {
    //   onClose();
    // } else {
    //   setErrors(updatedNote);
    //   onClose();
    // }
  };

  return (
    <div id="note-modal" style={{ backgroundColor: note?.color }}>
      <div>
        <button onClick={() => onSave()}>Save</button>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
      <input
        type="text"
        placeholder={title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // onKeyDown={onKeyDown}
      />
      {/* <ChecklistItems note={note} /> */}
      <AddToChecklist note={note} />
      <Features note={note} />
    </div>
  );
}
