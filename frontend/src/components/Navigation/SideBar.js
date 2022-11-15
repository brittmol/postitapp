import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="SideBar">
      <NavLink to="/notes">Notes</NavLink>
      <NavLink to="/archive">Archive</NavLink>
    </div>
  );
}
