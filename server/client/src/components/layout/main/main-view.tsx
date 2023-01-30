import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks";
import { IEventsResponse, ISite, IViewsDataSet } from "../../../types";
import { reduceData } from "../../../utils/reduce";
import { getSiteEvents, getSites } from "../../../utils/Sitenary";
import BarChart from "../../Charts/bar-chart";
import "./style.scss";

const MainView = () => {
  const app = useAppSelector((state) => state.app);
  const [viewDataSet, setViewDataSet] = useState<IViewsDataSet[]>([]);
  const { data: siteData } = useQuery("sites", getSites);
  const selectedSite: ISite = siteData?.find(
    (site: ISite) => site._id === app.selectedSite
  );

  const { isLoading, isError, data } = useQuery(
    ["sites", app.selectedSite],
    () =>
      getSiteEvents(
        app.selectedSite !== null ? app.selectedSite : siteData[0]._id,
        "short"
      ),
    {
      enabled: app.selectedSite !== null,
      onSuccess: (data: IEventsResponse) => {
        const dataSet = reduceData(data);
        setViewDataSet(dataSet);
      },
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
              {isError && (
                <div className="loading-container">
                  <p>There was an error the data</p>
                </div>
              )}
              {data !== undefined && (
                <BarChart
                  chartData={{
                    labels: viewDataSet.map((data) => data.date.split("-")[2]),
                    datasets: [
                      {
                        label: "Views",
                        data: viewDataSet.map((data) => data.count),
                        backgroundColor: "#0284C7",
                      },
                    ],
                  }}
                />
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
              {data !== undefined && (
                <BarChart
                  chartData={{
                    labels: viewDataSet.map((data) => data.date.split("-")[2]),
                    datasets: [
                      {
                        label: "Unique Visitors",
                        data: viewDataSet.map((data) => data.uniqueIPs),
                        backgroundColor: (ctx) => {
                          const index = ctx.dataIndex;
                          const dataset = ctx.dataset.data as number[];
                          const filteredArr = dataset.filter((x) => x > 0);
                          const indexx = dataset.indexOf(
                            Math.min.apply(Math, filteredArr)
                          );

                          return index === indexx ? "#EF4444" : "#0369A1";
                        },
                      },
                    ],
                  }}
                />
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
