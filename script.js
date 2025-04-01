async function startQuiz() {
  const response = await fetch('questions.json');
  const questions = await response.json();

  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear previous content

  const q = questions[0]; // Still just one question for now

  const questionElem = document.createElement('h2');
  questionElem.textContent = q.question;
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

      // Disable all buttons after answering
      quizContainer.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
      });
    };
    quizContainer.appendChild(button);
    quizContainer.appendChild(document.createElement('br'));
  });

  quizContainer.appendChild(feedbackElem);
}
