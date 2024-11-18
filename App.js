// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import TermsAndConditions from "./components/TermsAndConditions";
import TakeSelfieInstructions from "./components/TakeSelfieInstructions";
import CameraPermission from "./components/CameraPermission";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/selfie-instructions" element={<TakeSelfieInstructions />} />
        <Route path="/camera-permission" element={<CameraPermission />} />
      </Routes>
    </Router>
  );
};

export default App;
