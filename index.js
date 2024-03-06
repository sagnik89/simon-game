var gamePattern = [];

var userPattern = [];

var buttonColors = ['green', 'red', 'blue', 'yellow'];

var level = 0;

var started = false;



$(document).keypress(function () {
    if (started == false) {

        level++;
        $("#level-title").text(`Level ${level}`);

        nextSequence();
    }
})




function nextSequence() {

    started = true;

    var randomNumber = Math.floor(Math.random() * 4);

    var gameColor = buttonColors[randomNumber];

    gamePattern.push(gameColor);

    makeSound(gameColor)
    $("#" + gameColor).fadeIn(100).fadeOut(100).fadeIn(100);


    $(".btn").click(function () {

        var id = $(this).attr("id");

        userPattern.push(id);
        makeSound(id);
        animatePress(id);

        checkAnswer(userPattern.length - 1);

    })

}


function checkAnswer(index) {

    if (gamePattern[index] == userPattern[index]) {
        if (gamePattern.length == userPattern.length) {

            nextGame();
        }

    }
    else {
        startOver();
    }

}

function nextGame() {

    setTimeout(() => {
        userPattern = [];
        level++;
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }, 1000);

}


function startOver() {
    $("#level-title").text(`Game Over! Press any key to restart! `);


    $("body").addClass("game-over")

    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 500);

    gamePattern = [];
    userPattern = [];
    started = false;
    level = 0;
}

// to make sounds
function makeSound(btn) {

    switch (btn) {
        case "red":
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        case "blue":
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
        case "green":
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;

        default: console.log("Switch statement default ")
            break;
    }
}

// to add animation to button when pressed
function animatePress(btn) {

    $("#" + btn).addClass("pressed")
    setTimeout(() => {
        $("#" + btn).removeClass("pressed")
    }, 100);
}