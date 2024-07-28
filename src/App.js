import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import SolarSystem from "../src/components/solarSystem";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>
      <SolarSystem />
    </Router>
  );
}

export default App;
