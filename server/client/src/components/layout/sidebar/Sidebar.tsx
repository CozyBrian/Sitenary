import React from "react";
import SidebarItem from "./sidebar-item";
import "./style.scss";

const Sidebar = () => {
  return (
    <nav className="main-sidebar">
      <h1>Sitenary</h1>
      <div className="main-sidebar-list">
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </nav>
  );
};

export default Sidebar;
