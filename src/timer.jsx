let totalTime = 60; // Default: 60 seconds
let timeRemaining = totalTime;
let startTime;
let isRunning = false;
let buttonStart, buttonReset;
let inputMinutes, inputSeconds, buttonSet;
let timerState = "setup"; // "setup" or "running"
let progressBar;

// Colors
const colors = {
  background: '#2D3142',
  accent: '#EF8354',
  primary: '#4F5D75',
  light: '#BFC0C0',
  white: '#FFFFFF',
  green: '#4CAF50',
  yellow: '#FFC107',
  red: '#F44336'
};

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  
  // Create and style input fields
  inputMinutes = createInput('1');
  inputMinutes.position(width/2 - 80, height/2 - 40);
  inputMinutes.size(50, 40);
  inputMinutes.input(validateInput);
  styleInput(inputMinutes);
  
  inputSeconds = createInput('00');
  inputSeconds.position(width/2 + 20, height/2 - 40);
  inputSeconds.size(50, 40);
  inputSeconds.input(validateInput);
  styleInput(inputSeconds);
  
  // Create minutes and seconds labels
  let minutesLabel = createElement('h4', 'Min');
  minutesLabel.position(width/2 - 80, height/2 - 70);
  minutesLabel.style('color', colors.light);
  minutesLabel.style('font-family', 'Arial, sans-serif');
  
  let secondsLabel = createElement('h4', 'Sec');
  secondsLabel.position(width/2 + 20, height/2 - 70);
  secondsLabel.style('color', colors.light);
  secondsLabel.style('font-family', 'Arial, sans-serif');
  
  let separator = createElement('h2', ':');
  separator.position(width/2 - 5, height/2 - 40);
  separator.style('color', colors.light);
  separator.style('font-family', 'Arial, sans-serif');
  separator.style('margin', '0');
  
  // Create set button
  buttonSet = createButton('SET TIMER');
  buttonSet.position(width/2 - 60, height/2 + 30);
  buttonSet.size(120, 45);
  buttonSet.mousePressed(setTimer);
  styleButton(buttonSet, colors.accent);
  
  // Create control buttons
  buttonStart = createButton('START');
  buttonStart.position(width/2 - 130, height/2 + 80);
  buttonStart.size(120, 45);
  buttonStart.mousePressed(toggleTimer);
  styleButton(buttonStart, colors.green);
  
  buttonReset = createButton('RESET');
  buttonReset.position(width/2 + 10, height/2 + 80);
  buttonReset.size(120, 45);
  buttonReset.mousePressed(resetTimer);
  styleButton(buttonReset, colors.primary);
  
  // Create progress bar
  progressBar = new ProgressBar();
  
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
    }
  }
  
  // Display timer
  displayTimer();
  
  // Display progress bar in running state
  if (timerState === "running") {
    progressBar.update(timeRemaining / totalTime);
    progressBar.display();
  }
}

function displayTimer() {
  if (timerState === "running") {
    // Format time as MM:SS
    let minutes = floor(timeRemaining / 60);
    let seconds = floor(timeRemaining % 60);
    
    // Add leading zeros
    let timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
    
    // Get timer color based on remaining time
    let timerColor = colors.green;
    if (timeRemaining <= 10) {
      timerColor = colors.red;
    } else if (timeRemaining <= 30) {
      timerColor = colors.yellow;
    }
    
    // Draw timer display
    textSize(72);
    fill(timerColor);
    text(timeString, width/2, height/2);
    
    // Show status
    fill(colors.light);
    textSize(18);
    text(isRunning ? "RUNNING" : (timeRemaining <= 0 ? "TIME'S UP!" : "PAUSED"), width/2, height/2 - 80);
    
    // Update button text based on timer state
    if (isRunning) {
      buttonStart.html('PAUSE');
      styleButton(buttonStart, colors.yellow);
    } else {
      buttonStart.html('START');
      styleButton(buttonStart, colors.green);
    }
  } else {
    // Show title in setup mode
    fill(colors.accent);
    textSize(28);
    text("COUNTDOWN TIMER", width/2, height/2 - 120);
    
    // Show instruction if in setup mode
    fill(colors.light);
    textSize(16);
    text("Enter time and press 'SET TIMER'", width/2, height/2 + 100);
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
    styleButton(buttonStart, colors.yellow);
    buttonStart.html('PAUSE');
  } else {
    // Pause timer
    isRunning = false;
    styleButton(buttonStart, colors.green);
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
  element.style('background-color', colors.primary);
  element.style('color', colors.white);
  element.style('border', 'none');
  element.style('border-radius', '5px');
  element.style('padding', '8px');
  element.style('font-size', '18px');
  element.style('text-align', 'center');
  element.style('font-family', 'Arial, sans-serif');
}

function styleButton(button, bgColor) {
  button.style('background-color', bgColor);
  button.style('color', colors.white);
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('padding', '10px');
  button.style('font-size', '16px');
  button.style('font-weight', 'bold');
  button.style('cursor', 'pointer');
  button.style('font-family', 'Arial, sans-serif');
  button.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
  button.style('transition', 'all 0.2s ease');
  
  // Add hover effect
  button.mouseOver(function() {
    this.style('background-color', colorLuminance(bgColor, 0.1));
    this.style('transform', 'translateY(-2px)');
    this.style('box-shadow', '0 6px 8px rgba(0, 0, 0, 0.15)');
  });
  
  button.mouseOut(function() {
    this.style('background-color', bgColor);
    this.style('transform', 'translateY(0)');
    this.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
  });
}

// Helper function to lighten/darken colors
function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  
  // Convert to decimal and change luminosity
  let rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  
  return rgb;
}

// Progress bar class
class ProgressBar {
  constructor() {
    this.x = width * 0.1;
    this.y = height * 0.75;
    this.w = width * 0.8;
    this.h = 15;
    this.progress = 1.0;
  }
  
  update(progress) {
    this.progress = progress;
  }
  
  display() {
    // Background of progress bar
    noStroke();
    fill(colors.primary);
    rect(this.x, this.y, this.w, this.h, this.h/2);
    
    // Get color based on progress
    let barColor = colors.green;
    if (this.progress <= 0.3) {
      barColor = colors.red;
    } else if (this.progress <= 0.6) {
      barColor = colors.yellow;
    }
    
    // Foreground of progress bar
    fill(barColor);
    rect(this.x, this.y, this.w * this.progress, this.h, this.h/2);
  }
}