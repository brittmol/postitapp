import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUser from "../Auth/DemoUser";
// import './Navigation.css';

export default function SideBar() {
  return (
    <div>
      <NavLink to="/notes">Notes</NavLink>
      <NavLink to="/archive">Archive</NavLink>
    </div>
  );
}
