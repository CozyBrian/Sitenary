import React, { useState } from "react";
import cn from "classnames";
import threedots from "../../assets/icons/three_dots.svg";
import logout from "../../assets/icons/logout.png";
import { ISite } from "../../types";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";

const Header = ({
  selectedSite,
  elementScroll,
}: {
  selectedSite: ISite;
  elementScroll: number;
}) => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogOut = () => {
    console.log("clicked!");
    localStorage.removeItem("accessToken");
    dispatch(action.app.setIsAuthenticated(true));
    window.location.reload();
  };
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
            setIsMenuOpen(!isMenuOpen);
          }}
          className="header-action"
        >
          <img src={threedots} alt="close-icon" />
        </div>
        {isMenuOpen && (
          <div className="header-action-menu">
            <div onClick={handleLogOut} className="header-action-menu-item">
              <img src={logout} alt="close-icon" />
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
