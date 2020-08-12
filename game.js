var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level=0

$(document).keypress(function() {
  if(level===0)
  {
    randomChosenColour = nextSequence();
    gamePattern.push(randomChosenColour);
  }
});

$(".btn").click(function()
{
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

function nextSequence()
{
  var randomNumber = Math.floor(Math.random() * 4);
  var nextColour = buttonColours[randomNumber];
  level+=1;

  $("#level-title").text("level "+level);
  userClickedPattern=[];

  setTimeout(function()
  { blink(nextColour);
  },1000);
  return nextColour;
}
function checkAnswer(currentLevel)
{
  var userChosenColour = userClickedPattern[currentLevel-1];
  if(userChosenColour==gamePattern[currentLevel-1])
  {
    blink(userChosenColour);
    makeSoundSucess(userChosenColour);
    if(currentLevel===level)
    {

      randomChosenColour = nextSequence();
      gamePattern.push(randomChosenColour);

    }
  }
  else gameOver();
}

function blink(color)
{
  $("#"+color).addClass("pressed");
  setTimeout(function()
  {
    $("#"+color).removeClass("pressed");
  },100);
}
function makeSoundSucess(color)
{
  var btn = $("#"+color);
  var src = "./sounds/"+$(btn).attr("id")+".mp3";
  new Audio(src).play();

}
function makeSoundFail()
{
  var src = "./sounds/wrong.mp3";
  new Audio(src).play();
}
function gameOver()
{
  makeSoundFail();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over")

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  startOver();
}
function startOver()
{
  level=0;
  gamePattern=[];
}
