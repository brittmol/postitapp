import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateNote, removeNote } from "../../store/notes";
import NoteEditForm from "../NoteEdit";
import ChecklistItems from "./checklistItems";
import Color from "../Features/Color";
import Pinned from "../Features/Pinned";
import Archived from "../Features/Archived";

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
        // onClick={() => setShowModal(true)}
      >
        <button onClick={() => setShowModal(true)}>Edit</button>
        <h3>{note?.title ? note?.title : "***Empty Note***"}</h3>
        <ChecklistItems note={note} />
        <div className="features">
          <Color color={color} setColor={setColor} />
          <Pinned
            pinned={pinned}
            setPinned={setPinned}
            archived={archived}
            setArchived={setArchived}
          />
          <Archived
            pinned={pinned}
            setPinned={setPinned}
            archived={archived}
            setArchived={setArchived}
          />
          <button onClick={() => dispatch(removeNote(note))}>
            {/* <i class="fas fa-trash-alt"></i> */}
            <span class="material-symbols-outlined">delete</span>
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
