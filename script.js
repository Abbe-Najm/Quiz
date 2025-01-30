let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

// Hämta frågor från JSON-filen
fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuestion();
    })
    .catch(error => console.error("Fel vid hämtning av frågorna:", error));

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkAnswer(option));
        optionsEl.appendChild(button);
    });
}

function resetState() {
    nextBtn.disabled = true;
    optionsEl.innerHTML = "";
    resultEl.textContent = "";
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(button => {
        if (button.textContent === currentQuestion.answer) {
            button.classList.add("correct");
        } else if (button.textContent === selectedOption) {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.textContent = `Du fick ${score} av ${quizData.length} rätt!`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
}
