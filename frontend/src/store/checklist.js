import { csrfFetch } from "./csrf";

// ----------------- ACTIONS ----------------------------------
const EDIT_ITEM = "checklist/editItem";
const editItem = (item) => ({
  type: EDIT_ITEM,
  item,
});

const ADD_CHECKLIST = "checklist/addChecklist";
const addChecklist = (checklist) => ({
  type: ADD_CHECKLIST,
  checklist,
});

const DELETE_CHECKLIST = "checklist/deleteChecklist";
const deleteChecklist = (checklist) => ({
  type: DELETE_CHECKLIST,
  checklist,
});

// ----------------- THUNKS ----------------------------------

export const createChecklist = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${data[0].noteId}/checklistItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const checklist = await res.json();
    dispatch(addChecklist(checklist));
    return checklist;
  } else if (res.status < 500) {
    const checklist = await res.json();
    if (checklist.errors) return checklist.errors;
  } else {
    return ["Error, try creating a new checklist checklist again"];
  }
};

export const removeChecklist = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${data[0].noteId}/checklistItems`, {
    method: "DELETE",
  });
  if (res.ok) {
    const checklist = await res.json();
    dispatch(deleteChecklist(checklist));
  }
};

export const updateItem = (data) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/notes/${data.noteId}/checklistItems/${data.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (res.ok) {
    const item = await res.json();
    dispatch(editItem(item));
    return item;
  } else if (res.status < 500) {
    const item = await res.json();
    if (item.errors) return item.errors;
  } else {
    return ["Error, try editing checklist item again"];
  }
};

// ----------------- REDUCER ----------------------------------

export default function checklistReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case EDIT_ITEM:
      newState = { ...state };
      newState[action.item.id] = action.item;
      return newState
    case ADD_CHECKLIST:
      newState = { ...state };
      action.checklist.forEach((el) => {
        newState[el.id] = el.item;
      });
      return newState;
    case DELETE_CHECKLIST:
      newState = { ...state };
      delete newState[action.checklist];
      return newState;
    default:
      return state;
  }
}
