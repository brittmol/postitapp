import React, { useState } from "react";

export default function Color({ color, setColor }) {
  const [inColorMode, setInColorMode] = useState(false);

  return (
    <>
      <button className="ft-btn"
        onClick={() => {
          inColorMode === false ? setInColorMode(true) : setInColorMode(false);
        }}
      >
        <span className="material-symbols-outlined">palette</span>
      </button>
      {inColorMode && (
        <div>
          <button onClick={() => setColor("")}>NONE</button>
          <button onClick={() => setColor("pink")}>Pink</button>
          <button onClick={() => setColor("yellow")}>Yellow</button>
        </div>
      )}
    </>
  );
}
