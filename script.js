async function startQuiz() {
  const response = await fetch('questions.json');
  const questions = await response.json();

  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Clear anything old

  const q = questions[0]; // Just show the first question for now

  const questionElem = document.createElement('h2');
  questionElem.textContent = q.question;
  quizContainer.appendChild(questionElem);

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => {
      if (index === q.correctIndex) {
        alert('✅ Correct!');
      } else {
        alert(`❌ Incorrect.\nCorrect answer: ${q.options[q.correctIndex]}\nTip: ${q.tip}`);
      }
    };
    quizContainer.appendChild(button);
    quizContainer.appendChild(document.createElement('br'));
  });
}
