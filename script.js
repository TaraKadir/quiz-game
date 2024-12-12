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
  
  // Variabler för att hålla koll på quizstatus
let currentQuestionIndex = 0; // Vilken fråga som visas
let score = 0; // Användarens poäng

// Funktion för att visa tidigare resultat på startsidan
function showPreviousResults() {
  const lastScore = localStorage.getItem("lastScore");
  const highScore = localStorage.getItem("highScore");

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

// Funktion som startar quizet
function startQuiz() {
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    if (savedIndex) {
      currentQuestionIndex = parseInt(savedIndex, 10);
    }
  
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("question-screen").classList.remove("hidden");
    showQuestion();
  }
  
  // Funktion som visar frågan
  function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    const questionTitle = document.getElementById("question-title");
    const answerContainer = document.getElementById("answer-container");
  
    // Sätt frågetext
    questionTitle.textContent = questionData.question;
  
    // Rensa gamla svar
  answerContainer.innerHTML = "";

  if (questionData.type === "trueFalse") {
    ["True", "False"].forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(answer.toLowerCase());
      answerContainer.appendChild(button);
    });
  } else if (questionData.type === "multipleChoice") {
    questionData.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("answer-btn");
      button.onclick = () => handleAnswer(option);
      answerContainer.appendChild(button);
    });
  } else if (questionData.type === "checkbox") {
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

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("answer-btn");
    submitButton.onclick = handleCheckboxAnswer;
    answerContainer.appendChild(submitButton);
  }
}

// Hantera svar för sant/falskt och multiple choice
function handleAnswer(selectedAnswer) {
    const questionData = questions[currentQuestionIndex];
    if (selectedAnswer === questionData.correctAnswer) {
      score++;
    }
    goToNextQuestion();
  }
  
  // Hantera checkbox-svar
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
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
      localStorage.removeItem("currentQuestionIndex");
    }
  }
  
  // Visa resultat
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
  
    localStorage.setItem("lastScore", score);
    const highScore = localStorage.getItem("highScore");
    if (!highScore || score > highScore) {
      localStorage.setItem("highScore", score);
    }
  }
  
  // Event Listeners
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