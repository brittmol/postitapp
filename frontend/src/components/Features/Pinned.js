import React from "react";

export default function Pinned({ pinned, setPinned, archived, setArchived }) {
  const clickPinned = () => {
    if (pinned === false) {
      setArchived(false);
      setPinned(true);
    } else {
      setPinned(false);
    }
  };

  return (
    <>
      <button className="ft-btn" onClick={() => clickPinned()}>
        {pinned ? (
          <span className="material-symbols-outlined" style={{ "font-variation-settings":"'FILL' 1,'wght' 700,'GRAD' 0,'opsz' 48"}}>push_pin</span>
        ) : (
          <span className="material-symbols-outlined" style={{ "font-variation-settings":"'FILL' 0,'wght' 700,'GRAD' 0,'opsz' 48"}}>push_pin</span>
        )}
      </button>
    </>
  );
}
