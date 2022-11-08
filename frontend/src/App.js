import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/Auth/LoginFormPage";
import SignupFormPage from "./components/Auth/SignupFormPage";
import Navigation from "./components/Navigation";
import AllNotes from "./components/Notes/AllNotes";
import ProtectedRoute from "./components/ProtectedRoute";
import * as sessionActions from "./store/session";

export default function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <ProtectedRoute exact path="/">
            <AllNotes />
          </ProtectedRoute>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}
