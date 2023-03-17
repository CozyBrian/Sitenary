import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthScreen from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthScreen />} />
      </Routes>
    </div>
  );
}

export default App;
