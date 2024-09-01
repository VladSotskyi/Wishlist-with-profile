import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import SolarSystem from "./components/solarSystem";
import { ToastContainer } from "react-toastify";
import DoubleSolarSystem from "./components/doubleSolarSystem";
import { useAuth } from "./context/authContext";
import "./style/App.css";

const SolarSystemDisplay = ({ currentUser }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    return currentUser ? <DoubleSolarSystem /> : <SolarSystem />;
  }

  return <DoubleSolarSystem />;
};

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
        <SolarSystemDisplay currentUser={currentUser} />
      </div>
    </Router>
  );
}

export default App;
