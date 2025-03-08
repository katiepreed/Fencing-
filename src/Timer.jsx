import React, { useState, useEffect } from "react";

// Define color palette
const colors = {
  background: "#FFFFFF", // White background
  accent: "#4A90E2", // Blue accent color
  primary: "#4F5D75", // Soft blue for the timer
  light: "#BFC0C0", // Light grey
  white: "#FFFFFF", // White
  green: "#4CAF50", // Green for the start button
  yellow: "#FFC107", // Yellow for progress bar warning
  red: "#F44336", // Red for the last 10 seconds
  darkBlue: "#1A1C3C", // Dark, almost black blue for the title
  darkText: "#333333", // Dark gray for the timer text
  darkYellow: "#FF9800", // Darker yellow when pause is clicked
};

const CountdownTimer = () => {
  const [totalTime, setTotalTime] = useState(180); // Default to 3 minutes (180 seconds)
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timerState, setTimerState] = useState("setup"); // "setup" or "running"
  const [minutes, setMinutes] = useState(3); // Default minutes to 3
  const [seconds, setSeconds] = useState(0); // Default seconds to 0
  const [inputMinutes, setInputMinutes] = useState(3); // Minutes input state
  const [inputSeconds, setInputSeconds] = useState(0); // Seconds input state

  useEffect(() => {
    // Check if the timer is running, and update the time remaining every second
    if (isRunning) {
      const timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = totalTime - elapsedTime;
        setTimeRemaining(Math.max(remainingTime, 0)); // Update time remaining
      }, 1000);

      return () => clearInterval(timerInterval); // Clear interval on unmount or stop
    }
  }, [isRunning, startTime, totalTime]);

  useEffect(() => {
    // If time remaining reaches 0, stop the timer and go back to setup state
    if (timeRemaining <= 0) {
      setIsRunning(false);
      setTimerState("setup");
    }
  }, [timeRemaining]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const validateInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.slice(0, 2);
  };

  const setTimer = () => {
    const newTotalTime = inputMinutes * 60 + inputSeconds;
    setTotalTime(newTotalTime);
    setTimeRemaining(newTotalTime);
    setTimerState("running"); // This should trigger the countdown
    setStartTime(Date.now()); // Set start time when we start the countdown
    setIsRunning(true); // Start the timer immediately after setting it
  };

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - (totalTime - timeRemaining) * 1000);
      setIsRunning(true);
    }
  };

  const backButtonHandler = () => {
    setTimerState("setup");
    setTimeRemaining(totalTime);
    setIsRunning(false);
  };

  const progressBarPercentage = (timeRemaining / totalTime) * 100;

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.white,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "85px",
        borderRadius: "10px",
        width: "350px",
        margin: "auto",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          color: colors.darkBlue,
          fontSize: "2.5rem",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Countdown Timer
      </h1>
      {timerState === "setup" ? (
        <>
          <div>
            <input
              type="text"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(validateInput(e.target.value))}
              style={inputStyles}
            />
            <span
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: colors.darkText,
              }}
            >
              :
            </span>
            <input
              type="text"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(validateInput(e.target.value))}
              style={inputStyles}
            />
          </div>
          <button onClick={setTimer} style={buttonStyles(colors.accent)}>
            Set Timer
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: colors.darkText,
            }}
          >
            {formatTime(timeRemaining)}
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={toggleTimer}
              style={buttonStyles(
                isRunning ? colors.darkYellow : colors.green,
                "pause"
              )}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
          </div>
          <div
            style={{
              height: "10px",
              backgroundColor: colors.primary,
              borderRadius: "5px",
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressBarPercentage}%`,
                backgroundColor:
                  timeRemaining <= 10
                    ? colors.red
                    : timeRemaining <= 30
                    ? colors.yellow
                    : colors.green,
                height: "100%",
              }}
            />
          </div>
          {/* Back button showing when timer is running */}
          {timerState === "running" && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "none",
                border: "none",
                color: colors.darkText,
                fontSize: "2rem",
                cursor: "pointer",
                display: "block", // Show the button only when the timer is running
              }}
              onClick={backButtonHandler}
            >
              &lt;
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Styling for buttons and inputs
const inputStyles = {
  width: "60px",
  height: "50px",
  textAlign: "center",
  fontSize: "3rem", // Same font size as countdown
  fontWeight: "bold", // Bold text to match countdown
  backgroundColor: colors.background, // Remove the background color
  color: colors.darkText, // Dark gray text color for visibility
  border: "none",
  margin: "5px",
};

const buttonStyles = (bgColor, type) => ({
  backgroundColor: bgColor,
  color: colors.white,
  border: "none",
  borderRadius: "5px",
  padding: type === "pause" ? "20px 40px" : "15px 30px", // Pause button is bigger
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease",
  marginTop: "10px",
});

export default CountdownTimer;
