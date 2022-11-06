import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../store/notes";

export default function NoteCreateForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sessionReducer.user);

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [pinned, setPinned] = useState(false);
  const [archived, setArchived] = useState(false);
  const [errors, setErrors] = useState([]);
  const [inCreateMode, setInCreateMode] = useState(false);

  const onCancel = () => {
    setTitle("");
    setColor("");
    setPinned(false);
    setArchived(false);
    setInCreateMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      userId: user.id,
      title,
      color,
      pinned,
      archived,
    };

    const newNote = dispatch(createNote(noteData));
    if (newNote) {
      setInCreateMode(false);
      setTitle("");
      setColor("");
      setPinned(false);
      setArchived(false);
      setInCreateMode(false);
    } else {
      setErrors(newNote);
      setInCreateMode(false);
    }
  };

  return (
    <>
      {inCreateMode ? (
        // <div onBlur={() => setInCreateMode(false)}>
        <div style={{ backgroundColor: "pink", padding: "10px" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input placeholder="checklist" />
              <button type="submit">Create</button>
            </div>
          </form>
          <button onClick={() => onCancel()}>Cancel</button>
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
