const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Who invented the computer first?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Thomas Edison", correct: false },
            { text: "Ada Lovelace", correct: false },
            { text: "Guglielmo Marconi", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Who is the president of the USA since 2021?",
        answers: [
            { text: "Donald Trump", correct: false },
            { text: "Joe Biden", correct: true },
            { text: "Barack Obama", correct: false },
            { text: "George W.Bush", correct: false },
        ]
    },
    {
        question: "How many bones are there in the human body?",
        answers: [
            { text: "202", correct: false },
            { text: "200", correct: false },
            { text: "204", correct: false },
            { text: "206", correct: true },
        ]
    },
    {
        question: "Which is the largest ocean on the Earth?",
        answers: [
            { text: "Pacific", correct: true },
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Antarctic", correct: false },
        ]
    },
    {
        question: "Which is the largest planet in our solar system?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
        ]
    },
    {
        question: "How many continents are there?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false },
        ]
    },
    {
        question: "Which is the largest country in the world?",
        answers: [
            { text: "Russia", correct: true },
            { text: "America", correct: false },
            { text: "Australia", correct: false },
            { text: "Brazil", correct: false },
        ]
    },
    {
        question: "How many states are there in the US?",
        answers: [
            { text: "50", correct: true },
            { text: "51", correct: false },
            { text: "52", correct: false },
            { text: "53", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    submitButton.style.display = "none";
    selectedQuestions = getRandomQuestions(questions, 5);
    showQuestion();
}

function getRandomQuestions(questionsArray, num) {
    const shuffled = questionsArray.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
        nextButton.style.display = "block";
    } else {
        submitButton.style.display = "block";
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${selectedQuestions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

submitButton.addEventListener("click", showScore);
startQuiz();
