import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateNote, removeNote } from "../../store/notes";
import NoteEditForm from "../NoteEdit";
import ChecklistItems from "./checklistItems";
import Color from "../Features/Color";
import Pinned from "../Features/Pinned";
import Archived from "../Features/Archived";
import "./SingleNote.css"

export default function SingleNote({ note }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const [color, setColor] = useState(note?.color || null);
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);

  useEffect(() => {
    if (
      note?.color !== color ||
      note?.pinned !== pinned ||
      note?.archived !== archived
    ) {
      dispatch(updateNote({ ...note, color, pinned, archived }));
    }
  }, [dispatch, color, pinned, archived]);

  let borderSetting;
  note?.color === null
    ? (borderSetting = "1px solid #e0e0e0")
    : (borderSetting = `1px solid ${note?.color}`);

  return (
    <>
      <div
        className="note"
        style={{ backgroundColor: note?.color, border: borderSetting }}
      >
        <div className="title-pin-container">
          <div className="title" onClick={() => setShowModal(true)}>
            {note?.title ? note?.title : "***Empty Note***"}
          </div>
          <Pinned
            pinned={pinned}
            setPinned={setPinned}
            archived={archived}
            setArchived={setArchived}
          />
        </div>
        <ChecklistItems note={note} />
        <div className="features">
          <button className="ft-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-outlined">edit</span>
          </button>
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
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm note={note} onClose={onCloseModal} />
        </Modal>
      )}
    </>
  );
}
