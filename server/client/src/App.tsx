import MainView from "./components/layout/main/main-view";
import Sidebar from "./components/layout/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="main-page-container">
        <Sidebar />
        <MainView />
      </div>
    </div>
  );
}

export default App;
