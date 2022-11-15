import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../store/notes";
import { createChecklist } from "../../store/checklist";
import Color from "../Features/Color";
import PinnedAndArchived from "../Features/PinnedAndArchived";

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

  useEffect(() => {
    inputList.length &&
      inputList[inputList.length - 1].item.length === 0 &&
      document.getElementById(`chItem${inputList.length - 1}`).focus();
  }, [inputList.length]);

  // --------------- handleClicks ------------------------
  const handleAddClick = () => {
    const list = [...inputList];
    list.push({ item: "", checked: false });
    setInputList(list);
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

  // --------------- onCancel ------------------------

  const onCancel = () => {
    setInCreateMode(false);
    setTitle("");
    setInputList([]);
    setColor(null);
    setPinned(false);
    setArchived(false);
  };

  // --------------- return ------------------------

  return (
    <div className="createNote">
      {inCreateMode ? (
        <div style={{ backgroundColor: color || null, padding: "10px" }}>
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
                    checked={x?.checked}
                    onChange={(e) => handleCheckedClick(e, i)}
                  />
                  <input
                    type="text"
                    id={`chItem${i}`}
                    // placeholder="+ List item"
                    value={x?.item}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  {inputList.length !== 0 && (
                    <button onClick={() => handleRemoveClick(i)}>X</button>
                  )}
                  {/* {(inputList.length - 1 === i) && (
                    <button onClick={handleAddClick}>Add</button>
                  )} */}
                </div>
              ))}
            </div>
            <button onClick={handleAddClick}>+ List Item</button>
            <div>
              <Color color={color} setColor={setColor} />
              <PinnedAndArchived
                pinned={pinned}
                setPinned={setPinned}
                archived={archived}
                setArchived={setArchived}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "10px" }}>
          <input
            placeholder="Take a note..."
            onFocus={() => setInCreateMode(true)}
          />
        </div>
      )}
    </div>
  );
}
