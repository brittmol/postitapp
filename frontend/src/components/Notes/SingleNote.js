import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteEditForm from "../NoteEdit";
import ChecklistItems from "./checklistItems";
import Features from "../Features/Features";

export default function SingleNote({ note }) {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  let borderSetting
  note?.color === null ? borderSetting = "1px solid #e0e0e0" : borderSetting = `1px solid ${note?.color}`

  return (
    <>
      <div
        className="note"
        style={{ backgroundColor: note?.color, border: borderSetting}}
        // onClick={() => setShowModal(true)}
      >
        <button onClick={() => setShowModal(true)}>Edit</button>
        <h3>{note?.title ? note?.title : "***Empty Note***"}</h3>
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
