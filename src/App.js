import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Explore from "./pages/explore";
import SignModal from "./components/modal";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <Router>
      <NavBar openModal={handleOpen} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>
      <SignModal showModal={show} closeModal={handleClose} />
    </Router>
  );
}

export default App;
