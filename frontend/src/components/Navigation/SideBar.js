import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({ page }) {
  return (
    <div className="SideBar">
      <NavLink to="/notes" id={page === "notes" ? "page" : ""}>
        Notes
      </NavLink>
      <NavLink to="/archive" id={page === "archive" ? "page" : ""}>
        Archive
      </NavLink>
    </div>
  );
}
