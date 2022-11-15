import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar({ page }) {
  return (
    <div className="SideBar">
      <NavLink to="/notes" id={page === "notes" ? "page" : ""}>
        {/* <i class="fa-regular fa-lightbulb"></i> */}
        <span className="material-symbols-outlined">lightbulb</span>
        Notes
      </NavLink>
      <NavLink to="/archive" id={page === "archive" ? "page" : ""}>
        <span className="material-symbols-outlined">archive</span>
        Archive
      </NavLink>
    </div>
  );
}
