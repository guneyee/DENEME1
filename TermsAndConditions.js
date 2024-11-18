import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/selfie-instructions");
  };

  return (
    <div>
      <h1>Terms and Conditions</h1>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default TermsAndConditions;
