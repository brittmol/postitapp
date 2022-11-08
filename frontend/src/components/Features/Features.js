import React from "react";
import Color from "./Color";
import Pinned from "./Pinned";
import Archived from "./Archived";

export default function Features({ note }) {
  return (
    <div>
      <Color note={note} />
      {/* <p>Pinned: {note?.pinned ? "Yes" : "X"}</p> */}
      <Pinned note={note} />
      {/* <p>Archived: {note?.archived ? "Yes" : "X"}</p> */}
      <Archived note={note} />
    </div>
  );
}
