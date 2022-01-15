// Selecting Elements
/* start button*/
var startButton = document.querySelector(".startButton");
var displayBox = document.querySelector(".displayBox");

/*timer*/
var timerCount = quizBox.querySelector(".timerSeconds");
var gameSetting = {
    score: 0,
    timeTotal: 60
}

// Start Quiz Button Click Functionality
// displays "Display Box"
// starts timer
startButton.onclick = function () {
    displayBox.classList.add("activeDisplayBox");
}

//Timer 
