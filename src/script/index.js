
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
const instructionSection = get("instruction");
const questionSection = get("quizQuestion");
let currentQuestionNum = 0;


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

window.onload = function (){
    
 
};
function startQuiz() {
   instructionSection.style.display = "none";
    showQuestions();
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
                button.addEventListener("click", showNextQuestion);

            }
            // if we find a match already, don't loop
            //there is one one match at a time
            break;
        }
    }
}

function showNextQuestion(){
    showQuestions();
}



