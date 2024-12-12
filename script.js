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
  