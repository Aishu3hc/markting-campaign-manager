import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Shopping from "./pages/shopping";
import CampaignList from "./pages/CampaignList";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/campaigns" element={<CampaignList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
