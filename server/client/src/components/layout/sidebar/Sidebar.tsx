import React from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAppDispatch } from "../../../hooks";
import { ISite } from "../../../types";
import { getSites } from "../../../utils/Sitenary";
import SidebarItem from "./sidebar-item";
import { action } from "../../../redux";
import "./style.scss";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, error, data } = useQuery("sites", getSites, {
    onSuccess: (data) => {
      const item: ISite = data[0];
      return dispatch(action.app.setSelectedSite(item._id));
    },
    staleTime: 1000 * 60 * 60,
  });

  return (
    <nav className="main-sidebar">
      <h1>Sitenary</h1>
      <div className="main-sidebar-list">
        {isError && (
          <div className="loading-container">{JSON.stringify(error)}</div>
        )}
        {isLoading && (
          <div className="loading-container">
            <Oval
              color="#737373"
              secondaryColor="#D7D7D7"
              width={42}
              strokeWidth={4}
            />
          </div>
        )}
        {data !== undefined &&
          data.map((site: ISite) => <SidebarItem key={site._id} site={site} />)}
      </div>
    </nav>
  );
};

export default Sidebar;
