import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
