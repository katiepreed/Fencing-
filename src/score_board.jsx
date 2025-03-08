import React, { useState } from "react"; // Add useState import

// Importing fencer images
import fencerLeft from "./images/fencer-left.png"; // Adjust path as needed
import fencerRight from "./images/fencer-right.png"; // Adjust path as needed

const ScoreBoard = ({ fencer, title, score, increaseScore, decreaseScore }) => {
  const [animation, setAnimation] = useState(false); // State for animation

  // Function to trigger score animation
  const triggerAnimation = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 2000); // Animation lasts 2 seconds
  };

  // Determine which fencer image to show
  const fencerImage = fencer === "Home" ? fencerLeft : fencerRight;

  return (
    <div
      style={{
        backgroundColor: "White",
        padding: "20px",
        borderRadius: "10px",
        width: "200px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Fencer image animation */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: title === "Fencer 1" ? "-50px" : "50px", // Adjust positioning logic
          transition: "all 0.5s ease",
          opacity: animation ? 1 : 0, // Control opacity based on animation state
          transform: animation ? "scale(1)" : "scale(0)", // Apply scaling for animation
        }}
      >
        <img
          src={fencerImage}
          alt={title}
          style={{
            width: "150px",  // Adjust the size of the fencer image
            height: "auto",  // Maintain the aspect ratio
            animation: animation ? "bounce 0.5s ease-out" : "none",
          }}
        />
      </div>

      <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "15px" }}>{title}</h2>
      <div style={{ fontSize: "3rem", fontWeight: "bold", color: "#333" }}>{score}</div>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => {
            increaseScore(); // Update score for Fencer 1 or Fencer 2
            triggerAnimation(); // Trigger animation when score increases
          }}
          style={buttonStyles("#4A90E2", false)} // Keep "Add Point" normal size
        >
          Add Point
        </button>
        <button
          onClick={() => {
            decreaseScore(); // Update score for Fencer 1 or Fencer 2
            triggerAnimation(); // Trigger animation when score decreases
          }}
          style={buttonStyles("#B0B0B0", true)} // Smaller height for "Remove Point"
        >
          Remove Point
        </button>
      </div>
    </div>
  );
};

// Styling for buttons
const buttonStyles = (bgColor, smallerHeight = false) => ({
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: smallerHeight ? "8px 20px" : "14px 20px", // Increased height for "Add Point"
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  margin: "5px", // Smaller margin to bring the buttons closer
  width: "100%", // Ensure both buttons have the same width
  transition: "all 0.3s ease",
});

export default ScoreBoard;