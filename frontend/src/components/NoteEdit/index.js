import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteEditForm from "./NoteEditForm";
import ChecklistItems from "../Notes/checklistItems";

export default function NoteEditModal({ note }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="note"
        style={{ backgroundColor: `#${note?.color}` }}
        // onClick={() => setShowModal(true)}
      >
        <h3 onClick={() => setShowModal(true)}>{note?.title}</h3>
        <ChecklistItems note={note} />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteEditForm note={note} />
        </Modal>
      )}
    </>
  );
}
