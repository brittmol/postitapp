import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, removeItem } from "../../store/checklist";

export default function AddToChecklist({ note }) {
  /*
    - create as many checkbox input boxes as you want
    - on Save:
        -- dispatch new note w/ Title
        -- delete other items associated with note
        -- loop thru new inputList
            dispatch a new checklistitem
            for each item on the list
    */

  const dispatch = useDispatch();
  const currentNoteId = note?.id;

  const oldList = [...note?.ChecklistItems];
  const newList = [];
  oldList.map((obj, i) => {
    newList[i] = {
      item: obj.item,
      checked: obj.checked,
      noteId: currentNoteId,
    };
  });

  const [inputList, setInputList] = useState([
    ...newList,
    { item: "", checked: false, noteId: currentNoteId },
  ]);

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { item: "", checked: false, noteId: currentNoteId },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index]["item"] = value;
    setInputList(list);
  };

  const handleCheckedClick = (e, index) => {
    const { checked } = e.target;
    const list = [...inputList];
    list[index]["checked"] = checked;
    setInputList(list);
  };

  const onSave = () => {
    console.log("clicked save on checklist");
    const oldList = [...note?.ChecklistItems];
    const newList = [...inputList];
    // const list = [...inputList];
    // const newList = list.filter(x => x.item.length !== 0)

    oldList.forEach((item) => {
      dispatch(removeItem(item));
    });
    newList.forEach((item) => {
      dispatch(createItem(item));
    });
  };

  return (
    <div>
      {inputList.map((x, i) => (
        <div key={i}>
          <input
            type="checkbox"
            id={i}
            defaultChecked={x?.checked}
            onClick={(e) => handleCheckedClick(e, i)}
          />
          <input
            type="text"
            placeholder="+ List item"
            value={x?.item}
            onChange={(e) => handleInputChange(e, i)}
          />
          {inputList.length !== 1 && (
            <button onClick={() => handleRemoveClick(i)}>X {i}</button>
          )}
          {inputList.length - 1 === i && (
            <button onClick={handleAddClick}>Add</button>
          )}
        </div>
      ))}
      <button onClick={() => onSave()}>Save Checklist Items</button>
    </div>
  );
}
