import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote, removeNote } from "../../store/notes";
import { createChecklist, removeChecklist } from "../../store/checklist";
import Color from "../Features/Color";
import Pinned from "../Features/Pinned";
import Archived from "../Features/Archived";
import ChangeChecklist from "../Checklists/ChangeChecklist";

export default function NoteEditForm({ note, onClose }) {
  const dispatch = useDispatch();
  const currentNoteId = note?.id;

  const oldList = [...note?.ChecklistItems];
  const newList = [];
  oldList.map((obj, i) => {
    newList[i] = {
      item: obj.item,
      checked: obj.checked,
      noteId: currentNoteId,
    };
  });
  newList.sort((a, b) => a.id - b.id);

  // --------------- useState ------------------------
  const [title, setTitle] = useState(note?.title || "");
  const [inputList, setInputList] = useState([...newList]);
  const [color, setColor] = useState(note?.color || null);
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);
  const [errors, setErrors] = useState([]);

  // --------------- onSave ------------------------
  const onSave = () => {
    const noteData = { ...note, title, color, pinned, archived };
    const list = [...inputList];
    const newFilteredList = list.filter((x) => x.item.length !== 0);
    if (oldList.length && newFilteredList.length) {
      dispatch(removeChecklist(oldList)).then(() =>
        dispatch(createChecklist(newFilteredList)).then(() =>
          dispatch(updateNote(noteData)).then(() => onClose())
        )
      );
    } else if (oldList.length && !newFilteredList.length) {
      dispatch(removeChecklist(oldList)).then(() =>
        dispatch(updateNote(noteData)).then(() => onClose())
      );
    } else if (!oldList.length && newFilteredList.length) {
      dispatch(createChecklist(newFilteredList)).then(() =>
        dispatch(updateNote(noteData)).then(() => onClose())
      );
    } else if (!oldList.length && !newFilteredList.length) {
      dispatch(updateNote(noteData)).then(() => onClose());
    }
  };

  // --------------- return ------------------------

  return (
    <div id="note-modal" style={{ backgroundColor: color }}>
      <div className="title-pin-container">
        <input
          className="title"
          type="text"
          placeholder={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Pinned
          pinned={pinned}
          setPinned={setPinned}
          archived={archived}
          setArchived={setArchived}
        />
      </div>
      <ChangeChecklist currentNoteId={currentNoteId} inputList={inputList} setInputList={setInputList} />
      <div className="features">
        <Color color={color} setColor={setColor} />
        <Archived
          pinned={pinned}
          setPinned={setPinned}
          archived={archived}
          setArchived={setArchived}
        />
        <button className="ft-btn" onClick={() => dispatch(removeNote(note))}>
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button onClick={() => onClose()}>Cancel</button>
        <button onClick={() => onSave()}>Save</button>
      </div>
    </div>
  );
}
