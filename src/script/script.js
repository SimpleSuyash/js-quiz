
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
const highScore = get("high-score");

let timeLeft = 15 * questions.length; //75seconds
let timerInterval;
let currentQuestionNum = 0;
let intervalPaused = false;

/* 
 section to hide and show are:
 headerSection
 instructionSection
 questionSection
 resultSection
 tallySection
 leaderboardSection

*/
let toBeHiddenElements =[];
let toBeVisibleElements = [];

// let highScores = [];




window.onload = function (){
    toBeHiddenElements =[questionSection, resultSection, resultSection , tallySection, leaderboardSection ];
    toBeVisibleElements =[headerSection, instructionSection];
    showThese(toBeVisibleElements);
    hideThese(toBeHiddenElements);
};

function create(createMe, type = ""){
    if(type == "node"){
        return document.createTextNode(createMe);
    }else{
        return document.createElement(createMe);
    }
}
function get(id){
    return document.getElementById(id);
}

function display(element, toDisplay = true){
    if(toDisplay){
        element.style.display = "block";
    }else{
        element.style.display = "none";
    }
}

function showThese(theArray) {
    // alert("cheking");
    for (let element of theArray) {
        display(element);
    }
}
function hideThese(theArray) {
    for (let element of theArray) {
        display(element, false);
    }
}
function startQuiz() {
    beginInterval();
    showQuestions();
 
    toBeHiddenElements =[instructionSection, resultSection , tallySection, leaderboardSection ];
    toBeVisibleElements =[headerSection, questionSection];
    showThese(toBeVisibleElements);
    hideThese(toBeHiddenElements);
    // display(instructionSection, false);
}

function showQuestions() {
    let paragraph, div;
    //starts from question number 1
    currentQuestionNum++;
    
    
    paragraph = create("p");
    div = create("div");
    div.className = "optionsWrapper";

    for (let i = 0; i <= questions.length; i++) {
        //question number begins from 1
        if (currentQuestionNum == (i+1)) {
            paragraph.innerText = questions[i].question;
            //make questionSection empty before showing new question
            if(questionSection.innerHTML!=""){
                questionSection.innerText = "";
            }
            questionSection.appendChild(paragraph);
            questionSection.appendChild(div);

            //getting possible answers to the question
            for (let j in questions[i].options) {
                let button;
                button = create("a");
                button.className ="button";
                /*
                button are named like : 1. option A
                */
                button.innerText = (++j) + ". " + questions[i].options[--j];
                div.appendChild(button);
                button.addEventListener("click", () => {
                    let answerChosen = button.innerText;
                    
                    display(resultSection);
                    setTimeout( () => display(resultSection, false), 50000);
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
function showNextQuestion(){
    if(currentQuestionNum < questions.length){
        showQuestions();
    }else{
        showTally();
    }
}
function beginInterval() {
    timerInterval = setInterval(function(){
        if(!intervalPaused){
            timeLeft--;
        }
        if( timeLeft <= 0){
            timeLeft = 0;
            showTally();
        }
        timer.innerText = "Time: " + timeLeft;
    }, 1000);
}
function stopInterval(){
    clearInterval(timerInterval);
}


function resumeInterval(){
    intervalPaused = false;
}

function pauseInterval(){
    intervalPaused = true;
}
   


function showResult(string){
    let result;
    let correctAnswer = questions[currentQuestionNum -1].answer;
    if(string.includes(correctAnswer)){
        //alert(string + " contains " + correctAnswer);
        result = create("Correct!" , "node");
    }else{
        //alert(string + " doesn't contain " + correctAnswer);
        result = create("Wrong!", "node");
        timeLeft = timeLeft - 15;
    }
    resultSection.innerText = "";
    resultSection.appendChild(result);
}


function showTally(){

    toBeHiddenElements =[instructionSection, questionSection, resultSection , leaderboardSection ];
    toBeVisibleElements =[headerSection, tallySection];
    showThese(toBeVisibleElements);
    hideThese(toBeHiddenElements);

    stopInterval();
    //setTimeout(() => stopCountDown(), 1000);
     if (timeLeft <= 0){
        score.innerText = 0;
    }else {
        score.innerText = timeLeft;
    }
}


function submitHighScore() {

    let newScore = score.value;
    
    let newUser = initial.value;
    if(validateInitials(newUser)){
        display(error, false);
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                let aKey = localStorage.key(i);
                if (newUser === aKey) {
                    //when current user is already saved
                    //and his current score is higer, update the score
                    if (newScore > localStorage.getItem(aKey)) {
                        localStorage.setItem(aKey, newScore);
                    }
                } else {
                    //when the current user is not found in the record
                    //it must be new, so add it
                    localStorage.setItem(newUser, newScore);
                }
                break;
            }
    
        } else {//if localStorage is empty, just add the item
            localStorage.setItem(newUser, newScore);
        }
        showLeaderboard();
    }else{
        initial.value = "";
        display(error);
        setTimeout( () => display(error, false), 1000);
    }
}
function validateInitials(initial){
    let regex = /^[a-zA-Z]+$/; 
    
    if(initial.trim().length == 0){
        return false;
    }else if(!regex.test(initial)){
        return false;
    }else{
        return true;
    }
    
}

function clearHighScores(){
    localStorage.clear();
    showLeaderboard();
}

function showLeaderboard(){
    toBeHiddenElements =[instructionSection, headerSection, questionSection, resultSection , tallySection ];
    toBeVisibleElements =[leaderboardSection];
    showThese(toBeVisibleElements);
    hideThese(toBeHiddenElements);

    let text="";
    for (let i = 0; i < localStorage.length; i++){
        let aKey = localStorage.key(i);
        let aValue = localStorage.getItem(aKey);
        text += (i + 1) + ". " + aKey + " - " + aValue + "\n"; 
    }
    highScore.value = text.toUpperCase();
}

