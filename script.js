console.log("✅ script.js loaded");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function startQuiz() {
  const response = await fetch('questions.json?cacheBust=' + Date.now());

  const allQuestions = await response.json();

  console.log("Fetched questions:", allQuestions); // ✅ Add this
    
  const category = document.getElementById('category-select').value;

  if (category === "All") {
    questions = shuffle(allQuestions).slice(0, 5);
  } else {
    const filtered = allQuestions.filter(q => q.category === category);
    questions = shuffle(filtered).slice(0, 5);
  }

  currentQuestionIndex = 0;
  score = 0;

  if (questions.length === 0) {
    document.getElementById('quiz-container').innerHTML = `<p>No questions found for this category.</p>`;
    return;
  }

  showQuestion();
}

function showQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear previous content

  const q = questions[currentQuestionIndex];

  const questionElem = document.createElement('h2');
  questionElem.textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
  quizContainer.appendChild(questionElem);

  const feedbackElem = document.createElement('p');
  feedbackElem.style.fontWeight = 'bold';

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => {
      const isCorrect = index === q.correctIndex;

      feedbackElem.innerHTML = isCorrect
        ? '✅ Correct!'
        : `❌ Incorrect. Correct answer: <strong>${q.options[q.correctIndex]}</strong><br/>Tip: ${q.tip}`;

      if (isCorrect) score++;

      // Disable all buttons
      quizContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);

      // Add "Next" button
      const nextButton = document.createElement('button');
      nextButton.textContent = currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results';
      nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          showResults();
        }
      };
      quizContainer.appendChild(document.createElement('br'));
      quizContainer.appendChild(nextButton);
    };
    quizContainer.appendChild(button);
    quizContainer.appendChild(document.createElement('br'));
  });

  quizContainer.appendChild(feedbackElem);
}

function showResults() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>You scored ${score} out of ${questions.length}.</p>
    <button onclick="startQuiz()">Try Again</button>
  `;
}

// Utility: Fisher-Yates shuffle
function shuffle(array) {
  let copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
