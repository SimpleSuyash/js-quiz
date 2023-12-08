
const q1 = {
    question: "Commonly Used data types DO Not Include: ",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
};
const q2 = {
    question: "The condition in an if/else statement is enclosed with _____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
};
const q3 = {
    question: "Always in JavaScript can be used to store _____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
};
const q4 = {
    question: "String valuse must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
};
const q5 = {
    question: "A very useful tool used during development and debugging for printing content to the dubugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
};

const questions = [q1, q2, q3, q4, q5];

const headerSection = get("header-section");
const instructionSection = get("instruction-section");
const questionSection = get("question-section");
const resultSection = get("result-section");
const tallySection = get("tally-section");
const leaderboardSection = get("leaderboard-section");

const timer = get("timer");
const score = get("score");
const initial = get("initials");
const error = get("error");
const guide = get("initials-guide");
const highScore = get("high-score");



let timeLeft = 15 * questions.length; //75seconds
let currentQuestionNum = 0;
let theInterval;
let intervalPaused = false;
let scoreSubmitted = false;
let hideCode = "";
let displayCode = "";


/* 
 section to hide and show are:
 headerSection
 instructionSection
 questionSection
 resultSection
 tallySection
 leaderboardSection

*/


window.onload = function () {
    showInstruction();
};

//this retrieves the dom element
function get(id) {
    return document.getElementById(id);
}

//this conditions decide which dom sections to hide and show
function renderSections() {
    if (displayCode === "HI") {
        showThese([headerSection, instructionSection]);
        hideThese([questionSection, resultSection, tallySection, leaderboardSection]);
    } else if (displayCode === "HQ") {
        showThese([headerSection, questionSection]);
        hideThese([instructionSection, resultSection, tallySection, leaderboardSection]);
    } else if (displayCode === "HT") {
        showThese([headerSection, tallySection]);
        hideThese([instructionSection, questionSection, leaderboardSection]);
    } else if (displayCode === "L") {
        showThese([leaderboardSection]);
        hideThese([headerSection, instructionSection, questionSection, resultSection, tallySection]);
    }
}

//it will make sections visible
function showThese(theArray) {
    for (let element of theArray) {
        display(element);
    }
}

//it will make sections hide
function hideThese(theArray) {
    for (let element of theArray) {
        display(element, false);
    }
}

//it will make the dom element hide and show
function display(element, toDisplay = true) {
    if (toDisplay) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

/*
this will show the welcome/instruction/start page
hideCode =  sections to be hidden
displayCode = sections to be visible
change hide code to previous display code to keep track of previous page
change display code to match the section to be visible
then renderSections will get the corresponding dom elements to be visible
*/
function showInstruction() {
    hideCode = displayCode;
    displayCode = "HI";
    renderSections();
    reset();
}

function reset() {
    timeLeft = 15 * questions.length; //75seconds
    currentQuestionNum = 0;
    intervalPaused = false;
    scoreSubmitted = false;
}
function startQuiz() {
    hideCode = displayCode;
    displayCode = "HQ";
    renderSections();
    /*when the quiz is started initially, 
    time interval is not paused.
    And so start the time interval every 1sec
    */
    if (!intervalPaused) {
        theInterval = setInterval(theTimer, 1000);
    } else {
        //if time interval is paused, start it again to resume quiz
        resumeInterval();
    }
    //show time left until the quiz finish
    timer.innerText = "Time: " + timeLeft;
    //now show the question
    showQuestion();
}
function theTimer() {
    if (!intervalPaused) {
        //timer reduces time by 1sec every sec
        timeLeft--;
    }
    /*
    when the time left becomes -ve value due to penalty,
    reset it  to 0.
    stop the timer, and show the tally 
    */
    if (timeLeft < 0) {
        timeLeft = 0;
        stopInterval();
        //shows how much user scored
        showTally();
    }
    timer.innerText = "Time: " + timeLeft;
}
//stops the interval
function stopInterval() {
    clearInterval(theInterval);
}
//resumes the interval
function resumeInterval() {
    intervalPaused = false;
}
//pauses the interval
function pauseInterval() {
    intervalPaused = true;
}

function showQuestion() {
    let paragraph, div;
    //before quiz start, currentQuestionNum = 0
    //quiz starts from question number 1
    //to show a question everytime, increase the question number
    currentQuestionNum++;
    //create paragraph element for the question
    paragraph = create("p");
    //create wrapper for the option buttons
    div = create("div");
    //assign class name to give it style
    div.className = "optionsWrapper";

    paragraph.innerText = questions[currentQuestionNum - 1].question;
    //make questionSection empty before showing new question
    if (questionSection.innerHTML != "") {
        questionSection.innerHTML = "";
    }
    questionSection.appendChild(paragraph);
    questionSection.appendChild(div);

    //getting possible answers to the question
    for (let j in questions[currentQuestionNum - 1].options) {
        let button;
        button = create("a");
        button.className = "button";
        /*
        button are named like : 1. optionA
        */
        button.innerText = (++j) + ". " + questions[currentQuestionNum - 1].options[--j];
        div.appendChild(button);
        
        //adding click event to the buttons
        button.addEventListener("click", () => {
            //getting the text/value of the button clicked
            let answerChosen = button.innerText;
            //getting the result
            showResult(answerChosen);
            //hide the result after 2sec
            setTimeout(() => display(resultSection, false), 2000);
            //getting next question
            showNextQuestion();
        });
    }
}

//creates the text node or element node
function create(createMe, type = "") {
    if (type === "node") {
        return document.createTextNode(createMe);
    } else {//when type none is "" 
        return document.createElement(createMe);
    }
}

function showResult(string) {
    let result;
    let correctAnswer = questions[currentQuestionNum - 1].answer;
    //when given string includes the correctAnswer
    if (string.includes(correctAnswer)) {
        //create a 'correct' textnode
        result = create("Correct!", "node");
    } else {
        //create a 'wrong' textnode
        result = create("Wrong!", "node");
        //if wrong answer, apply penalty of 15 secs
        timeLeft -= 15;
        //if timeLeft is minus value, make it 0;
        if(timeLeft < 0){
            timeLeft = 0;
        }
        //display the new time
        timer.innerText = "Time: " + timeLeft;
    }
    //clear the result from b4, if any
    resultSection.innerText = "";
    //write the result to the element
    resultSection.appendChild(result);
    //show the result
    display(resultSection);
}

//gets the next question
function showNextQuestion() {

    //until q4, show next question
    if (currentQuestionNum < questions.length) {
        showQuestion();
    } else {
        //at q5, stop the interval and show the score
        stopInterval();
        showTally();
    }
}

// show the current game's result
function showTally() {
    hideCode = displayCode;
    displayCode = "HT";
    renderSections();

    if (timeLeft < 0) {
        score.innerText = 0;
    } else {
        score.innerText = timeLeft;
    }
    //clear the previously entered initial in the input box
    //place cursor in textbox for initials
    initial.value = "";
    initial.focus();
    
}


function submitHighScore() {

    let newScore = score.value;
    let newUser = initial.value;


    if (validateInitials(newUser)) {
        setLocalStorageData(newUser, newScore);
        showLeaderboard();
        scoreSubmitted = true;
    } else {//initials validation fails
        display(error);
        display(guide, false);
        setTimeout(() => display(error, false), 1000);
        setTimeout(() => display(guide), 1000);
    }
}

function setLocalStorageData(newUser, newScore) {
    let newUserExist = false;
    if (localStorage.length > 0) {
        //when the current user is found in the record
        //check if his current score is higher than on the record
        //if so add the new score, if not just ignore 
        for (let j = 0; j < localStorage.length; j++) {
            let anUser = localStorage.key(j);
            let aScore = localStorage.getItem(anUser);
            // alert (aScore);
            // console.log("local storage: " + anUser + " " + aScore);
            // console.log("is new user " + newUser + " is == " + anUser + "? " + (newUser == anUser));
            if (newUser == anUser) {
                newUserExist = true;
                if (newScore > aScore) {
                    // console.log (newScore + " is > " + aScore + " ? " +newScore >aScore);
                    localStorage.setItem(newUser, newScore);
                } else {
                    //do nothing
                    //user new score is less than his previous score on record
                }
            }
        }
        // console.log(newUser + " exist? " + newUserExist);
        //when the current user is not found in the record
        //it must be new, so add it
        if (!newUserExist) {
            localStorage.setItem(newUser, newScore);
        }
    } else {//if localStorage is empty, just add the item
        localStorage.setItem(newUser, newScore);
    }
}

function validateInitials(initial) {
    let regex = /^[a-zA-Z]{2}$/;
    if (initial.trim().length == 0) {
        return false;
    } else if (!regex.test(initial)) {
        return false;
    } else {
        return true;
    }
}


function showLeaderboard(paused = false) {

    hideCode = displayCode;
    displayCode = "L";
    renderSections();

    /*
        When user wants to see the leaderboard before finishing the quiz
        if timer is needed to be paused, pause the timer
        if paused argument is supplied
    */
    if (paused) {
        pauseInterval();
    } else {
        // resumeInterval();
    }
    highScore.value = getLocalStorageData();
}

function getLocalStorageData() {
    let text = "";
    let obj;
    let highestScores = [];
    for (let i = 0; i < localStorage.length; i++) {
        let aKey = localStorage.key(i);
        let aValue = localStorage.getItem(aKey);
        obj = { initial: aKey, score: aValue };
        highestScores.push(obj);
    }
    highestScores.sort((obj1, obj2) => obj2.score - obj1.score);
    for (let i = 0; i < highestScores.length; i++) {
        let item = highestScores[i];
        text += prepend(i + 1) + ". " + item.initial.toUpperCase() + " - " + prepend(item.score) + "\n";
    }
    return text;
}


function prepend(num) {
    return String(num).padStart(2, "0");
}

function clearHighScores() {
    localStorage.clear();
    showLeaderboard();
}


function goBack() {

    if ((hideCode === "HI")) {
        showInstruction();
    } else if ((hideCode === "HQ")) {
        //to get correct current question number
        //have to decrease by 1
        //because startQuiz function will increase by 1
        --currentQuestionNum;
        startQuiz();
        //score not submitted yet, so back to tally 
    } else if ((hideCode === "HT") && !scoreSubmitted) {
        showTally();
        //score submitted, so back to start instead of tally
    } else if ((hideCode === "HT") && scoreSubmitted) {
        showInstruction();
        // scoreSubmitted=false;
    }

}



