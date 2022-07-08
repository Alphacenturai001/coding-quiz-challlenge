var Questions = document.getElementById("question")
var answerBtn1 = document.getElementById("answer#1")
var answerBtn2 = document.getElementById("answer#2")
var answerBtn3 = document.getElementById("answer#3")
var answerBtn4 = document.getElementById("answer#4")
var timerDisplay = document.getElementById("timerDisplay")
var feedback = document.getElementById("feedback")
var title = document.getElementById("pageTitle")
var timer = document.getElementById("timer")
var startBtn = document.getElementById("startBtn")
var aNum = 0
var timeLeft = 0
var quizTime = 0
var score = 0

//  is to check if current page is highscore page
if (title.innerHTML === "Highscores") {
    renderTable();
}

// set initial timer value and fire off two functions
function quizStart() {
    timeLeft = 75
    startTimer();
    initQ();
}
//  function changes timer display every tick (second)
function startTimer() {
    timer.innerHTML = (timeLeft);
    quizTime = setInterval(tick, 1000);
}
//  function equates a tick to a second and determines when timer reaches zero
function tick() {
    if (timeLeft !== 0) {
     timeLeft--
     timer.innerHTML = (timeLeft)
    }
    else {
        clearInterval(quizTime)
        quizOver();
    }
    return;
}
//  function hides initial elements and shows quiz relevant ones, then starts main quiz function
function initQ() {
    document.querySelectorAll(".main").forEach(main => { main.style.display = "none" })
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "initial" })
    quiz(aNum);
}
//  function checks if there are anymore questions and if not ends the quiz
function quiz() {   
    if (aNum >= questionsArray.length) {
    quizOver();
}
else {
    Questions.innerHTML = (questionsArray[aNum].title)
    answerBtn1.innerHTML = (questionsArray[aNum].choices[0])
    answerBtn2.innerHTML = (questionsArray[aNum].choices[1])
    answerBtn3.innerHTML = (questionsArray[aNum].choices[2])
    answerBtn4.innerHTML = (questionsArray[aNum].choices[3])
}}
//  function checks whether or not answer is the correct one
function answerCheck(btnId) {
    if ((document.getElementById(btnId).innerHTML) === (questionsArray[aNum].answer)) {
        rightAnswer();
        aNum++
    }
    else {
        wrongAnswer();
        aNum++
    }
    quiz(aNum);
}
//   runs when answer is right
function rightAnswer() {
    score = timeLeft
    feedback.innerHTML = ("Correct");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}
//   runs when answer is wrong
function wrongAnswer() {
    timeLeft = (timeLeft - 15)
    feedback.innerHTML = ("Wrong");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}

//   generates the end screen and allows user to submit initials with their score
function quizOver() {
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "none" })
    var content = document.getElementById('theContent')
    var done = document.getElementById("done")
    var submit = document.getElementById("submit")

    timer.innerHTML = (0)
    
    content.insertAdjacentHTML('afterbegin', '<h1 id="done">All Done!</h1> <button id="submit" class="btn btn-danger">Submit</button> <input id="userScore"> - Enter Initials</input>');

    var done = document.getElementById("done")
    done.insertAdjacentHTML('afterend', '<p id="finalScore">Your final score is ' + score + '</p>');

    var submit = document.getElementById("submit")
    submit.addEventListener("click", function(){
        var value = document.getElementById('userScore').value;
       localStorage.setItem(value, score)
       window.location.href = "highscore.html"
    });  
    clearInterval(quizTime)
}

//  renders the table on the highscore table with the scores from local storage
function renderTable() {
    var tbody = document.getElementById("tableBody")
    for (let i = 0; i < localStorage.length; i++) {
     var userName = localStorage.key(i)
     var userScore = localStorage.getItem(userName)
     tbody.insertAdjacentHTML('afterbegin', '<tr class="scores"><td>' + userName + ' - ' + userScore + '</td></tr>')
    }
}
//   has the clear highscores button work by clearing local storage and re-rendering table
function clearStorage() {
    localStorage.clear();
    window.location.reload();
}

var questionsArray = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
      title: "Arrays in Javascript can be used to store",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
];