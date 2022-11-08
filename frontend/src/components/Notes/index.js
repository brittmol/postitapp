import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteCreateForm from "../NoteCreate";
import SingleNote from "./SingleNote";

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
      <NoteCreateForm />
      <div>
        {notesArray?.map((note) => (
          <SingleNote key={note?.id} note={note} />
        ))}
      </div>
    </>
  );
}
