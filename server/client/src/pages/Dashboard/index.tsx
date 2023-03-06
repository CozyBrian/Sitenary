import EmptyView from "../../components/layout/main/empty-view";
import MainView from "../../components/layout/main/main-view";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import Overlays from "../../components/overlays";
import { useAppSelector } from "../../hooks";
import "./styles.scss";

const Dashboard = () => {
  const app = useAppSelector((state) => state.app);
  return (
    <div className="main-page-container">
      <Sidebar />
      {app.selectedSite ? <MainView /> : <EmptyView />}
      <Overlays />
    </div>
  );
};

export default Dashboard;
