let buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColour;
let gamePattern = [];
var gameStart = false;
var userChosenColour;
let userClickedPattern = [];
var level = 0;
function nextSquence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  playAudio(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  $("h1").text("Level " + ++level);
}

function playAudio(color) {
  audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
$(document).keypress(function (event) {
  if (!gameStart) {
    nextSquence();
    gameStart = true;
  }
});

for (let index = 0; index < buttonColors.length; index++) {
  $("#" + buttonColors[index]).click(function () {
    handleClick(buttonColors[index]);
    animatePress(buttonColors[index]);
    playAudio(buttonColors[index]);
  });
}

function handleClick(color) {
  userChosenColour = color;
  userClickedPattern.push(color);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length - 1 == currentLevel) {
      setTimeout(function () {
        nextSquence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern = [];
}
