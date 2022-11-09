import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ChecklistItems from "../Notes/checklistItems";
import Features from "../Features/Features";
import { updateNote } from "../../store/notes";
import { createChecklist, removeChecklist } from "../../store/checklist";
// import AddToChecklist from "../NoteCreate/AddToChecklist";

export default function NoteEditForm({ note, onClose }) {
  const dispatch = useDispatch();

  // *** escape = save
  // *** enter = new checklist item

  //   const onKeyDown = (event) => {
  //     if (event.key === "Enter" || event.key === "Escape") {
  //       event.target.blur();
  //     }
  //   }

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
    list.splice(index, 1);
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
    const noteData = { ...note, title };
    const list = [...inputList];
    const filteredList = list.filter((x) => x.item.length !== 0);
    if (oldList.length) {
      dispatch(removeChecklist(oldList)).then(() =>
        dispatch(createChecklist(filteredList)).then(() =>
          dispatch(updateNote(noteData)).then(() => onClose())
        )
      );
    } else if (filteredList.length) {
      dispatch(createChecklist(filteredList)).then(() =>
        dispatch(updateNote(noteData)).then(() => onClose())
      );
    } else {
      dispatch(updateNote(noteData)).then(() => onClose());
    }
  };

  // --------------- return ------------------------

  return (
    <div id="note-modal" style={{ backgroundColor: note?.color }}>
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
          // onKeyDown={onKeyDown}
        />
      </div>
      <div>
        {inputList.map((x, i) => (
          <div key={i}>
            <input
              type="checkbox"
              id={i}
              defaultChecked={x?.checked}
              onClick={(e) => handleCheckedClick(e, i)}
            />
            <input
              type="text"
              placeholder="+ List item"
              value={x?.item}
              onChange={(e) => handleInputChange(e, i)}
            />
            {inputList.length !== 0 && (
              <button onClick={() => handleRemoveClick(i)}>X {i}</button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        ))}
      </div>

      {/* <ChecklistItems note={note} /> */}
      {/* <AddToChecklist note={note} /> */}
      <Features note={note} />
    </div>
  );
}
