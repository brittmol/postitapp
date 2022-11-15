import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUser from "../Auth/DemoUser";
// import './Navigation.css';

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.sessionReducer.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="Nav">
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="Nav">
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <DemoUser />
      </div>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}
