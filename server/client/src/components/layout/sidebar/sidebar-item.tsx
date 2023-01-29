import React from "react";
import { ISite } from "../../../types";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { action } from "../../../redux";

type SidebarItemProps = {
  site: ISite;
};
const SidebarItem = ({ site }: SidebarItemProps) => {
  const app = useAppSelector((state) => state.app);
  const isActive = app.selectedSite === site._id;

  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(action.app.setSelectedSite(site._id))}
      className={cn("sidebar-item", { active: isActive })}
    >
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
