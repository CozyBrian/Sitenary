import cn from "classnames";
import React, { useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks";
import useElementScroll from "../../../hooks/useElementScroll";
import { IEventsResponse, ISite, IViewsDataSet } from "../../../types";
import { countProperty, ICount, reduceData } from "../../../utils/reduce";
import { getSiteEvents, getSites } from "../../../utils/Sitenary";
import BarChart from "../../Charts/bar-chart";
import DoughnutChart from "../../Charts/doughnut-chart";
import "./style.scss";

const MainView = () => {
  const app = useAppSelector((state) => state.app);
  const [viewDataSet, setViewDataSet] = useState<IViewsDataSet[]>([]);
  const [originsDataSet, setOriginsDataSet] = useState<ICount>({});
  const [platformsDataSet, setPlatformsDataSet] = useState<ICount>({});
  const { data: siteData } = useQuery("sites", getSites);
  const selectedSite: ISite = siteData?.find(
    (site: ISite) => site._id === app.selectedSite
  );

  const MainContainerRef = useRef<HTMLDivElement>(null);
  const elementScroll = useElementScroll(MainContainerRef);

  console.log(elementScroll);

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
        const O_Dataset = countProperty(data, "origin");
        const P_Dataset = countProperty(data, "platform");
        setOriginsDataSet(O_Dataset);
        setPlatformsDataSet(P_Dataset);
        setViewDataSet(dataSet);
      },
    }
  );

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
                        labels: viewDataSet.map(
                          (data) => data.date.split("-")[2]
                        ),
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
                        labels: viewDataSet.map(
                          (data) => data.date.split("-")[2]
                        ),
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
                        labels: Object.entries(originsDataSet).map(
                          (data) => data[0]
                        ),
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
        </div>
      </main>
    </section>
  );
};

export default MainView;
