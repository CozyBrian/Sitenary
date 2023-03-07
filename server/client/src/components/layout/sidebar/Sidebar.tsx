import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import Close from "../../../assets/icons/close.svg";
import { useQuery } from "react-query";
import { useEventListener } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ISite } from "../../../types";
import { getSites } from "../../../utils/Sitenary";
import SidebarItem from "./sidebar-item";
import { action } from "../../../redux";
import "./style.scss";

const Sidebar = () => {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { isLoading, isError, data } = useQuery("sites", getSites, {
    onSuccess: (data) => {
      if (data[0]) {
        const item: ISite = data[0];
        if (app.selectedSite === null) {
          return dispatch(action.app.setSelectedSite(item._id));
        }
      }
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  const resizeRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: MouseEvent) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (isResizing) {
      if (299 < e.pageX && e.pageX < 420) {
        document.body.style.setProperty("--SidebarWidth", `${e.pageX}px`);
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsResizing(false);
  };

  useEventListener("mousedown", handleMouseDown, resizeRef);
  useEventListener("mousemove", handleMouseMove);
  useEventListener("mouseup", handleMouseUp);

  return (
    <div className="sidebar-wrapper">
      <nav className="main-sidebar">
        <div className="main-sidebar-header">
          <h1>Sitenary</h1>
          <div
            className="main-sidebar-icon"
            onClick={() => dispatch(action.app.setAddSiteModalOpen(true))}
          >
            <img src={Close} alt="close-icon" />
          </div>
        </div>
        <div className="main-sidebar-list">
          {isError && (
            <div className="loading-container">Error loading sites...</div>
          )}
          {isLoading ? (
            <div className="loading-container">
              <Oval
                color="#737373"
                secondaryColor="#D7D7D7"
                width={42}
                strokeWidth={4}
              />
            </div>
          ) : data !== undefined && data.length !== 0 ? (
            data.map((site: ISite) => (
              <SidebarItem key={site._id} site={site} />
            ))
          ) : (
            <div className="empty">
              <p>No Sites</p>
            </div>
          )}
        </div>
      </nav>
      <div ref={resizeRef} className="sidebar-resize-handle">
        <div className="resize-inner" />
      </div>
    </div>
  );
};

export default Sidebar;
