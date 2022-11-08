import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem, removeItem } from "../../store/checklist";

export default function CreateChecklist() {
  const dispatch = useDispatch();

  const [item, setItem] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  const [inputList, setInputList] = useState([""]);

  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    console.log('list b4', list)
    list.splice(index, 1);
    console.log('list after', list)
    setInputList(list);
  };

//   console.log("inputList", inputList);

  return (
    <>
      {/* <input placeholder="checklist" /> */}
      {inputList.map((x, i) => {
        return (
          <div>
            <input placeholder="checklist" />
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
