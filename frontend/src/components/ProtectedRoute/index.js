import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.sessionReducer.user);
  const history = useHistory();

  return <Route {...props}>{user ? props.children : history.push("/login")}</Route>;
};

export default ProtectedRoute;
