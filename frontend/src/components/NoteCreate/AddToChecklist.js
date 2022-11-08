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

  //   const [item, setItem] = useState("");
  //   const [checked, setChecked] = useState(false);
  //   const [errors, setErrors] = useState([]);

  const oldList = [...note?.ChecklistItems];
  const newList = [];
  oldList.map((obj, i) => {
    newList[i] = { item: obj.item, checked: obj.checked };
  });

  const [inputList, setInputList] = useState([
    ...newList,
    { item: "", checked: false },
  ]);
  console.log("inputList", inputList);

  const handleAddClick = () => {
    setInputList([...inputList, { item: "", checked: false }]);
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

  return (
    <>
      {inputList.map((x, i) => {
        return (
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
              defaultValue={x?.item}
              onChange={(e) => handleInputChange(e, i)}
            />
            {inputList.length !== 1 && (
              <button onClick={() => handleRemoveClick(i)}>X</button>
            )}
            {inputList.length - 1 === i && (
              <button onClick={handleAddClick}>Add</button>
            )}
          </div>
        );
      })}
    </>
  );
}
