import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import NoteEditForm from "../NoteEdit"
import ChecklistItems from "./checklistItems";
import Features from "../Features/Features";

export default function SingleNote({ note }) {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  // useEffect(() => {
  //   console.log('note', note)
  //   console.log('checklist', note?.ChecklistItems)
  // },[note?.ChecklistItems])

  return (
    <>
      <div
        className="note"
        style={{ backgroundColor: note?.color }}
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
