import React from "react";
import { ISite } from "../../../types";

type SidebarItemProps = {
  site: ISite;
};
const SidebarItem = ({ site }: SidebarItemProps) => {
  return (
    <div className="sidebar-item">
      <div className="sidebar-item-icon" />
      <div className="sidebar-item-content">
        <p className="sidebar-item-title">{site.name}</p>
        <p className="sidebar-item-subtitle">
          {site.url.replace("https://", "")}
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;
