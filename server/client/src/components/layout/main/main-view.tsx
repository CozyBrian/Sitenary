import React from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks";
import { ISite } from "../../../types";
import { getSiteEvents, getSites } from "../../../utils/Sitenary";
import "./style.scss";

const MainView = () => {
  const app = useAppSelector((state) => state.app);
  const { data: siteData } = useQuery("sites", getSites);
  const selectedSite: ISite = siteData?.find(
    (site: ISite) => site._id === app.selectedSite
  );

  const { isLoading, isError, error, data } = useQuery(
    ["sites", app.selectedSite],
    () =>
      getSiteEvents(
        app.selectedSite !== null ? app.selectedSite : siteData[0]._id,
        "short"
      ),
    {
      enabled: app.selectedSite !== null,
    }
  );

  return (
    <main className="main-content">
      {selectedSite !== undefined ? (
        <h1>{selectedSite.name}</h1>
      ) : (
        <h1>loading...</h1>
      )}
      <div className="main-content-container">
        <div className="complication-box">
          <div className="main-content-left">
            <div className="complication-container">
              <h2>Views</h2>
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
            </div>
          </div>
          <div className="main-content-right">
            <div className="complication-container">
              <h2>Unique Visitors</h2>
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
            </div>
          </div>
          <div className="main-content-bottom">
            <div className="complication-container">a</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainView;
