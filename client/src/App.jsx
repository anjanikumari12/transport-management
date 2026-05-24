import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" />;

  }

  return children;
}

function App() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out");

  };

  return (

    <BrowserRouter>

      <nav>

        <Link to="/" style={{ marginRight: "15px" }}>
          Home
        </Link>

        <Link to="/vehicles" style={{ marginRight: "15px" }}>
          Vehicles
        </Link>

        <Link to="/drivers" style={{ marginRight: "15px" }}>
          Drivers
        </Link>

        <Link to="/bookings" style={{ marginRight: "15px" }}>
          Bookings
        </Link>

        <Link to="/login" style={{ marginRight: "15px" }}>
          Login
        </Link>

        <Link
          to="/register"
          style={{ marginRight: "15px" }}
        >
          Register
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </nav>

      <div className="container">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;