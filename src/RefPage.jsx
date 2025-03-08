import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CountdownTimer from "./Timer"; // Adjust the path if needed
import ScoreBoard from "./score_board"; // Import ScoreBoard component

const RefPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { matchData } = location.state || {};

  // Manage scores for both fencers
  const [homeScore, setHomeScore] = useState(matchData?.homeTeamScore || 0);
  const [awayScore, setAwayScore] = useState(matchData?.awayTeamScore || 0);

  // Update localStorage when scores change
  useEffect(() => {
    if (matchData) {
      // Get current matches from localStorage
      const savedMatches = localStorage.getItem("fencingMatches");
      if (savedMatches) {
        const matches = JSON.parse(savedMatches);

        // Find and update the current match
        const updatedMatches = matches.map((match) => {
          if (match.matchID === matchData.matchID) {
            return {
              ...match,
              homeTeamScore: homeScore,
              awayTeamScore: awayScore,
              matchStatus: "inProgress",
            };
          }
          return match;
        });

        // Save back to localStorage
        localStorage.setItem("fencingMatches", JSON.stringify(updatedMatches));
      }
    }
  }, [homeScore, awayScore, matchData]);

  // Increase score functions
  const increaseHomeScore = () => setHomeScore(homeScore + 1);
  const increaseAwayScore = () => setAwayScore(awayScore + 1);

  // Decrease score functions
  const decreaseHomeScore = () => {
    if (homeScore > 0) setHomeScore(homeScore - 1);
  };
  const decreaseAwayScore = () => {
    if (awayScore > 0) setAwayScore(awayScore - 1);
  };

  // Finish bout function
  const finishBout = () => {
    // Get current matches from localStorage
    const savedMatches = localStorage.getItem("fencingMatches");
    if (savedMatches) {
      const matches = JSON.parse(savedMatches);

      // Find and update the current match
      const updatedMatches = matches.map((match) => {
        if (match.matchID === matchData.matchID) {
          return {
            ...match,
            homeTeamScore: homeScore,
            awayTeamScore: awayScore,
            matchStatus: "completed",
          };
        }
        return match;
      });

      // Save back to localStorage
      localStorage.setItem("fencingMatches", JSON.stringify(updatedMatches));
    }

    // Navigate back to homepage
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      {/* Countdown Timer */}
      <div
        style={{
          marginBottom: "20px",
          width: "600px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CountdownTimer minutes={3} seconds={0} />
      </div>

      {/* Scoreboards Container */}
      <div
        style={{
          display: "flex",
          width: "600px",
          justifyContent: "space-evenly",
        }}
      >
        {/* ScoreBoard for Fencer 1 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreBoard
            fencer="Home"
            title={matchData?.homeName || "Home Fencer"}
            score={homeScore}
            increaseScore={increaseHomeScore}
            decreaseScore={decreaseHomeScore}
          />
        </div>

        {/* ScoreBoard for Fencer 2 */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ScoreBoard
            fencer="Away"
            title={matchData?.awayName || "Away Fencer"}
            score={awayScore}
            increaseScore={increaseAwayScore}
            decreaseScore={decreaseAwayScore}
          />
        </div>
      </div>

      {/* Finish Bout Button */}
      <div
        style={{
          marginTop: "20px",
          width: "600px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={finishBout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Finish Bout
        </button>
      </div>
    </div>
  );
};

export default RefPage;
