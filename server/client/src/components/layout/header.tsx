import cn from "classnames";
import React from "react";
import { ISite } from "../../types";

const Header = ({
  selectedSite,
  elementScroll,
}: {
  selectedSite: ISite;
  elementScroll: number;
}) => {
  return (
    <header
      className={cn("main-content-header", { scroll: elementScroll > 50 })}
    >
      <div>
        {selectedSite !== undefined ? (
          <h1>{selectedSite.name}</h1>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
      <div className="header-actions-section">
        <div
          onClick={() => {
            console.log("clicked!");
          }}
          className="header-action"
        >
          +
        </div>
      </div>
    </header>
  );
};

export default Header;
