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

// Jag testade att lägga till dark mode här - det verkar fungera!
// Togglar mellan ljus och mörk bakgrund
document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Variabler för quizstatus
let currentQuestionIndex = 0; // Har koll på vilken fråga som ska visas (börjar på 0!)
let score = 0; // Håller reda på poängen för användaren

// Visar tidigare resultat om det finns sparat
function showPreviousResults() {
  const lastScore = localStorage.getItem("lastScore"); // Hämtar senaste resultatet
  const highScore = localStorage.getItem("highScore"); // Hämtar högsta resultatet

  // Visar tidigare resultat om det finns något
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

// Börjar quizet - gömmer startsidan och visar första frågan
function startQuiz() {
  const savedIndex = localStorage.getItem("currentQuestionIndex");
  if (savedIndex && savedIndex < questions.length) {
    currentQuestionIndex = parseInt(savedIndex, 10); // Hämtar sparad fråga
  } else {
    currentQuestionIndex = 0;
  }

  document.getElementById("start-screen").classList.add("hidden"); // Göm startsidan
  document.getElementById("question-screen").classList.remove("hidden"); // Visa frågorna
  showQuestion();
}

// Visar en fråga
function showQuestion() {
  const questionData = questions[currentQuestionIndex]; // Hämtar aktuell fråga
  const questionTitle = document.getElementById("question-title");
  const answerContainer = document.getElementById("answer-container");

  questionTitle.textContent = questionData.question; // Sätter frågetext
  answerContainer.innerHTML = ""; // Rensar gamla svar

  // Skapar knappar för sant/falskt-frågor
  if (questionData.type === "trueFalse") {
    ["True", "False"].forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(answer.toLowerCase());
      answerContainer.appendChild(button);
    });
  }
  // Skapar knappar för flervalsfrågor
  else if (questionData.type === "multipleChoice") {
    questionData.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(option);
      answerContainer.appendChild(button);
    });
  }
  // Skapar checkrutor för checkbox-frågor
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

    // Lägger till en knapp för att skicka svar
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("answer-btn");
    submitButton.onclick = handleCheckboxAnswer;
    answerContainer.appendChild(submitButton);
  }
}

// Kontrollerar svar för sant/falskt och flervalsfrågor
function handleAnswer(selectedAnswer) {
  const feedback = document.getElementById("feedback"); // Hämtar feedback-elementet
  if (!feedback) return;

  const questionData = questions[currentQuestionIndex];
  localStorage.setItem(`answer-${currentQuestionIndex}`, selectedAnswer);
 
  if (selectedAnswer === questionData.correctAnswer) {
    score++; // Öka poängen om svaret är rätt
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
  }

  feedback.classList.remove("hidden"); // Visa feedback
  setTimeout(() => {
    feedback.classList.add("hidden"); // Göm feedback efter 1 sekund
    goToNextQuestion();
  }, 1000);
}

// Kontrollerar svar för checkbox-frågor
function handleCheckboxAnswer() {
  const feedback = document.getElementById("feedback"); // Hämtar feedback-elementet
  if (!feedback) return;

  const questionData = questions[currentQuestionIndex];
  const selectedAnswers = Array.from(
    document.querySelectorAll("input[name='checkbox-answer']:checked")
  ).map((checkbox) => checkbox.value);

  localStorage.setItem(`answer-${currentQuestionIndex}`, JSON.stringify(selectedAnswers));
  if (
    selectedAnswers.length === questionData.correctAnswers.length &&
    selectedAnswers.every((answer) => questionData.correctAnswers.includes(answer))
  ) {
    score++;
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Wrong!";
    feedback.style.color = "red";
  }

  feedback.classList.remove("hidden");
  setTimeout(() => {
    feedback.classList.add("hidden");
    goToNextQuestion();
  }, 1000);
}

// Går till nästa fråga eller visar resultatet
function goToNextQuestion() {
  currentQuestionIndex++;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
    localStorage.removeItem("currentQuestionIndex");
  }
}

// Visar resultatet
function showResults() {
  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  const scoreSummary = document.getElementById("score-summary");
  const totalQuestions = questions.length;

  // Visar den totala poängen
  scoreSummary.textContent = `You got ${score} out of ${totalQuestions} correct.`;

  // Ändra färg baserat på resultat
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

  // Detaljerade resultat för varje fråga
  const detailedResults = document.getElementById("detailed-results");
  detailedResults.innerHTML = ""; // Rensar tidigare resultat

  questions.forEach((question, index) => {
    const resultItem = document.createElement("p");
    const userAnswer = localStorage.getItem(`answer-${index}`);
    const isCorrect =
      question.type === "checkbox"
        ? JSON.parse(userAnswer).every((ans) => question.correctAnswers.includes(ans))
        : userAnswer === question.correctAnswer;

    resultItem.textContent = `Question ${index + 1}: ${
      isCorrect ? "Correct" : `Wrong (Your answer: ${userAnswer})`
    }`;
    resultItem.style.color = isCorrect ? "green" : "red";

    detailedResults.appendChild(resultItem);
  });

  localStorage.setItem("lastScore", score);
  const highScore = localStorage.getItem("highScore");
  if (!highScore || score > highScore) {
    localStorage.setItem("highScore", score);
  }
}

// Startar quizet och startar om quizet
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  localStorage.removeItem("currentQuestionIndex");
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

// Visar tidigare resultat
showPreviousResults();
