import cn from "classnames";
import React, { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import { useAppSelector } from "../../../hooks";
import useElementScroll from "../../../hooks/useElementScroll";
import { ICount, IEventsResponse, ISite, IViewsDataSet } from "../../../types";
import { deleteSite, getSiteEvents, getSites } from "../../../utils/Sitenary";
import { months } from "../../../utils/utils";
import BarChart from "../../Charts/bar-chart";
import DoughnutChart from "../../Charts/doughnut-chart";
import SettingsContainer from "./settings";
import "./style.scss";

const MainView = () => {
  const app = useAppSelector((state) => state.app);
  const [activePeriod, setActivePeriod] = useState("short");
  const [viewDataSet, setViewDataSet] = useState<IViewsDataSet[]>([]);
  const [originsDataSet, setOriginsDataSet] = useState<ICount>({});
  const [platformsDataSet, setPlatformsDataSet] = useState<ICount>({});
  const { data: siteData } = useQuery("sites", getSites);
  const selectedSite: ISite = siteData?.find(
    (site: ISite) => site._id === app.selectedSite
  );

  const activePeriodSelections = ["short", "medium", "long"];

  const MainContainerRef = useRef<HTMLDivElement>(null);
  const elementScroll = useElementScroll(MainContainerRef);

  const { isLoading, isError, data } = useQuery(
    ["sites", activePeriod, app.selectedSite],
    () =>
      getSiteEvents(
        app.selectedSite !== null ? app.selectedSite : siteData[0]._id,
        activePeriod
      ),
    {
      enabled: app.selectedSite !== null,
      onSuccess: (data: IEventsResponse) => {
        setOriginsDataSet(data.origins);
        setPlatformsDataSet(data.platforms);
        if (activePeriod === "long") {
          const today = new Date();
          const vdsOld = data.dataSet.filter((data) => {
            return parseInt(data.date) > today.getMonth() + 1;
          });
          const vdsNew = data.dataSet.filter((data) => {
            return parseInt(data.date) <= today.getMonth() + 1;
          });
          setViewDataSet([...vdsOld, ...vdsNew]);
        } else {
          setViewDataSet(data.dataSet);
        }
      },
    }
  );

  const { mutate } = useMutation("sites", deleteSite, {});

  return (
    <section ref={MainContainerRef} className="main">
      <header
        className={cn("main-content-header", { scroll: elementScroll > 50 })}
      >
        {selectedSite !== undefined ? (
          <h1>{selectedSite.name}</h1>
        ) : (
          <h1>loading...</h1>
        )}
      </header>
      <main className="main-content">
        <div className="main-content-container">
          <div className="main-switch-container">
            <div className="main-switch">
              {activePeriodSelections.map((period) => {
                return (
                  <div
                    key={period}
                    onClick={() => setActivePeriod(period)}
                    className={cn("main-switch-item", {
                      active: activePeriod === period,
                    })}
                  >
                    {period}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="complication-box">
            <div className="complication-parent">
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
                        labels: viewDataSet.map((data) => {
                          switch (activePeriod) {
                            case "long":
                              const date = data.date ? data.date : "2";
                              const month = months[parseInt(date) - 1];
                              return month ? month.slice(0, 3) : "Jan";

                            default:
                              return data.date.split("-")[2];
                          }
                        }),
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
                        labels: viewDataSet.map((data) => {
                          switch (activePeriod) {
                            case "long":
                              const date = data.date ? data.date : "2";
                              const month = months[parseInt(date) - 1];
                              return month ? month.slice(0, 3) : "Jan";

                            default:
                              return data.date.split("-")[2];
                          }
                        }),
                        datasets: [
                          {
                            label: "Unique Visitors",
                            data: viewDataSet.map((data) => data.uniqueIPs),
                            backgroundColor: "#0369A1",
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="complication-parent">
              <div className="complication-container">
                <h2>Pages</h2>
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
                <div className=" pie-chart">
                  {data !== undefined && (
                    <DoughnutChart
                      chartData={{
                        labels: Object.entries(originsDataSet).map((data) => {
                          const route = data[0].split("/");
                          return "/" + route[route.length - 1];
                        }),
                        datasets: [
                          {
                            label: "Pages",
                            data: Object.entries(originsDataSet).map(
                              (data) => data[1]
                            ),
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="complication-container">
                <h2>OSs</h2>
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
                <div className=" pie-chart">
                  {data !== undefined && (
                    <DoughnutChart
                      chartData={{
                        labels: Object.entries(platformsDataSet).map(
                          (data) => data[0]
                        ),
                        datasets: [
                          {
                            label: "Pages",
                            data: Object.entries(platformsDataSet).map(
                              (data) => data[1]
                            ),
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <SettingsContainer
            selectedSite={selectedSite}
            mutate={() => {
              mutate(selectedSite._id);
            }}
          />
        </div>
      </main>
    </section>
  );
};

export default MainView;
