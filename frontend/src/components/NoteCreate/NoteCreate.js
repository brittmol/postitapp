import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";
import { createChecklist } from "../../store/checklist";
import Features from "../Features/Features";

export default function NoteCreate() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sessionReducer.user);

  // --------------- useState ------------------------
  const [title, setTitle] = useState("");
  const [inCreateMode, setInCreateMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [inputList, setInputList] = useState([
    { item: "", checked: false, noteId: currentNote?.id },
  ]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("currentNote in useEffect", currentNote);
  }, [currentNote]);

  // --------------- handleClicks ------------------------
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { item: "", checked: false, noteId: currentNote?.id },
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
  const onSave = async () => {
    const noteData = {
      userId: user.id,
      title,
      color: null,
      pinned: false,
      archived: false,
    };

    const newNote = await dispatch(createNote(noteData));
    console.log("new note dispatch", newNote);
    if (newNote) {
      setCurrentNote(newNote);
      console.log("current note", currentNote);
      if (currentNote === newNote) {
        const list = [...inputList];
        const newFilteredList = list.filter((x) => x.item.length !== 0);
        if (newFilteredList.length) {
          dispatch(createChecklist(newFilteredList));
        }
      }

      setInCreateMode(false);
      setTitle("");
      setInputList([{ item: "", checked: false, noteId: currentNote?.id }]);
      setCurrentNote(null);
    } else {
      setErrors(newNote);
    }
  };

  const onCancel = () => {
    setTitle("");
    setInCreateMode(false);
    setInputList([{ item: "", checked: false, noteId: currentNote?.id }]);
  };

  // --------------- return ------------------------

  return (
    <>
      {inCreateMode ? (
        <div style={{ backgroundColor: "pink", padding: "10px" }}>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => onSave()}>Create</button>
            <button onClick={() => onCancel()}>Cancel</button>
          </div>
          <div>
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
            {/* <Features note={note} /> */}
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "pink", padding: "10px" }}>
          <input
            placeholder="Take a note..."
            onFocus={() => setInCreateMode(true)}
          />
        </div>
      )}
    </>
  );
}
