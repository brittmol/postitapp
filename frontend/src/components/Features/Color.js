import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/notes";

export default function Color({ note }) {
  const dispatch = useDispatch();
  const [inColorMode, setInColorMode] = useState(false);
  const [color, setColor] = useState(note?.color || "");

  useEffect(() => {
    dispatch(updateNote({ ...note, color }));
  }, [dispatch, color]);

  return (
    <div>
      <button
        onClick={() => {
          inColorMode === false ? setInColorMode(true) : setInColorMode(false);
        }}
      >
        Color inside Color Component: {color}
      </button>
      {inColorMode && (
        <div>
          <button onClick={() => setColor("")}>NONE</button>
          <button onClick={() => setColor("pink")}>Pink</button>
          <button onClick={() => setColor("yellow")}>Yellow</button>
        </div>
      )}
    </div>
  );
}
