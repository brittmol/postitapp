import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/Auth/LoginFormPage";
import SignupFormPage from "./components/Auth/SignupFormPage";
import Navigation from "./components/Navigation";
import NotesPage from "./components/Notes/NotesPage";
import ArchivePage from "./components/Notes/ArchivePage"
import ProtectedRoute from "./components/ProtectedRoute";
import * as sessionActions from "./store/session";
import SideBar from "./components/Navigation/SideBar";

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
          <Route exact path="/">
            <Redirect to="/login" /> || <Redirect to="/notes" />
          </Route>
          <ProtectedRoute exact path="/notes">
            <SideBar />
            <NotesPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/archive">
            <SideBar />
            <ArchivePage />
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
