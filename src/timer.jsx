let totalTime = 180; // Default: 3 minutes (180 seconds)
let timeRemaining = totalTime;
let startTime;
let isRunning = false;

// UI Elements
let buttonStart, buttonReset;
let inputMinutes, inputSeconds, buttonSet;
let scoreFencer1 = 0, scoreFencer2 = 0;
let timerState = "setup"; // "setup" or "running"

// Colors
const colors = {
  background: '#000000',
  textColor: '#FFFFFF',
  accent: '#444444',
  red: '#FF0000',
  green: '#00FF00'
};

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  
  // Create and style input fields for timer
  inputMinutes = createInput('3');
  inputMinutes.position(width/2 - 80, 150);
  inputMinutes.size(50, 40);
  inputMinutes.input(validateInput);
  styleInput(inputMinutes);
  
  inputSeconds = createInput('00');
  inputSeconds.position(width/2 + 20, 150);
  inputSeconds.size(50, 40);
  inputSeconds.input(validateInput);
  styleInput(inputSeconds);
  
  // Create timer labels
  let minutesLabel = createElement('h4', 'Min');
  minutesLabel.position(width/2 - 80, 120);
  styleLabel(minutesLabel);
  
  let secondsLabel = createElement('h4', 'Sec');
  secondsLabel.position(width/2 + 20, 120);
  styleLabel(secondsLabel);
  
  let separator = createElement('h2', ':');
  separator.position(width/2 - 5, 150);
  styleLabel(separator);
  
  // Create set button
  buttonSet = createButton('SET TIMER');
  buttonSet.position(width/2 - 60, 220);
  buttonSet.size(120, 45);
  buttonSet.mousePressed(setTimer);
  styleButton(buttonSet, colors.accent);
  
  // Create timer control buttons
  buttonStart = createButton('START');
  buttonStart.position(width/2 - 130, 220);
  buttonStart.size(120, 45);
  buttonStart.mousePressed(toggleTimer);
  styleButton(buttonStart, colors.green);
  
  buttonReset = createButton('RESET');
  buttonReset.position(width/2 + 10, 220);
  buttonReset.size(120, 45);
  buttonReset.mousePressed(resetTimer);
  styleButton(buttonReset, colors.accent);
  
  // Create scoring buttons for Fencer 1
  let buttonPlus1 = createButton('+');
  buttonPlus1.position(width/4 - 30, 480);
  buttonPlus1.size(60, 60);
  buttonPlus1.mousePressed(() => changeScore(1, 1));
  styleButton(buttonPlus1, colors.accent);
  buttonPlus1.style('font-size', '30px');
  
  let buttonMinus1 = createButton('-');
  buttonMinus1.position(width/4 + 50, 480);
  buttonMinus1.size(60, 60);
  buttonMinus1.mousePressed(() => changeScore(1, -1));
  styleButton(buttonMinus1, colors.accent);
  buttonMinus1.style('font-size', '30px');
  
  // Create scoring buttons for Fencer 2
  let buttonMinus2 = createButton('-');
  buttonMinus2.position(3*width/4 - 110, 480);
  buttonMinus2.size(60, 60);
  buttonMinus2.mousePressed(() => changeScore(2, -1));
  styleButton(buttonMinus2, colors.accent);
  buttonMinus2.style('font-size', '30px');
  
  let buttonPlus2 = createButton('+');
  buttonPlus2.position(3*width/4 - 30, 480);
  buttonPlus2.size(60, 60);
  buttonPlus2.mousePressed(() => changeScore(2, 1));
  styleButton(buttonPlus2, colors.accent);
  buttonPlus2.style('font-size', '30px');
  
  // Set visibility based on state
  updateUIVisibility();
}

function draw() {
  background(colors.background);
  
  // Update timer if it's running
  if (isRunning) {
    timeRemaining = totalTime - ((millis() - startTime) / 1000);
    
    if (timeRemaining <= 0) {
      timeRemaining = 0;
      isRunning = false;
      buttonStart.html('START');
      
      // Optional: Add a buzzer or end-of-bout indication here
    }
  }
  
  // Display fencer labels
  textSize(48);
  fill(colors.textColor);
  text("FENCER1", width/4, 50);
  text("FENCER2", 3*width/4, 50);
  
  // Display scores
  textSize(120);
  text(scoreFencer1, width/4, 300);
  text(scoreFencer2, 3*width/4, 300);
  
  // Display timer
  displayTimer();
  
  // Draw line separating timer and scoring sections
  stroke(colors.textColor);
  strokeWeight(2);
  line(0, 400, width, 400);
  noStroke();
}

function displayTimer() {
  // Format time as MM:SS
  let minutes = floor(timeRemaining / 60);
  let seconds = floor(timeRemaining % 60);
  
  // Add leading zeros
  let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
  
  // Get timer color based on remaining time
  let timerColor = colors.textColor;
  if (timeRemaining <= 10) {
    timerColor = colors.red;
  }
  
  // Draw timer display based on state
  if (timerState === "running") {
    textSize(100);
    fill(timerColor);
    text(timeString, width/2, 120);
  } 
  
//   else {
//     // Show title in setup mode
//     //fill(colors.textColor);
//     //textSize(36);
//     //text("BOUT TIMER", width/2, 50);
//   }
  
  // Update button text based on timer state
  if (isRunning) {
    buttonStart.html('PAUSE');
  } else {
    buttonStart.html('START');
  }
}

function validateInput() {
  // Limit input to numbers
  this.value(this.value().replace(/[^0-9]/g, ''));
  
  // Limit to 2 digits
  if (this.value().length > 2) {
    this.value(this.value().substring(0, 2));
  }
  
  // Limit seconds to 59
  if (this === inputSeconds && parseInt(this.value()) > 59) {
    this.value('59');
  }
}

function setTimer() {
  let minutes = parseInt(inputMinutes.value() || '0');
  let seconds = parseInt(inputSeconds.value() || '0');
  
  // Ensure we have at least 1 second
  if (minutes === 0 && seconds === 0) {
    seconds = 1;
  }
  
  totalTime = (minutes * 60) + seconds;
  timeRemaining = totalTime;
  timerState = "running";
  
  updateUIVisibility();
}

function toggleTimer() {
  if (!isRunning && timeRemaining > 0) {
    // Start timer
    startTime = millis() - ((totalTime - timeRemaining) * 1000);
    isRunning = true;
    buttonStart.html('PAUSE');
  } else {
    // Pause timer
    isRunning = false;
    buttonStart.html('START');
  }
}

function resetTimer() {
  // Stop the timer
  isRunning = false;
  
  // Return to setup mode
  timerState = "setup";
  
  // Update UI to show input fields
  updateUIVisibility();
  
  // Pre-fill the input fields with the last set time
  let minutes = floor(totalTime / 60);
  let seconds = floor(totalTime % 60);
  inputMinutes.value(minutes);
  inputSeconds.value(nf(seconds, 2));
}

function changeScore(fencer, change) {
  if (fencer === 1) {
    scoreFencer1 += change;
    // Ensure score doesn't go below 0
    scoreFencer1 = max(0, scoreFencer1);
  } else {
    scoreFencer2 += change;
    // Ensure score doesn't go below 0
    scoreFencer2 = max(0, scoreFencer2);
  }
}

function updateUIVisibility() {
  // Show/hide elements based on state
  if (timerState === "setup") {
    inputMinutes.show();
    inputSeconds.show();
    buttonSet.show();
    buttonStart.hide();
    buttonReset.hide();
  } else {
    inputMinutes.hide();
    inputSeconds.hide();
    buttonSet.hide();
    buttonStart.show();
    buttonReset.show();
  }
}

function styleInput(element) {
  element.style('background-color', colors.accent);
  element.style('color', colors.textColor);
  element.style('border', 'none');
  element.style('border-radius', '5px');
  element.style('padding', '8px');
  element.style('font-size', '18px');
  element.style('text-align', 'center');
  element.style('font-family', 'Arial, sans-serif');
}

function styleButton(button, bgColor) {
  button.style('background-color', bgColor);
  button.style('color', colors.textColor);
  button.style('border', '2px solid white');
  button.style('border-radius', '5px');
  button.style('padding', '10px');
  button.style('font-size', '16px');
  button.style('font-weight', 'bold');
  button.style('cursor', 'pointer');
  button.style('font-family', 'Arial, sans-serif');
  
  // Add hover effect
  button.mouseOver(function() {
    this.style('background-color', brightenColor(bgColor));
  });
  
  button.mouseOut(function() {
    this.style('background-color', bgColor);
  });
}

function styleLabel(element) {
  element.style('color', colors.textColor);
  element.style('font-family', 'Arial, sans-serif');
  element.style('margin', '0');
}

// Helper function to brighten colors for hover effects
function brightenColor(hexColor) {
  // Simple brightening by adding white
  return color(
    min(red(color(hexColor)) + 40, 255),
    min(green(color(hexColor)) + 40, 255),
    min(blue(color(hexColor)) + 40, 255)
  );
}