import { Route, Routes } from "react-router-dom";
import AuthScreen from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthScreen />} />
      </Routes>
    </div>
  );
}

export default App;
