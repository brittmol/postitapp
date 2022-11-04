/*
Create 2 POJO action creators
1. one POJO action creator that will
    set the session user in the session slice of state
    to the action creator's input parameter
2. one POJO action creator that will
    remove the session user
*/

import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const REMOVE_USER = "session/removeUser";
const removeUser = () => ({
  type: REMOVE_USER,
});

/*
- call the API to login
- then set the session user from the response

Add a thunk action for the POST /api/session
- use custom csrfFetch

- the POST /api/session route expects
    the request body to have a key of credential
    with existing username or email
    and a key of password

- after the response from the AJAX call comes back,
    --parse the json body of the response
    --dispatch the action for setting the session user
        to the user in the response's body

- export the login thunk action
- export the reducer as the default export
*/

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

/*
add a session reducer that will hold
the current session user's info

session slice of state should look like this
if there is a current session user:
{
  user: {
    id,
    email,
    username,
    createdAt,
    updatedAt
  }
}

if no session user,
session slice of state should look like this:
{
    user: null
}

*/

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
