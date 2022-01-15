// Selecting Elements
var startButton = document.querySelector(".startButton");
var displayBox = document.querySelector(".displayBox");
var quitButton = displayBox.querySelector(".quit");
var continueButton = displayBox.querySelector(".continue");
var quizBox = document.querySelector(".quizBox");
var answerList = document.querySelector(".answerList");
var currentQuestionCounter = quizBox.querySelector(".questionNumberOn");
var timerCount = quizBox.querySelector(".timerSeconds");
var result = document.querySelector(".scoreResults");
var userScore = document.querySelector(".answersCorrect");
var userInitialsInput = document.getElementById("inputInitials");
var submitButton = document.querySelector(".submitButton");
var highscore = document.querySelector(".highscore");
var viewHighscore = document.querySelector(".viewHighscore");
var usersList = document.querySelector(".users");
var deleteScores = document.querySelector(".deleteScores");
var backButton = document.querySelector(".backButton");
var inputContent = document.querySelector(".inputContent");
var finishText = document.querySelector(".finishText");
var questionCounter = 0;
var counter;
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

// Exit Quiz Button Click Functionality
// hides "Display Box"
/*quitButton.onclick = function () {
    displayBox.classList.remove("activeDisplayBox");
}*/

//when the user clicks an answer
/*answerList.addEventListener('click', (event) => {
    if (event.target.matches('.answer')) {
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            currentQuestionCounter.innerHTML = questionCounter + 1;
            displayQuestions(questionCounter);
        } else {
            showScoreResults();
        }
    }
})
*/
// Continue Button Click Functionality
//displays "Quiz Box"
continueButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayBox.classList.remove("activeDisplayBox");
    quizBox.classList.add("activeQuizBox");
    startTimer();
    displayQuestions(0);
    finishText.innerHTML = 'You finished the quiz!'
})

// it will allow the users to go through the questions and when the user selects a right answer the score will go up
//when the user clicks an answer the next question appears
answerList.addEventListener('click', (event) => {
    if (event.target.matches('.answer')) {
        if (questionCounter < questions.length - 1) {
            questionCounter++;
            currentQuestionCounter.innerHTML = questionCounter + 1;
            displayQuestions(questionCounter);
        } else {
            showScoreResults();
        }
    }
})
// grabbing questions and answers from 'questions' array
function displayQuestions(index) {
    var questionText = document.querySelector(".question");
    var questionElement = '<span>' + questions[index].numberQuestion + ". " + questions[index].question + '</span>';
    var answerElement = `<div class="answer">${questions[index].answer[0]}<span></span></div>
    <div class="answer">${questions[index].answer[1]}<span></span></div>
    <div class="answer">${questions[index].answer[2]}<span></span></div>
    <div class="answer">${questions[index].answer[3]}<span></span></div>`;
    questionText.innerHTML = questionElement;
    answerList.innerHTML = answerElement;

    var allAnswers = answerList.querySelectorAll(".answer");
    for (var i = 0; i < allAnswers.length; i++) {
        allAnswers[i].setAttribute('onclick', 'answerSelected(this)');
    }
}

// create functionality to timer
function startTimer(resetTimer) {
    counter = setInterval(timer, 1000)
    function timer() {
        if (resetTimer) {
            clearInterval(counter);
        }
        timerCount.textContent = gameSetting.timeTotal;
        gameSetting.timeTotal--;
        if (gameSetting.timeTotal < 9) {
            var singleNumber = timerCount.textContent;
            timerCount.textContent = "0" + singleNumber;
        }
        if (gameSetting.timeTotal < 0) {
            clearInterval(counter);
            timerCount.textContent = "00";
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
}, 1000)

// Questions and Answers
var questions = [
    {
        numberQuestion: 1,
        question: "Which of the following is a correct html semantic element",
        correctAnswer: "Section",
        answer: [
            "Home",
            "Section",
            "ElementId",
            "js"
        ]
    },
    {
        numberQuestion: 2,
        question: "Which of the following <h> tags is the biggest font size",
        correctAnswer: "<h1>'",
        answer: [
            "<h1>",
            "<h2>",
            "<h3>",
            "<h4>"
        ]
    },
    {
        numberQuestion: 3,
        question: "What are void elements in HTML",
        correctAnswer: "<br/>",
        answer: [
            "<br/>",
            "<p>>",
            "<h1>",
            "<section>"
        ]
    },
    {
        numberQuestion: 4,
        question: "Which is the correct image tag",
        correctAnswer: "<img src>",
        answer: [
            "<image src>",
            "<img src>",
            "myImage =",
            "console.log(myFunction())"
        ]
    },
    {
        numberQuestion: 5,
        question: "Which of the following is a formatting tag",
        correctAnswer: "<strong>",
        answer: [
            "<br>",
            "<p>",
            "<html>",
            "<strong>"
        ]
    },
    {
        numberQuestion: 6,
        question: "What does HTML stand for?",
        correctAnswer: "Hyper Text Markup Language",
        answer: [
            "Hyper Text Makeup Languaged",
            "Hyper Text Markup Language",
            "Hi Text Markup Language",
            "Hit Text Markup Language"
        ]
    },
    {
        numberQuestion: 7,
        question: "< br  / > What type of tag is this?",
        correctAnswer: "Break Tag",
        answer: [
            "Break Tag",
            "Broken one",
            "Opening Tag",
            "Closing Tag"
        ]
    },
    {
        numberQuestion: 8,
        question: "Text written inside the following pair of tags is considered as paragraph.",
        correctAnswer: "<p> </p>",
        answer: [
            "<p> </p>",
            "<paragraph> </paragrapgh>",
            "<par> </par>",
            "None of the above"
        ]
    },
    {
        numberQuestion: 9,
        question: "Choose the correct HTML element to define emphasized text",
        correctAnswer: "<em>", 
        answer: [
            "<em>",
            "<p>",
            "<b>",
            "<br>"
        ]
    },
    {
        numberQuestion: 10,
        question: "Which character is used to indicate an end tag?",
        correctAnswer: "/",
        answer: [
            ">",
            "*",
            "/",
            "$"
        ]
    }
]