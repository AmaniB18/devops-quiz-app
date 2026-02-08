let allQuestions = [];
let filteredQuestions = [];
let currentQuestionIndex = 0;

const topicSelect = document.getElementById("topicSelect");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");

// Load questions from JSON
fetch("data/questions.json")
  .then(response => response.json())
  .then(data => {
    allQuestions = data;
    loadTopics();
  });

// Load topics into dropdown
function loadTopics() {
  const topics = [...new Set(allQuestions.map(q => q.topic))];
  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

// When topic changes
topicSelect.addEventListener("change", () => {
  filteredQuestions = allQuestions.filter(
    q => q.topic === topicSelect.value
  );
  currentQuestionIndex = 0;
  showQuestion();
});

// Display one question
function showQuestion() {
  const q = filteredQuestions[currentQuestionIndex];
  if (!q) return;

  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  explanationEl.textContent = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

// Check answer
function checkAnswer(selectedIndex) {
  const q = filteredQuestions[currentQuestionIndex];
  if (selectedIndex === q.answerIndex) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "❌ Wrong!";
    feedbackEl.style.color = "red";
  }
  explanationEl.textContent = q.explanation;
}

// Next question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < filteredQuestions.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz Finished!";
    optionsEl.innerHTML = "";
  }
});
