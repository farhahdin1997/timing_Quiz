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
quitButton.onclick = function () {
    displayBox.classList.remove("activeDisplayBox");
}

//when the user clicks an answer it 
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

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (userInitialsInput.value && userInitialsInput.value !== '') {
        const users = JSON.parse(localStorage.getItem('users'))
        localStorage.setItem('users', JSON.stringify([{
            name: userInitialsInput.value,
            num: userScore.innerHTML
        }, ...(users || [])]));
        viewHighscore.classList.remove('hide');
        submitButton.classList.add('hide');
        userInitialsInput.remove();
        inputContent.innerHTML = 'Registered User Successfully!'
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

// comparing user selected answer to correct answer
function answerSelected(answer) {
    var userResponse = answer.textContent;
    var correctResponse = questions[questionCounter].correctAnswer;
    if (userResponse == correctResponse) {
        gameSetting.score++;
    } else {
        gameSetting.timeTotal -= 5;
    }
}

// hides display box, quizbox, and shows results
function showScoreResults() {
    displayBox.classList.remove("activeDisplayBox")
    quizBox.classList.remove("activeQuizBox")
    result.classList.add("activeResults")
    userScore.innerHTML = gameSetting.score;
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
}, 1000);
defaultInterval()

// Questions and Answers
var questions = [
    {
        numberQuestion: 1,
        question: "Inside which HTML element do we put the Javascript?",
        correctAnswer: "script",
        answer: [
            "script",
            "javascript",
            "scripting",
            "js"
        ]
    },
    
    {
        numberQuestion: 2,
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        correctAnswer: "script src='xxx.js'",
        answer: [
            "script src='xxx.js'",
            "script href='xxx.js'",
            "script name='xxx.js'",
            "script img='xxx.js'"
        ]
    },
    
    {
        numberQuestion: 3,
        question: "How do you write 'Hello World' in an alert box?",
        correctAnswer: "alert('Hello World');",
        answer: [
            "alertBox('Hello World');",
            "alert('Hello World');",
            "msg('Hello World');",
            "msgBox('Hello World');"
        ]
    },
    {
        numberQuestion: 4,
        question: "How do you call a function named 'myFunction'?",
        correctAnswer: "myFunction()",
        answer: [
            "call function myFunction()",
            "call myFunction()",
            "myFunction()",
            "console.log(myFunction())"
        ]
    },
    {
        numberQuestion: 5,
        question: "What is the correct syntax for writing an 'IF' statement?",
        correctAnswer: "if (i == 5)",
        answer: [
            "if i == 5 then",
            "if i == 5",
            "if i = 5 then",
            "if (i == 5)"
        ]
    },
    {
        numberQuestion: 6,
        question: "Where is the best practice for placing your JS script?",
        correctAnswer: "At the end of the body",
        answer: [
            "At the beginning of the head",
            "At the beginning of the body",
            "At the end of the body",
            "At the end of the head"
        ]
    },
    {
        numberQuestion: 7,
        question: "Which event occurs when the user clicks on an HTML element?",
        correctAnswer: "onclick",
        answer: [
            "onchange",
            "onmouseover",
            "onmouseclick",
            "onclick"
        ]
    },
    {
        numberQuestion: 8,
        question: "Which operator is used to assign a value to a variable?",
        correctAnswer: "=",
        answer: [
            "*",
            "-",
            "+",
            "="
        ]
    },
    {
        numberQuestion: 9,
        question: "How do you write the beginning of a 'FOR' loop?",
        correctAnswer: "for(i = 0; i <= 5; i ++)",
        answer: [
            "for i = 1 to 5",
            "for(i = 0; i <= 5)",
            "for(i = 0; i <= 5; i ++)",
            "for(i <=5; i++)"
        ]
    },
    {
        numberQuestion: 10,
        question: "Which of the following functions of an Array object removes the last element from an array and returns that element?",
        correctAnswer: "pop()",
        answer: [
            "push()",
            "pop()",
            "join()",
            "map()"
        ]
    }
]