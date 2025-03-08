import React from "react";
import CountdownTimer from "./Timer"; // Adjust the path if needed
import ScoreBoard from "./score_board"; // Import ScoreBoard component

const RefPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      
      {/* Countdown Timer */}
      <div style={{ marginBottom: "20px", width: "600px", display: "flex", justifyContent: "center" }}>
        <CountdownTimer minutes={3} seconds={0} />
      </div>
      
      {/* Scoreboards Container */}
      <div style={{ display: "flex", width: "600px", justifyContent: "space-evenly" }}>
        {/* ScoreBoard for Fencer 1 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreBoard title="Fencer 1" />
        </div>

        {/* ScoreBoard for Fencer 2 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreBoard title="Fencer 2" />
        </div>
      </div>

      {/* Finish Bout Button */}
      <div style={{ marginTop: "20px", width: "600px", display: "flex", justifyContent: "center" }}>
        <button
          style={{
            backgroundColor: "#FF6347", // Tomato red color
            color: "white",
            padding: "20px 0", // Increased padding for a bigger button
            fontSize: "18px", // Increased font size
            fontWeight: "bold", // Thicker font weight
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "87%", // Make the button as wide as the scoreboards
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            // Handle the finish bout logic here
            alert("Bout Finished!");
          }}
        >
          Finish Bout
        </button>
      </div>
    </div>
  );
};

export default RefPage;