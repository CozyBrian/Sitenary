import React from "react";
import { useAppSelector } from "../../hooks";
import AddSiteOverlays from "./AddSiteOverlay";
import EmptySiteOverlay from "./EmptySitedataOverlay";

const Overlays = () => {
  const app = useAppSelector((state) => state.app);

  return (
    <>
      {app.addSiteModalOpen && <AddSiteOverlays />}
      {app.isSiteDataEmpty && <EmptySiteOverlay />}
    </>
  );
};

export default Overlays;
