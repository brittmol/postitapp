import React, { useEffect } from "react";
import InputListMap from "./InputListMap";

export default function ChangeChecklist({currentNoteId, inputList, setInputList}) {
  useEffect(() => {
    inputList.length &&
      inputList[inputList.length - 1].item.length === 0 &&
      document.getElementById(`chItem${inputList.length - 1}`).focus();
  }, [inputList.length]);

  // --------------- handleClicks ------------------------
  const handleAddClick = () => {
    const list = [...inputList];
    list.push({ item: "", checked: false, noteId: currentNoteId });
    setInputList(list);
  };

  return (
    <>
      <InputListMap inputList={inputList} setInputList={setInputList} isChecked={false} />
      <button onClick={handleAddClick}>+ List Item</button>
      <InputListMap inputList={inputList} setInputList={setInputList} isChecked={true} />
    </>
  );
}
