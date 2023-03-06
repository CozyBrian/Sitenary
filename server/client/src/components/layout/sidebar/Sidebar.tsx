import React from "react";
import { Oval } from "react-loader-spinner";
import Close from "../../../assets/icons/close.svg";
import { useQuery } from "react-query";
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
      console.log(data);

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

  return (
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
          data.map((site: ISite) => <SidebarItem key={site._id} site={site} />)
        ) : (
          <div className="empty">
            <p>No Sites</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
