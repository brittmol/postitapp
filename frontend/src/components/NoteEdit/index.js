import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote, removeNote } from "../../store/notes";
import { createChecklist, removeChecklist } from "../../store/checklist";
import Color from "../Features/Color";
import PinnedAndArchived from "../Features/PinnedAndArchived";

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

  // --------------- useState ------------------------
  const [title, setTitle] = useState(note?.title || "");
  const [inputList, setInputList] = useState([
    ...newList,
    { item: "", checked: false, noteId: currentNoteId },
  ]);
  const [color, setColor] = useState(note?.color || null);
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);
  const [errors, setErrors] = useState([]);

  // --------------- handleClicks ------------------------
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { item: "", checked: false, noteId: currentNoteId },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    console.log(list.splice(index, 1));
    console.log("list", list);
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index]["item"] = value;
    setInputList(list);
  };

  const handleCheckedClick = (e, index) => {
    const { checked } = e.target;
    const list = [...inputList];
    list[index]["checked"] = checked;
    setInputList(list);
  };

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
      <div>
        <button onClick={() => onSave()}>Save</button>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
      <div>
        <input
          type="text"
          placeholder={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {inputList.map((x, i) => (
          <div key={i}>
            <input
              type="checkbox"
              id={i}
              checked={x?.checked}
              onClick={(e) => handleCheckedClick(e, i)}
            />
            <input
              type="text"
              placeholder="+ List item"
              value={x?.item}
              onChange={(e) => handleInputChange(e, i)}
              />
            {inputList.length !== 0 && (
              <button onClick={() => handleRemoveClick(i)}>X {i} {x?.checked ? 'checked' : 'NO'}</button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        ))}
      </div>
      <div>
        <Color color={color} setColor={setColor} />
        <PinnedAndArchived
          pinned={pinned}
          setPinned={setPinned}
          archived={archived}
          setArchived={setArchived}
        />
        <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
      </div>
    </div>
  );
}