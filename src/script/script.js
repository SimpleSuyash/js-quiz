
const q1 = {
    question: "Commonly Used data types DO Not Include: ",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
};
const q2 = {
    question: "The condition in an if/else statement is enclosed with _____.",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
};
const q3 = {
    question: "Always in JavaScript can be used to store _____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
};
const q4 = {
    question: "String valuse must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
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
let offSwitch, onSwitch;


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

function create(createMe, type = "") {
    if (type == "node") {
        return document.createTextNode(createMe);
    } else {
        return document.createElement(createMe);
    }
}
function get(id) {
    return document.getElementById(id);
}

function display(element, toDisplay = true) {
    if (toDisplay) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function showThese(theArray) {
    for (let element of theArray) {
        display(element);
    }
}
function hideThese(theArray) {
    for (let element of theArray) {
        display(element, false);
    }
}

function toggleContainers() {

    if (onSwitch == "HI") {
        showThese([headerSection, instructionSection]);
        hideThese([questionSection, resultSection, tallySection, leaderboardSection]);
    } else if (onSwitch == "HQ") {
        showThese([headerSection, questionSection]);
        hideThese([instructionSection, resultSection, tallySection, leaderboardSection]);
    } else if (onSwitch == "HT") {
        showThese([headerSection, tallySection]);
        hideThese([instructionSection, questionSection, leaderboardSection]);
    } else if (onSwitch == "L") {
        showThese([leaderboardSection]);
        hideThese([headerSection, instructionSection, questionSection, resultSection, tallySection]);
    }

}

function theTimer() {
    if (!intervalPaused) {
        timeLeft--;
    }

    if (timeLeft <= 0) {
        timeLeft = 0;
        stopInterval();
        showTally();
    }
    timer.innerText = "Time: " + timeLeft;

}
function stopInterval() {
    setTimeout(() => clearInterval(theInterval), 1000);
    // clearInterval(theInterval);
}
function resumeInterval() {
    intervalPaused = false;
}
function pauseInterval() {
    intervalPaused = true;
}

function showInstruction() {

    offSwitch = onSwitch;
    onSwitch = "HI";
    toggleContainers();
    timer.value = "Time: 0";
    reset();

}
function reset() {
    timeLeft = 15 * questions.length; //75seconds
    currentQuestionNum = 0;
    intervalPaused = false;
    scoreSubmitted = false;
}
function startQuiz() {
    scoreSubmitted = false;
    offSwitch = onSwitch;
    onSwitch = "HQ";
    toggleContainers();
    // timeLeft = 15 * questions.length;
    if (!intervalPaused) {
        theInterval = setInterval(theTimer, 1000);
    } else {
        resumeInterval();
    }
    showQuestion();
}

function showQuestion() {
    let paragraph, div;
    //starts from question number 1
    currentQuestionNum++;

    paragraph = create("p");
    div = create("div");
    div.className = "optionsWrapper";

    for (let i = 0; i <= questions.length; i++) {
        //question number begins from 1
        if (currentQuestionNum == (i + 1)) {
            paragraph.innerText = questions[i].question;
            //make questionSection empty before showing new question
            if (questionSection.innerHTML != "") {
                questionSection.innerText = "";
            }
            questionSection.appendChild(paragraph);
            questionSection.appendChild(div);

            //getting possible answers to the question
            for (let j in questions[i].options) {
                let button;
                button = create("a");
                button.className = "button";
                /*
                button are named like : 1. option A
                */
                button.innerText = (++j) + ". " + questions[i].options[--j];
                div.appendChild(button);
                button.addEventListener("click", () => {
                    let answerChosen = button.innerText;

                    setTimeout(() => display(resultSection, false), 3000);
                    showResult(answerChosen);
                    showNextQuestion();
                });
            }
            // if we find a match already, don't loop
            //there is only one match at a time
            break;
        }
    }
}
function showNextQuestion() {
    if (currentQuestionNum < questions.length) {
        showQuestion();
    } else {
        stopInterval();
        showTally();
    }
}

function showResult(string) {
    let result;
    let correctAnswer = questions[currentQuestionNum - 1].answer;
    if (string.includes(correctAnswer)) {
        result = create("Correct!", "node");
    } else {
        result = create("Wrong!", "node");
        timeLeft = timeLeft - 15;
    }
    resultSection.innerText = "";
    resultSection.appendChild(result);
    display(resultSection);
}


function showTally() {

    offSwitch = onSwitch;
    onSwitch = "HT";
    toggleContainers();

    if (timeLeft <= 0) {
        score.innerText = 0;
    } else {
        score.innerText = timeLeft - 1;
    }

    setTimeout(() => stopInterval(), 1000);
    // score.innerText = timeLeft;
    // setTimeout(() => stopInterval(), 1000);
    initial.focus();
    initial.value = "";
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

    offSwitch = onSwitch;
    onSwitch = "L";
    toggleContainers();

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

    if ((offSwitch == "HI")) {
        showInstruction();
    } else if ((offSwitch == "HQ")) {
        //to get correct current question number
        //have to decrease by 1
        //because startQuiz function will increase by 1
        --currentQuestionNum;
        startQuiz();
        //score not submitted yet, so back to tally 
    } else if ((offSwitch == "HT") && !scoreSubmitted) {
        showTally();
        //score submitted, so back to start instead of tally
    } else if ((offSwitch == "HT") && scoreSubmitted) {
        showInstruction();
        // scoreSubmitted=false;
    }

}



