import React from "react";
import { useDispatch } from "react-redux";
import Color from "./Color";
import Pinned from "./Pinned";
import Archived from "./Archived";
import { removeNote } from "../../store/notes";

export default function Features({ note }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Color note={note} />
      {/* <p>Pinned: {note?.pinned ? "Yes" : "X"}</p> */}
      <Pinned note={note} />
      {/* <p>Archived: {note?.archived ? "Yes" : "X"}</p> */}
      <Archived note={note} />
      <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
    </div>
  );
}
