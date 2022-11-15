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
      <button onClick={() => clickPinned()}>
        {pinned ? (
          <i className="fas fa-thumbtack"></i>
        ) : (
          <span className="material-symbols-outlined">push_pin</span>
        )}
        {/* {pinned ? (
          <i className="fas fa-thumbtack" style={{ color: "red" }}></i>
        ) : (
          <i className="fas fa-thumbtack"></i>
        )} */}
        {/* {pinned ? (
          <span className="material-symbols-outlined">push_pin</span>
        ) : (
          <span className="material-symbols-outlined">push_pin</span>
        )} */}
      </button>
    </>
  );
}
