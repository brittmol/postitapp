import React from "react";
import { useDispatch } from "react-redux";
import Color from "./Color";
import PinnedAndArchived from "./PinnedAndArchived";
import { removeNote } from "../../store/notes";

export default function Features({ note }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Color note={note} />
      <PinnedAndArchived note={note} />
      <button onClick={() => dispatch(removeNote(note))}>Delete Note</button>
    </div>
  );
}
