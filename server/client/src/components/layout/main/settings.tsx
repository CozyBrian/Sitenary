import React from "react";
import { ISite } from "../../../types";

const SettingsContainer = ({
  selectedSite,
  mutate,
}: {
  selectedSite: ISite;
  mutate: () => void;
}) => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="settings-info-container">
        {selectedSite && (
          <>
            <div className="settings-info">
              <h3>Site: </h3>
              <div className="info-container">
                <p>{selectedSite.name}</p>
              </div>
            </div>
            <div className="settings-info">
              <h3>Url: </h3>
              <div className="info-container">
                <p>{selectedSite.url}</p>
              </div>
            </div>
            <div className="settings-info">
              <h3>SiteId: </h3>
              <div className="info-container">
                <p>{selectedSite._id}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="danger-zone-container">
        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <div className="danger-zone-info">
            <p>If you delete this site, all the data will be lost</p>
            <button
              className="delete-button"
              onClick={() => {
                mutate();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;
