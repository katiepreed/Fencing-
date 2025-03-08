import React from "react";
import CountdownTimer from "./Timer"; // Adjust the path if needed

const RefPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <CountdownTimer minutes={3} seconds={0} />
    </div>
  );
};

export default RefPage;