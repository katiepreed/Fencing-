// Scorekeeping Module 
let scoreFencer1 = 0, scoreFencer2 = 0;

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
  
  setupScorekeeperUI();
}

function draw() {
  background(colors.background);
  
  displayScores();
  
  // Draw line separating timer and scoring sections
  stroke(colors.textColor);
  strokeWeight(2);
  line(0, 400, width, 400);
  noStroke();
}

// ========== SCOREKEEPER FUNCTIONS ==========

function setupScorekeeperUI() {
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
}

function displayScores() {
  // Display fencer labels
  textSize(48);
  fill(colors.textColor);
  text("FENCER1", width/4, 50);
  text("FENCER2", 3*width/4, 50);
  
  // Display scores
  textSize(120);
  text(scoreFencer1, width/4, 300);
  text(scoreFencer2, 3*width/4, 300);
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

// ========== STYLING FUNCTIONS ==========

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

// Helper function to brighten colors for hover effects
function brightenColor(hexColor) {
  // Simple brightening by adding white
  return color(
    min(red(color(hexColor)) + 40, 255),
    min(green(color(hexColor)) + 40, 255),
    min(blue(color(hexColor)) + 40, 255)
  );
}
