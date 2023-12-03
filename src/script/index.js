
const q1 = {
    question: "Commonly Used data types DO Not Include: ",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
};
const q2 = {
    question: "The condition in an if/else statement is enclosed with _____.",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
}
const q3 = {
    question: "Always in JavaScript can be used to store _____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
}
const q4 = {
    question: "String valuse must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
}
const q5 = {
    question: "A very useful tool used during development and debugging for printing content to the dubugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
}

const questions = [q1, q2, q3, q4, q5];
let currentQuestionNum = 0;



function startQuiz() {
    showQuestions();
}

function showQuestions() {
    let paragraph, orderList, list;
    instructionSection = document.querySelector(".instruction");
    instructionSection.innerText = "";
    questionSection = document.querySelector(".question");
    paragraph = document.createElement("p");

    for (let i = 0; i < questions.length; i++) {
        if (i == currentQuestionNum) {
            paragraph.innerText = questions[i].question;
            questionSection.innerText = "";
            questionSection.appendChild(paragraph);

            for (let j in questions[i].options) {
                let button = document.createElement("a");
                button.innerText = (++j) + "." + questions[i].options[--j];
                questionSection.appendChild(button);
            }
            break;
        }
    }

}

