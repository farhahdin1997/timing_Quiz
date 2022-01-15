// Selecting Elements
var startButton = document.querySelector(".startButton");
var displayBox = document.querySelector(".displayBox");
var playAgainButton = displayBox.querySelector(".quit");
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
// User clicks on the button
// Rules section appears and button disappears
startButton.onclick = function () {
    displayBox.classList.add("activeDisplayBox");
}

// Exit Quiz Button Click Functionality
// When user clicks on the butotn
// It hides the "Display Box"
playAgainButton.onclick = function () {
    displayBox.classList.remove("activeDisplayBox");
}

// When the user clicks an answer it
// Takes the user to the score board
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
// When the user clicks on the button it display box is hidden
// Then displays "Quiz Box" appears
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
//its a default action should not be taken as it normally would be.
// Calls timer and display questions functions and runs that function
// Changes the content of HTML element and shows a message
continueButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayBox.classList.remove("activeDisplayBox");
    quizBox.classList.add("activeQuizBox");
    startTimer();
    displayQuestions(0);
    finishText.innerHTML = 'You finished the quiz!'
})

// Submit button
// When user clicks the button 
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its a default action should not be taken as it normally would be.
// Storing and retrieving data in local storage
// view high score will disappear
//submit button will appear
// The input will disappear
// Changes the content of HTML element and shows a message
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

//View the high scores
// When user clicks on the button
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its a default action should not be taken as it normally would be.
// The users results will disappear
// High score table will appear , it will show any previous and current score as long 
// as they haven't been deleted as its saved in local storage
// Retrieves the data from local storage
// Joins the users scores in the high score board
// If there is no high score a message will appear
viewHighscore.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.remove('activeResults');
    highscore.classList.add('activeHighScore');
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
        const getAllUsers = users.sort((a, b) => b.num - a.num).map((element, index) => {
            return (
                `<li class="user">
                    <span>${index + 1}. ${element.name}</span>
                    <span>${element.num}</span>
                </li>`
            )
        })
        usersList.innerHTML = getAllUsers.join(' ')
    } else {
        usersList.innerHTML = `<li>No HighScore</li>`
    }
})

// Deletes the scores on high score board
// When the button is clicked 
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its a default action should not be taken as it normally would be.
// Replacing the content in the div to empty string
// Removed local storage
// Creates a list using createElement 
// AppendChild ()- Add a node to the end of the list of children of a specified parent node
// Removes the delete score and back button
deleteScores.addEventListener('click', (event) => {
    event.preventDefault();
    usersList.innerHTML = '';
    localStorage.removeItem('users')
    const newli = document.createElement('li')
    newli.innerHTML = `No HighScores`
    usersList.appendChild(newli);
    deleteScores.remove()
    backButton.remove()
})

// Back button allows user to go the the previous event
// When user clicks on the button
// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its a default action should not be taken as it normally would be.
// The Element.classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element
// The add() method of the DOMTokenList interface adds the given tokens to the list, omitting any that are already present.
// High score will disappear and it will go to previous event

backButton.addEventListener('click', (event) => {
    event.preventDefault();
    result.classList.add("activeResults")
    highscore.classList.remove("activeHighScore")
})

// Displaying the questions with the answers
// It grabs the questions and answers from 'questions' array
// When all the questions have been answers it calls the AnswerSelected function
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
// This compares all the users selected answer to correct answer
// All the correct answers it will add to the score
// Else if the answer is incorrect it will deduct -5 from the timer
function answerSelected(answer) {
    var userResponse = answer.textContent;
    var correctResponse = questions[questionCounter].correctAnswer;
    if (userResponse == correctResponse) {
        gameSetting.score++;
    } else {
        gameSetting.timeTotal -= 5;
    }
}

// This function: hides display box, quizbox, and shows results
// The Element.classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element
// The add() method of the DOMTokenList interface adds the given tokens to the list, omitting any that are already present.
function showScoreResults() {
    displayBox.classList.remove("activeDisplayBox")
    quizBox.classList.remove("activeQuizBox")
    result.classList.add("activeResults")
    userScore.innerHTML = gameSetting.score;
}

// Starts the timer
// Setinterval () - The setInterval() method repeats a given function at every given time-interval.
// The first parameter is the function to be executed.
// The second parameter indicates the length of the time-interval between each execution.
// If the timer is reset it will clear the timer
// When the timer is <0 it clears the interval too
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

// Let default time and set time equals to or less than
let defaultInterval = () => setInterval(() => {
    const activeResultsPage = document.querySelector('.activeResults')
    const activeHighScorePage = document.querySelector('.activeHighScore')
     // The results page or high score page else clear interval and set default time
    if (activeResultsPage || activeHighScorePage) { 
        clearInterval(defaultInterval);
    } else if (timerCount.innerHTML === "00") {
        // The Element.classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element
        // The add() method of the DOMTokenList interface adds the given tokens to the list, omitting any that are already present.
        result.classList.add('activeResults');
        // Quiz box disppears
        quizBox.classList.remove('activeQuizBox');
        userScore.innerHTML = gameSetting.score;
        finishText.innerHTML = 'You ran out of time!'
        //Clears intervals and sets default time
        clearInterval(defaultInterval);
    }
}, 1000);
defaultInterval() //default time shows

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