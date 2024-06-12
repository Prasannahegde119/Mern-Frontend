import React from "react";
import { useNavigate } from "react-router-dom";
import "./invoice.css";

function ThanksPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="thank-you-page">
        <div className="thank-you-content">
          <h1>Thank You for Shopping!</h1>
          <p>
            We appreciate your business. If you have any questions, please email
            support@example.com.
          </p>
          <button onClick={handleBackToHome} className="home-button">
            Go Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default ThanksPage;
