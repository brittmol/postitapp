import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteEditForm from "../NoteEdit/NoteEditForm";
import ChecklistItems from "./checklistItems";
import Color from "../Features/Color";

export default function SingleNote({ note }) {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="note"
        style={{ backgroundColor: note?.color }}
        // onClick={() => setShowModal(true)}
      >
        <button onClick={() => setShowModal(true)}>Edit</button>
        <h3>{note?.title}</h3>
        <ChecklistItems note={note} />
        <p>Color: {note?.color}</p>
        <Color note={note} />
        <p>Pinned: {note?.pinned ? "Yes" : "X"}</p>
        <p>Archived: {note?.archived ? "Yes" : "X"}</p>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm note={note} onClose={onCloseModal} />
        </Modal>
      )}
    </>
  );
}
