// Quiz configuration
const quizData = [
  {
    question: "What is the primary cause of climate change?",
    options: [
      "Solar flares",
      "Greenhouse gas emissions",
      "Ocean currents",
      "Volcanic activity"
    ],
    correct: 1
  },
  {
    question: "Which gas makes up the majority of Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen",
      "Hydrogen"
    ],
    correct: 2
  },
  {
    question: "What is the process by which plants convert sunlight into energy?",
    options: [
      "Respiration",
      "Photosynthesis",
      "Transpiration",
      "Fermentation"
    ],
    correct: 1
  },
  {
    question: "Which of the following is a renewable energy source?",
    options: [
      "Coal",
      "Natural gas",
      "Solar power",
      "Oil"
    ],
    correct: 2
  },
  {
    question: "What term describes the variety of life in an ecosystem?",
    options: [
      "Ecosystem services",
      "Biodiversity",
      "Habitat fragmentation",
      "Population density"
    ],
    correct: 1
  },
  {
    question: "Which layer of the atmosphere contains the ozone layer?",
    options: [
      "Troposphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere"
    ],
    correct: 1
  },
  {
    question: "What is the main greenhouse gas produced by human activities?",
    options: [
      "Methane",
      "Carbon dioxide",
      "Nitrous oxide",
      "Water vapor"
    ],
    correct: 1
  },
  {
    question: "Which practice helps reduce soil erosion?",
    options: [
      "Monoculture farming",
      "Deforestation",
      "Contour plowing",
      "Overgrazing"
    ],
    correct: 2
  }
];
let currentQuestion = 0;
let score = 0;
let answeredQuestions = [];

// DOM elements
const container = document.createElement('div');
container.id = 'quiz-container';

function initQuiz() {
  // Create main container
  const quizDiv = document.createElement('div');
  quizDiv.innerHTML = `
    <div id="quiz-content"></div>
    <div id="result" style="display: none;">
      <h2>Quiz Complete!</h2>
      <p>Your Score: <span id="score-display">0</span> out of ${quizData.length}</p>
      <button onclick="restartQuiz()">Restart Quiz</button>
    </div>
  `;
  
  document.body.appendChild(quizDiv);
  showQuestion();
}

function showQuestion() {
  const content = document.getElementById('quiz-content');
  const questionData = quizData[currentQuestion];
  
  let buttonsHTML = '';
  questionData.options.forEach((option, index) => {
    buttonsHTML += `<button class="option-btn" onclick="selectAnswer(${index})">${option}</button>`;
  });
  
  content.innerHTML = `
    <h2>Question ${currentQuestion + 1}/${quizData.length}</h2>
    <p>${questionData.question}</p>
    <div class="options">${buttonsHTML}</div>
  `;
}

function selectAnswer(selectedIndex) {
  const questionData = quizData[currentQuestion];
  
  // Disable all buttons after selection
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  // Check if answer is correct
  if (selectedIndex === questionData.correct) {
    score++;
    buttons[selectedIndex].style.backgroundColor = '#052F5F';
    buttons[selectedIndex].style.color = '#fff';
    answeredQuestions.push({ question: currentQuestion, correct: true });
  } else {
    buttons[selectedIndex].style.backgroundColor = '#e74c3c';
    buttons[selectedIndex].style.color = '#fff';
    buttons[questionData.correct].style.backgroundColor = '#06A77D';
    buttons[questionData.correct].style.color = '#fff';
    answeredQuestions.push({ question: currentQuestion, correct: false });
  }
  
  // Wait briefly then move to next question
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}

function showResults() {
  document.getElementById('quiz-content').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('score-display').textContent = score;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answeredQuestions = [];
  document.getElementById('quiz-content').style.display = 'block';
  document.getElementById('result').style.display = 'none';
  showQuestion();
}

// Initialize quiz when page loads
window.addEventListener('load', initQuiz);

// Add styles for buttons via JavaScript
const style = document.createElement('style');
style.textContent = `
  #quiz-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
  }
  
  .option-btn {
    display: block;
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .option-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  button:disabled {
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);
