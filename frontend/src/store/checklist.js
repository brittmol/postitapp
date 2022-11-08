import { csrfFetch } from "./csrf";

// ----------------- ACTIONS ----------------------------------

// const LOAD_ITEMS = "items/loadItems"
// const loadItems = (items) => ({
//     type: LOAD_ITEMS,
//     items
// })

const ADD_ITEM = "items/addItem";
const addItem = (item) => ({
  type: ADD_ITEM,
  item,
});

const DELETE_ITEM = "items/deleteItem";
const deleteItem = (item) => ({
  type: DELETE_ITEM,
  item,
});

// ----------------- THUNKS ----------------------------------

export const createItem = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/notes/${data.noteId}/checklistItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const item = await res.json();
    dispatch(addItem(item));
    return item;
  } else if (res.status < 500) {
    const item = await res.json();
    if (item.errors) return item.errors;
  } else {
    return ["Error, try creating a new checklist item again"];
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
    dispatch(addItem(item));
    return item;
  } else if (res.status < 500) {
    const item = await res.json();
    if (item.errors) return item.errors;
  } else {
    return ["Error, try creating a new checklist item again"];
  }
};

export const removeItem = (data) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/notes/${data.noteId}/checklistItems/${data.id}`,
    {
      method: "DELETE",
    }
  );
  if (res.ok) {
    const item = await res.json();
    dispatch(deleteItem(item));
  }
};

// ----------------- REDUCER ----------------------------------

export default function itemsReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case ADD_ITEM:
      newState = { ...state, [action.item.id]: action.item };
      return newState;
    case DELETE_ITEM:
      newState = { ...state };
      delete newState[action.item.id];
      return newState;
    default:
      return state;
  }
}
