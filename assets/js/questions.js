/** @format */

var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("start-game-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
// Start game,go back and clear high scores buttons.
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
//questions,answers & timer.
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

// mark array for questions
var arrayShuffledQuestions;
var QuestionIndex = 0;

// array of questions for quiz.
var questions = [
  {
    q: "Commonly used data types DO NOT include:",
    a: "4. alerts",
    choices: [
      { choice: "1. numbers" },
      { choice: "2. booleans" },
      { choice: "3. strings" },
      { choice: "4. alerts" },
    ],
  },
  {
    q: "The condition in an if / else statement is enclosed within ____.",
    a: "4. parentheses",
    choices: [
      { choice: "1. var" },
      { choice: "2. curly brackets" },
      { choice: "3. quotes" },
      { choice: "4. parentheses" },
    ],
  },
  {
    q: "Arrays in Javascript can be used to store ____.",
    a: "4. all of the above",
    choices: [
      { choice: "1. callback function" },
      { choice: "2. undefined" },
      { choice: "3. variable" },
      { choice: "4. all of the above" },
    ],
  },
  {
    q: "String values must be enclosed within ____ when being assigned to variables.",
    a: "3. quotes",
    choices: [
      { choice: "1. commas" },
      { choice: "2. curly brackets" },
      { choice: "3. quotes" },
      { choice: "4. parenthesis" },
    ],
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "4. console log",
    choices: [
      { choice: "1. Javascript" },
      { choice: "2. terminal/bash" },
      { choice: "3. for loops" },
      { choice: "4. console log" },
    ],
  },
  {
    q: "Where is the correct place to insert a JavaScript?",
    a: "1. The <body> section",
    choices: [
      { choice: "1. The <body> section" },
      {
        choice: "2. Both the <head> section and the <body> section are correct",
      },
      { choice: "3. The <head> section" },
      { choice: "4. The <footer> section" },
    ],
  },
  {
    q: "What is getItem commonly used for?",
    a: "2. local storage",
    choices: [
      { choice: "1. adding a string" },
      { choice: "2. local storage" },
      { choice: "3. setting a timer" },
      { choice: "4. hiding a element" },
    ],
  },
];

//If back button is clicked
var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide");
  containerHighScoresEl.classList.remove("appear");
  containerStartEl.classList.remove("hide");
  containerStartEl.classList.add("appear");
  containerScoreEl.removeChild(containerScoreEl.lastChild);
  QuestionIndex = 0;
  gameover = "";
  timerEl.textContent = 0;
  score = 0;

  if ((correctEl.className = "appear")) {
    correctEl.classList.remove("appear");
    correctEl.classList.add("hide");
  }
  if ((wrongEl.className = "appear")) {
    wrongEl.classList.remove("appear");
    wrongEl.classList.add("hide");
  }
};

//Check if game-over is true, or if there is time left. Start time at 60.
var setTime = function () {
  timeleft = 60;

  var timercheck = setInterval(function () {
    timerEl.innerText = timeleft;
    timeleft--;

    if (gameover) {
      clearInterval(timercheck);
    }

    if (timeleft < 0) {
      showScore();
      timerEl.innerText = 0;
      clearInterval(timercheck);
    }
  }, 1000);
};

var startGame = function () {
  //Show/hide start & quiz screen
  containerStartEl.classList.add("hide");
  containerStartEl.classList.remove("appear");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("appear");
  //make questions appear in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5);
  setTime();
  setQuestion();
};

//go to next question
var setQuestion = function () {
  resetAnswers();
  displayQuestion(arrayShuffledQuestions[QuestionIndex]);
};

//Hide answer buttons
var resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
  }
};

// question/answer buttons appear
var displayQuestion = function (index) {
  questionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement("button");
    answerbutton.innerText = index.choices[i].choice;
    answerbutton.classList.add("btn");
    answerbutton.classList.add("answerbtn");
    answerbutton.addEventListener("click", answerCheck);
    answerbuttonsEl.appendChild(answerbutton);
  }
};
//make word correct appear
var answerCorrect = function () {
  if ((correctEl.className = "hide")) {
    correctEl.classList.remove("hide");
    correctEl.classList.add("banner");
    wrongEl.classList.remove("banner");
    wrongEl.classList.add("hide");
  }
};
//make word wrong appear
var answerWrong = function () {
  if ((wrongEl.className = "hide")) {
    wrongEl.classList.remove("hide");
    wrongEl.classList.add("banner");
    correctEl.classList.remove("banner");
    correctEl.classList.add("hide");
  }
};

//check answer
var answerCheck = function (event) {
  var selectedanswer = event.target;
  if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
    answerCorrect();
    score = score + 10;
  } else {
    answerWrong();
    score = score - 5;
    timeleft = timeleft - 4;
  }

  //start next question if there are more
  QuestionIndex++;
  if (arrayShuffledQuestions.length > QuestionIndex + 1) {
    setQuestion();
  } else {
    gameover = "true";
    showScore();
  }
};

//Show total score after game ends
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("appear");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = "Your final score is " + score + "!";
  containerScoreEl.appendChild(scoreDisplay);
};

//create high score
var createHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  //channel scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {
    return b.score - a.score;
  });

  //Clear list
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  //high scores elements (in order)
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML =
      HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();
};
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores));
};

//load high score
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores");
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {
    return b.score - a.score;
  });

  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerText =
      LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);
  }
};

//show high score screen when link is clicked or when intiials are entered
var displayHighScores = function () {
  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("appear");
  gameover = "true";

  if ((containerEndEl.className = "appear")) {
    containerEndEl.classList.remove("appear");
    containerEndEl.classList.add("hide");
  }
  if ((containerStartEl.className = "appear")) {
    containerStartEl.classList.remove("appear");
    containerStartEl.classList.add("hide");
  }

  if ((containerQuestionEl.className = "appear")) {
    containerQuestionEl.classList.remove("appear");
    containerQuestionEl.classList.add("hide");
  }

  if ((correctEl.className = "appear")) {
    correctEl.classList.remove("appear");
    correctEl.classList.add("hide");
  }

  if ((wrongEl.className = "appear")) {
    wrongEl.classList.remove("appear");
    wrongEl.classList.add("hide");
  }
};
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);
};

loadHighScore();

//when start is clicked, start game
btnStartEl.addEventListener("click", startGame);
//submit button -- enter or click
formInitials.addEventListener("submit", createHighScore);
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores);
//back button
btnGoBackEl.addEventListener("click", renderStartPage);
//clear high score button
btnClearScoresEl.addEventListener("click", clearScores);
