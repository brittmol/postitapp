import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteEditModal from "../NoteEdit";

export default function Notes() {
  const dispatch = useDispatch();

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
          <NoteEditModal key={note?.id} note={note} />
        ))}
      </div>
    </>
  );
}
