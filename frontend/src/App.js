import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/Auth/LoginFormPage";
import SignupFormPage from "./components/Auth/SignupFormPage";
import Navigation from "./components/Navigation";
import SideBar from "./components/Navigation/SideBar";
import NotesPage from "./components/Notes/NotesPage";
import ArchivePage from "./components/Notes/ArchivePage";
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
          <Route exact path="/">
            <Redirect to="/login" /> || <Redirect to="/notes" />
          </Route>
          <ProtectedRoute exact path="/notes">
            <div className="WholePage">
              <SideBar page={"notes"} />
              <NotesPage />
            </div>
          </ProtectedRoute>
          <ProtectedRoute exact path="/archive">
            <div className="WholePage">
              <SideBar page={"archive"} />
              <ArchivePage />
            </div>
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
