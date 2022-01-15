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
var result = document.querySelector(".scoreResults");
var quizBox = document.querySelector(".quizBox");
var finishText = document.querySelector(".finishText");
var userScore = document.querySelector(".answersCorrect");

// Start Quiz Button Click Functionality
// displays "Display Box"
// starts timer
startButton.onclick = function () {
    displayBox.classList.add("activeDisplayBox");
}

// create functionality to timer
function startTimer(resetTimer) {
    counter = setInterval(timer ,1000) 
    // SetInterval method repeats a given function at every given time-interval. 
    //Timer is the function that will exucuted and 1000 indicates the length oif time of the time-interval between each execution.
    function timer() {
        if (resetTimer){
            clearInterval(counter)
        };
        timerCount.timerCount = gameSetting.timeTotal;
        gameSetting.timeTotal --;
        if (gameSetting.timeTotal<9){
            var singleNo = timerCount.textContent;
            timerCount.textContent = "0" + singleNo;
        }
        if(gameSetting.timeTotal <0 ){
            clearInterval(counter);
            timerCount.textContent ="00";
        }
    }
} 

let defaultInterval = () => setInterval(() => {
    const activeResultsPage = document.querySelector('.activeResults')
    const activeHighScorePage = document.querySelector('.activeHighScore')
    if (activeResultsPage || activeHighScorePage) {
        clearInterval(defaultInterval);
    } else if (timerCount.innerHTML === "00") {
        result.classList.add('activeResults');
        quizBox.classList.remove('activeQuizBox');
        userScore.innerHTML = gameSetting.score;
        finishText.innerHTML = 'You ran out of time!'
        clearInterval(defaultInterval);
    }
}, 1000);
defaultInterval()
