import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../store/notes";
import { createChecklist } from "../../store/checklist";
import Color from "../Features/Color";
import Pinned from "../Features/Pinned";
import Archived from "../Features/Archived";
import ChangeChecklist from "../Checklists/ChangeChecklist";
import useOutsideClick from "./useOutsideClick";

export default function NoteCreateForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sessionReducer.user);

  // --------------- useState ------------------------
  const [inCreateMode, setInCreateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [inputList, setInputList] = useState([]);
  const [color, setColor] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [archived, setArchived] = useState(false);
  const [errors, setErrors] = useState([]);

  // --------------- onSave ------------------------
  const onSave = async () => {
    const noteData = {
      userId: user.id,
      title,
      color,
      pinned,
      archived,
    };

    const newNote = await dispatch(createNote(noteData));
    if (newNote && inputList.length) {
      const list = [...inputList];
      const newList = list.filter((x) => x.item.length !== 0);
      newList.forEach((x) => (x["noteId"] = newNote.id));
      if (newList.length) {
        dispatch(createChecklist(newList));
        dispatch(updateNote(newNote));
      }

      setInCreateMode(false);
      setTitle("");
      setInputList([]);
      setColor(null);
      setPinned(false);
      setArchived(false);
    } else {
      setErrors(newNote);
    }
  };

  // --------------- onClear ------------------------

  const onClear = () => {
    setTitle("");
    setInputList([]);
    setColor(null);
    setPinned(false);
    setArchived(false);
  };

  // --------------- off click ------------------------
  const ref = useRef();
  useOutsideClick(ref, () => {
    if (inCreateMode) {
      onClear();
      setInCreateMode(false);
    }
  });

  // --------------- return ------------------------

  return (
    <>
      {!inCreateMode ? (
        <div
          className="createNote"
          onClick={() => setInCreateMode(true)}
          style={{ padding: "10px" }}
        >
          <input
            className="title"
            placeholder="Take a note..."
            onFocus={() => setInCreateMode(true)}
          />
        </div>
      ) : (
        <div
          // ref={ref}
          className="createNote"
          style={{ backgroundColor: color || null, padding: "10px" }}
        >
          <div className="title-pin-container">
            <input
              className="title"
              type="text"
              placeholder="Title"
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
          <ChangeChecklist inputList={inputList} setInputList={setInputList} />
          <div className="features">
            <Color color={color} setColor={setColor} />
            <Archived
              pinned={pinned}
              setPinned={setPinned}
              archived={archived}
              setArchived={setArchived}
            />
            <button onClick={() => onClear()}>Clear</button>
            <button onClick={() => onSave()}>Create</button>
          </div>
        </div>
      )}
    </>
  );
}
