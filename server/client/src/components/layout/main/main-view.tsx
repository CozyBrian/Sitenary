import React from "react";
import "./style.scss";

const MainView = () => {
  return (
    <main className="main-content">
      <h1>Etonote</h1>
      <div className="main-content-container">
        <div className="complication-box">
          <div className="main-content-left">
            <div className="complication-container">
              <h2>Views</h2>
            </div>
          </div>
          <div className="main-content-right">
            <div className="complication-container">
              <h2>Unique Visitors</h2>
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
