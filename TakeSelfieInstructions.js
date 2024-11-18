// src/components/TakeSelfieInstructions.js
import React from "react";
import { useNavigate } from "react-router-dom";

const TakeSelfieInstructions = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/camera-permission"); // Kamera izni sayfasına yönlendirme
  };

  return (
    <div>
      <h1>Take a Selfie</h1>
      <p>Follow these steps for the best scan:</p>
      <ul>
        <li>Pull your hair back and remove anything that hides your skin.</li>
        <li>Use a well-lit area for each scan.</li>
        <li>Relax your face. No smiling.</li>
        <li>Make sure your face is clean of any products.</li>
      </ul>
      <button onClick={handleNextClick}>Proceed to Camera Permission</button>
    </div>
  );
};

export default TakeSelfieInstructions;
