import MainView from "./components/layout/main/main-view";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Overlays from "./components/overlays";

function App() {
  return (
    <div className="App">
      <div className="main-page-container">
        <Sidebar />
        <MainView />
        <Overlays />
      </div>
    </div>
  );
}

export default App;
