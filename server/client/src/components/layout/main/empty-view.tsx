import React from "react";
import Header from "../header/header";

const EmptyView = () => {
  return (
    <div className="empty-view main">
      <Header elementScroll={0} />
      No site selected 🥲
    </div>
  );
};

export default EmptyView;
