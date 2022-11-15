import React, { useState } from "react";

export default function Color({ color, setColor }) {
  const [inColorMode, setInColorMode] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          inColorMode === false ? setInColorMode(true) : setInColorMode(false);
        }}
      >
        {/* <i className="fas fa-palette"></i> */}
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
