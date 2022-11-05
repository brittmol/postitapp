import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import ChecklistItems from "./checklistItems";
import NoteEditModal from "../NoteEdit";

export default function Notes() {
  const dispatch = useDispatch();

  // const sessionUser = useSelector((state) => state.sessionReducer.user)
  const notes = useSelector((state) => state.notesReducer);
  const notesArray = Object.values(notes);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <>
      <h1>All Notes!</h1>
      <div>
        {notesArray?.map((note) => (
          <div className="note" key={note?.id} style={{backgroundColor:`#${note?.color}`}}>
            <h3>{note?.title}</h3>
            <ChecklistItems note={note}  />
            <NoteEditModal />
          </div>
        ))}
      </div>
    </>
  );
}
