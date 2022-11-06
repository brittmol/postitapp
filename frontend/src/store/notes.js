import { csrfFetch } from "./csrf";

// ----------------- ACTIONS ----------------------------------

const LOAD_NOTES = "notes/loadNotes";
const loadNotes = (notes) => ({
  type: LOAD_NOTES,
  notes,
});

const ADD_NOTE = "notes/addNote";
const addNote = (note) => ({
  type: ADD_NOTE,
  note,
});

const ADD_ITEM = "notes/items/addItem";
const addItem = (item) => ({
  type: ADD_ITEM,
  item,
});

const DELETE_NOTE = "notes/deleteNote";
const deleteNote = (note) => ({
  type: DELETE_NOTE,
  note,
});

const DELETE_ITEM = "notes/items/deleteItem";
const deleteItem = (item) => ({
  type: DELETE_ITEM,
  item,
});

// ----------------- THUNKS ----------------------------------

export const getNotes = () => async (dispatch) => {
  const response = await csrfFetch("/api/notes");
  if (response.ok) {
    const notes = await response.json();
    dispatch(loadNotes(notes));
    return notes;
  }
};

export const createNote = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const note = await response.json()
    dispatch(addNote(note))
    return note
  } else if (response.status < 500) {
    const note = await response.json()
    if (note.errors) return note.errors
  } else {
    return ["An error occurred. Please try to create a new note again."]
  }
}

export const updateNote = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    const note = await response.json()
    dispatch(addNote(note))
    return note
  } else if (response.status < 500) {
    const note = await response.json()
    if (note.errors) return note.errors
  } else {
    return ["An error occurred. Please try to create a new note again."]
  }
}

export const removeNote = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/notes/${data.id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const note = await response.json()
    dispatch(deleteNote(note))
  }
}

// ----------------- REDUCER ----------------------------------

export default function notesReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_NOTES:
      action.notes.forEach((note) => {
        newState[note.id] = note;
      });
      return newState;
    case ADD_NOTE:
      newState = { ...state, [action.note.id]: action.note };
      return newState;
    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.note.id];
      return newState;
    default:
      return state;
  }
}
