let ballCount = 0;
let currentOverScore = 0;
let currentScore = 0;
let currentOver = 1;
let totalScore = 0;
let wickets = 0;
let overScores = [];
let currentTeam = 1;
let teamScores = [[], []]; // Stores the scores for both teams

function addBall(type) {
  if (wickets < 10 && ballCount < 6) {
    const ballsContainer = document.getElementById("balls-container");
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.innerText = type === "dot" ? "." : type;
    ballsContainer.appendChild(ball);
    ballCount++;

    if (type !== "dot") {
      if (type !== "wicket") {
        const runs = parseInt(type);
        currentOverScore += runs;
        // Update current score only for runs, not for wickets
        currentScore += runs;
      } else {
        wickets++;
        // Only end over if wickets reach 10 after adding a wicket
        if (wickets === 10) {
          endOver();
          return; // Exit the function to prevent further processing
        }
      }
    }

    if (ballCount === 6) {
      endOver();
    }

    // Update the current team's score immediately
    updateTeamScore();
    // Display current score
    displayCurrentScore();
  }
}

function addExtraBall(type) {
  if (wickets < 10) {
    const ballsContainer = document.getElementById("balls-container");
    const ball = document.createElement("div");
    ball.classList.add("ball");
    if (type === "wide" || type === "no") {
      ball.innerText = type === "wide" ? "WD1" : "NB1";
      currentOverScore += 1;
      // Update current score only for extras
      currentScore += 1;
    }
    ballsContainer.appendChild(ball);

    // Update the current team's score immediately
    updateTeamScore();
    // Display current score
    displayCurrentScore();
  }
}

function displayCurrentScore() {
  const currentScoreElement = document.getElementById("current-score");
  currentScoreElement.innerText = `Current Score: ${currentScore} Runs and ${wickets} wickets`;
}

function updateTeamScore() {
  const team1Score = teamScores[0].reduce((total, score) => total + score, 0);
  const team2Score = teamScores[1].reduce((total, score) => total + score, 0);

  // Check if team 2 has won
  if (currentTeam === 2 && team2Score > team1Score) {
    declareWinner(2, 10 - wickets, "wickets");
  }
}

function endOver() {
  overScores.push(currentOverScore);
  teamScores[currentTeam - 1].push(currentOverScore);
  totalScore += currentOverScore;

  updateLocalStorage();

  const cumulativeScoreDisplay = document.getElementById("cumulative-score");
  const overScoreElement = document.createElement("div");
  overScoreElement.innerText = `Team ${currentTeam}, Over ${currentOver}: ${currentOverScore} runs`;
  cumulativeScoreDisplay.appendChild(overScoreElement);

  currentOver++;
  ballCount = 0;
  // Reset currentOverScore to 0
  currentOverScore = 0;

  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.innerText = `Team ${currentTeam} Total Score: ${totalScore} runs, Wickets: ${wickets}`;

  if (currentOver > 20 || wickets === 10) {
    endInnings();
  } else {
    disableButtons();
    showNewOverButton();
  }

  // Display current score after the over
  displayCurrentScore();
}

function endInnings() {
  if (currentTeam === 1) {
    currentTeam = 2;
    resetForNextTeam();
  } else {
    declareWinner();
  }
}

function resetForNextTeam() {
  overScores = [];
  totalScore = 0;
  wickets = 0;
  currentOver = 1;
  ballCount = 0;
  currentOverScore = 0;
  currentScore = 0;
  const ballsContainer = document.getElementById("balls-container");
  ballsContainer.innerHTML = "";

  const cumulativeScoreDisplay = document.getElementById("cumulative-score");
  cumulativeScoreDisplay.innerHTML = "";

  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.innerText = `Team ${currentTeam} starts their innings`;

  const buttons = document.querySelectorAll(".buttons-container button");
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function declareWinner(winningTeam, margin, unit) {
  const scoreDisplay = document.getElementById("score-display");
  let winnerText;
  if (winningTeam === 1) {
    winnerText = `Team 1 wins by ${margin} ${unit}!`;
  } else {
    winnerText = `Team 2 wins by ${margin} ${unit}!`;
  }
  scoreDisplay.innerText = `Match complete! ${winnerText}`;
  disableButtons();

  // Clear local storage after 5 seconds
  setTimeout(() => {
    localStorage.clear();
    console.log("Local storage cleared after 5 seconds.");
  }, 5000);
}

function disableButtons() {
  const buttons = document.querySelectorAll(".buttons-container button");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function showNewOverButton() {
  const newOverButton = document.createElement("button");
  newOverButton.innerText = "New Over";
  newOverButton.onclick = resetOver;
  document.querySelector(".buttons-container").appendChild(newOverButton);
}

function resetOver() {
  const ballsContainer = document.getElementById("balls-container");
  ballsContainer.innerHTML = "";
  const buttons = document.querySelectorAll(".buttons-container button");
  buttons.forEach((button) => {
    button.disabled = false;
  });
  document
    .querySelector(".buttons-container")
    .removeChild(
      document.querySelector(".buttons-container button:last-child")
    );
  const scoreDisplay = document.getElementById("score-display");
  scoreDisplay.innerText = "";
}

function updateLocalStorage() {
  localStorage.setItem("teamScores", JSON.stringify(teamScores));
}

// Ensure all functions are defined before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  //loadScoresFromLocalStorage();

  document.getElementById("button-1").onclick = () =>
    addBallAndCheckWinner("1");
  document.getElementById("button-2").onclick = () =>
    addBallAndCheckWinner("2");
  document.getElementById("button-3").onclick = () =>
    addBallAndCheckWinner("3");
  document.getElementById("button-4").onclick = () =>
    addBallAndCheckWinner("4");
  document.getElementById("button-5").onclick = () =>
    addBallAndCheckWinner("5");
  document.getElementById("button-6").onclick = () =>
    addBallAndCheckWinner("6");
  document.getElementById("button-dot").onclick = () =>
    addBallAndCheckWinner("dot");
  document.getElementById("button-wicket").onclick = () =>
    addBallAndCheckWinner("wicket");
  document.getElementById("button-wide").onclick = () =>
    addExtraBallAndCheckWinner("wide");
  document.getElementById("button-no").onclick = () =>
    addExtraBallAndCheckWinner("no");
});

function addBallAndCheckWinner(type) {
  addBall(type);
  checkWinner();
}

function addExtraBallAndCheckWinner(type) {
  addExtraBall(type);
  checkWinner();
}

function checkWinner() {
  const team1Score = teamScores[0].reduce((total, score) => total + score, 0);
  const team2Score = teamScores[1].reduce((total, score) => total + score, 0);
  // console.log()
  if (currentTeam === 2 && currentScore > team1Score) {
    const remainingWickets = 10 - wickets;
    declareWinner(2, remainingWickets, "wickets");
  } else if (wickets === 10) {
    if (currentTeam === 1) {
      // End of first team's innings
      endInnings();
    } else {
      declareWinner(1, team1Score - currentScore, "runs");
    }
  }
}
