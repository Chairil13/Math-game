// Randomly create an expression
var tick = document.getElementById("tick");
var cross = document.getElementById("cross");
var restartButton = document.getElementById("restart-button");

var tryDisplay = document.getElementById("try-screen");
var workDisplay = document.getElementById("working-screen");

var finalScoreScreen = document.getElementById("final-score");
/*var progressScreen = document.getElementById("progress");*/
var progressBar = $("#progressbar");
var exprScreen = document.getElementById("expression");
var resScreen = document.getElementById("result");
var scoreScreen = document.getElementById("score");

var a, b, r, ir, chaos, isCorrect;
var score = 0;
var wrongAnswer = false;
var correctClick = 0;
// first, second, and result.

// Helper function to create a random member
function randomExpressionMember() {
  return Math.floor(Math.random() * 10 + 1);
}

// Create current expression
function createExpression() {
  a = randomExpressionMember();
  b = randomExpressionMember();
  // correct answer;
  r = a + b;
  // create a random result within the proximity of the number
  chaos = Math.floor(
    Math.random() * Math.round(r * 0.7) * 1.5 + Math.round(r / 2) + 1
  );
  //console.log("chaos", chaos)
  if (chaos === r) {
    chaos += 1;
  }
  // make sure r is not the same as chaos

  // run a coin flip to see whether to display the correct or incorrect answer

  isCorrect = Math.round(Math.random()) ? true : false;
  // check whether what's displayed is true or not.
  console.log("Is Correct r displayed", isCorrect);
  return a, b, r, chaos, isCorrect; // add another variable to track if the expr should be true or not
}

function displayProgressBar() {
  // animate progress bar
  progressBar.width(0).animate(
    {
      width: "100%",
    },
    500 * 10,
    "linear",
    function () {
      restart();
    }
  );
}

function displayExpression(a, b, r, chaos, isCorrect) {
  // Input the values in the fields.
  exprScreen.textContent = a + " + " + b;

  if (isCorrect) {
    resScreen.textContent = " = " + r;
  } else {
    resScreen.textContent = " = " + chaos;
  }

  scoreScreen.textContent = "Score: " + score;
}

function restart() {
  // clear screen
  progressBar.finish(); //test
  finalScoreScreen.textContent = "Skor anda adalah " + score + ".";
  scoreScreen.style.display = "none";
  workDisplay.style.display = "none";
  tryDisplay.style.display = "block";
  // Working with score
  wrongAnswer = false;
  score = 0;
  scoreScreen.textContent = "Score: " + score;
}

function runPlayerTurn() {
  createExpression();
  displayExpression(a, b, r, chaos, isCorrect);
  displayProgressBar();
  // take input and decide what to do next - increase the score or not. restart the game if they are wrong.
}

// Attach event listeners to buttons
tick.addEventListener(
  "click",
  function () {
    console.log("clicked tick");
    progressBar.stop();
    // ATTENTION TO THIS: Cross can also be the right answer.
    if (isCorrect) {
      score += 1;
      console.log("correct answer");
      runPlayerTurn();
    } else {
      // exit the game? do nothing?
      wrongAnswer = true;
      console.log("incorrect answer");
      restart();
    }
  },
  false
);

cross.addEventListener(
  "click",
  function () {
    console.log("clicked cross");
    progressBar.stop();
    // ATTENTION TO THIS: Cross can also be the right answer.
    if (!isCorrect) {
      score += 1;
      runPlayerTurn();
    } else {
      // exit the game? do nothing?
      wrongAnswer = true;
      restart();
    }
  },
  false
);

restartButton.addEventListener(
  "click",
  function () {
    runPlayerTurn();
    tryDisplay.style.display = "none";
    workDisplay.style.display = "block";
    scoreScreen.style.display = "block";
  },
  false
);

// testing
createExpression();
displayExpression(a, b, r, chaos);

// can create the first screen

function runGame() {
  //maybe don't need this yet.
  // while (!wrongAnswer) {
  runPlayerTurn();
  console.log("looped");
  // }

  // display start?
  // runTurns until the answer is wrong.
  // reset the game if the player is wrong.
}
// Happens every move (set)
// calculate the answer. Randomize how the answer is displayed: half the times the correct answer and half the times an answer that is around that but not correct.
// Start with + then add -

// have a timer to go back each time the expression is displayed.

runGame();
