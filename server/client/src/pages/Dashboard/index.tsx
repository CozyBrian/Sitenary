import MainView from "../../components/layout/main/main-view";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import Overlays from "../../components/overlays";
import "./styles.scss";

const Dashboard = () => {
  return (
    <div className="main-page-container">
      <Sidebar />
      <MainView />
      <Overlays />
    </div>
  );
};

export default Dashboard;
