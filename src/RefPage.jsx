import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import CountdownTimer from "./Timer"; // Adjust the path if needed
import ScoreBoard from "./score_board"; // Import ScoreBoard component

const RefPage = () => {
  const location = useLocation();
  const { matchData } = location.state || {}; 

  // Manage scores for both fencers
  const [homeScore, setHomeScore] = useState(matchData.homeTeamScore || 0);
  const [awayScore, setAwayScore] = useState(matchData.awayTeamScore || 0);

  // Increase score functions
  const increaseHomeScore = () => setHomeScore(homeScore + 1);
  const increaseAwayScore = () => setAwayScore(awayScore + 1);

  // Decrease score functions
  const decreaseHomeScore = () => setHomeScore(homeScore - 1);
  const decreaseAwayScore = () => setAwayScore(awayScore - 1);

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
          <ScoreBoard 
            fencer="Home"
            title={matchData.homeName || "Home Fencer"} 
            score={homeScore} 
            increaseScore={increaseHomeScore} 
            decreaseScore={decreaseHomeScore} 
          />
        </div>

        {/* ScoreBoard for Fencer 2 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreBoard 
            fencer="Away"
            title={matchData.awayName || "Away Fencer"} 
            score={awayScore} 
            increaseScore={increaseAwayScore} 
            decreaseScore={decreaseAwayScore} 
          />
        </div>
      </div>
    </div>
  );
};

export default RefPage;
