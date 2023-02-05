// Simon Says

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function (event) {
    
    if (event.key == "a") {
        if (level === 0) {
            setTimeout(()=> {
                nextSequence();
             }
             ,250)
        }
    } 

})

function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    level++;
    $("h1").text("Level " + level);

    userClickedPattern = [];

}

$(".btn").click(function (event) {

    var userChosenColour = event.currentTarget.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(colour) {

    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
    
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(()=> {
        $("#" + currentColour).removeClass("pressed");
     }
     ,100)

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(()=> {
                nextSequence();
             }
             ,1000)
        }
    } else {
        $("h1").text("Game Over, press A to restart");
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(()=> {
            $("body").removeClass("game-over");
         }
         ,200)
    }
    
}