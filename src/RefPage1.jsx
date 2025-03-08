import React from "react";
import CountdownTimer from "./Timer"; // Adjust the path if needed
import { useLocation } from 'react-router-dom';

const RefPage = () => {
  const location = useLocation();
  const { matchData } = location.state || {};  // Accessing the matchID passed via navigation
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <h1>Match ID: {matchData.matchID }</h1>
      <CountdownTimer minutes={3} seconds={0} />
    </div>
  );
};

export default RefPage;
