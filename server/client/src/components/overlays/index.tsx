import React from "react";
import { useAppSelector } from "../../hooks";
import AddSiteOverlays from "./AddSiteOverlay";

const Overlays = () => {
  const app = useAppSelector((state) => state.app);

  return <>{app.addSiteModalOpen && <AddSiteOverlays />}</>;
};

export default Overlays;
