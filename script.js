// Lista med frågor och svar
const questions = [
  {
    type: "trueFalse",
    question: "JavaScript can be used to create websites.",
    correctAnswer: "true"
  },
  {
    type: "trueFalse",
    question: "JavaScript is the same as HTML.",
    correctAnswer: "false"
  },
  {
    type: "multipleChoice",
    question: "What is used to display messages in the browser console?",
    options: ["alert()", "console.log()", "prompt()", "document.write()"],
    correctAnswer: "console.log()"
  },
  {
    type: "multipleChoice",
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    type: "checkbox",
    question: "Select all data types in JavaScript:",
    options: ["Number", "String", "Boolean", "Letter"],
    correctAnswers: ["Number", "String", "Boolean"]
  },
  {
    type: "checkbox",
    question: "Which of these are JavaScript events?",
    options: ["click", "mouseover", "keydown", "blur"],
    correctAnswers: ["click", "mouseover", "keydown", "blur"]
  },
  {
    type: "trueFalse",
    question: "A JavaScript file has the extension `.js`.",
    correctAnswer: "true"
  },
  {
    type: "multipleChoice",
    question: "Which of these is a valid JavaScript variable name?",
    options: ["2name", "name!", "_name", "name-2"],
    correctAnswer: "_name"
  },
  {
    type: "multipleChoice",
    question: "What does the `alert()` function do?",
    options: ["Logs a message to the console", "Shows a pop-up box", "Defines a variable", "Saves data"],
    correctAnswer: "Shows a pop-up box"
  },
  {
    type: "checkbox",
    question: "Which of these are valid loop types in JavaScript?",
    options: ["for", "while", "foreach", "loop"],
    correctAnswers: ["for", "while", "foreach"]
  }
];

// Variabler för quizstatus
let currentQuestionIndex = 0; // Håller koll på vilken fråga som visas
let score = 0; // Räknar användarens poäng

// Visar tidigare resultat om det finns
function showPreviousResults() {
  const lastScore = localStorage.getItem("lastScore"); // Hämta senaste resultat
  const highScore = localStorage.getItem("highScore"); // Hämta högsta resultat

  if (lastScore) {
    const previousResults = document.createElement("p");
    previousResults.textContent = `Last Score: ${lastScore}`;
    document.getElementById("start-screen").appendChild(previousResults);
  }

  if (highScore) {
    const bestScore = document.createElement("p");
    bestScore.textContent = `High Score: ${highScore}`;
    document.getElementById("start-screen").appendChild(bestScore);
  }
}

// Starta quizet
function startQuiz() {
  const savedIndex = localStorage.getItem("currentQuestionIndex");
  if (savedIndex) {
    currentQuestionIndex = parseInt(savedIndex, 10); // Hämta sparad fråga
  }

  // Visa frågeskärmen, göm startsidan
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  showQuestion();
}

// Visa en fråga
function showQuestion() {
  const questionData = questions[currentQuestionIndex]; // Hämtar aktuell fråga
  const questionTitle = document.getElementById("question-title");
  const answerContainer = document.getElementById("answer-container");

  questionTitle.textContent = questionData.question; // Sätt frågetext
  answerContainer.innerHTML = ""; // Rensa gamla svar

  // Skapa knappar för sant/falskt-frågor
  if (questionData.type === "trueFalse") {
    ["True", "False"].forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(answer.toLowerCase());
      answerContainer.appendChild(button);
    });
  }
  // Skapa knappar för flervalsfrågor
  else if (questionData.type === "multipleChoice") {
    questionData.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(option);
      answerContainer.appendChild(button);
    });
  }
  // Skapa checkrutor för checkbox-frågor
  else if (questionData.type === "checkbox") {
    questionData.options.forEach((option) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = option;
      checkbox.name = "checkbox-answer";

      const label = document.createElement("label");
      label.textContent = option;
      label.appendChild(checkbox);
      answerContainer.appendChild(label);
    });

    // Lägg till en knapp för att skicka svar
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("answer-btn");
    submitButton.onclick = handleCheckboxAnswer;
    answerContainer.appendChild(submitButton);
  }
}

// Kontrollera svar för sant/falskt och flervalsfrågor
function handleAnswer(selectedAnswer) {
  const questionData = questions[currentQuestionIndex];
  if (selectedAnswer === questionData.correctAnswer) {
    score++; // Öka poängen om svaret är rätt
  }
  goToNextQuestion();
}

// Kontrollera svar för checkbox-frågor
function handleCheckboxAnswer() {
  const questionData = questions[currentQuestionIndex];
  const selectedAnswers = Array.from(
    document.querySelectorAll("input[name='checkbox-answer']:checked")
  ).map((checkbox) => checkbox.value);

  if (
    selectedAnswers.length === questionData.correctAnswers.length &&
    selectedAnswers.every((answer) => questionData.correctAnswers.includes(answer))
  ) {
    score++;
  }
  goToNextQuestion();
}

// Gå till nästa fråga eller visa resultat
function goToNextQuestion() {
  currentQuestionIndex++;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex); // Spara aktuell fråga

  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Visa nästa fråga
  } else {
    showResults(); // Visa resultat
    localStorage.removeItem("currentQuestionIndex");
  }
}

// Visa resultatet
function showResults() {
  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const scoreSummary = document.getElementById("score-summary");
  const totalQuestions = questions.length;

  scoreSummary.textContent = `You got ${score} out of ${totalQuestions} correct.`;

  const resultTitle = document.getElementById("result-title");
  if (score / totalQuestions < 0.5) {
    resultTitle.textContent = "Underkänt";
    resultTitle.style.color = "red";
  } else if (score / totalQuestions < 0.75) {
    resultTitle.textContent = "Bra jobbat!";
    resultTitle.style.color = "orange";
  } else {
    resultTitle.textContent = "Riktigt bra jobbat!";
    resultTitle.style.color = "green";
  }

  localStorage.setItem("lastScore", score); // Spara poäng
  const highScore = localStorage.getItem("highScore");
  if (!highScore || score > highScore) {
    localStorage.setItem("highScore", score); // Uppdatera högsta poäng
  }
}

// Starta quizet och starta om quizet
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  localStorage.removeItem("currentQuestionIndex");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

// Visa tidigare resultat
showPreviousResults();
