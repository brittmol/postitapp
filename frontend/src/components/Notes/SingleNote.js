import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteEditForm from "../NoteEdit/NoteEditForm";
import ChecklistItems from "./checklistItems";
import Features from "../Features/Features";

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
        <Features note={note} />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm note={note} onClose={onCloseModal} />
        </Modal>
      )}
    </>
  );
}
