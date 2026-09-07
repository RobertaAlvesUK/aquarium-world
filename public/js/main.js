// Find the contact form on the page
const contactForm = document.getElementById("contact-form");

// Run validation only when the contact form exists
if (contactForm) {

    // Find the form fields
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

// Find the area for validation messages
  const clientMessage = document.getElementById("client-message");

// Check form fields before submission
contactForm.addEventListener("submit", (event) => {

// Read and clean the values entered by the visitor
   const name = nameInput.value.trim();
   const email = emailInput.value.trim();
   const message = messageInput.value.trim();

// Clear any previous validation message
clientMessage.textContent = "";
clientMessage.style.display = "none";

// Stop submission when a field is empty
if (name === "" || email === "" || message === "") {
  event.preventDefault();
  clientMessage.textContent = "Please complete all fields before sending your message.";
  clientMessage.style.display = "block";
} else if (!email.includes("@")) {

  // Stop submission when the email format is not valid
  event.preventDefault();
  clientMessage.textContent = "Please enter a valid email address.";
  clientMessage.style.display = "block";
}
  });
}

// Find the correct quiz answer button
const quizFeedback = document.getElementById("quiz-feedback");
const quizScore = document.getElementById("quiz-score");
const nextQuestion = document.getElementById("next-question");
const quizQuestion = document.getElementById("quiz-question");
const questionNumber = document.getElementById("question-number");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");


let score = 0;
let questionAnswered = false;

// Store the quiz questions and answers
const quizQuestions = [
  {
    question: "Which fish is known for its orange colour and white stripes?",
    answers: ["Great white shark", "Clownfish", "Seahorse"],
    correctAnswer: 1,
    feedback: "Correct! A clownfish is known for its orange colour and white stripes."
  },
  {
    question: "Which sea animal has eight arms?",
    answers: ["Octopus", "Sea turtle", "Ray"],
    correctAnswer: 0,
    feedback: "Correct! An octopus has eight arms."
  },
  {
    question: "Which animal uses its tail to hold onto plants?",
    answers: ["Shark", "Seahorse", "Jellyfish"],
    correctAnswer: 1,
    feedback: "Correct! A seahorse uses its tail to hold onto plants."
  }
];

let currentQuestion = 0;

// Check whether the selected answer is correct
function checkAnswer(answerIndex) {
  if (!questionAnswered) {
    const selectedQuestion = quizQuestions[currentQuestion];

    if (answerIndex === selectedQuestion.correctAnswer) {
      score = score + 1;
      quizScore.textContent = `Score: ${score}`;
      quizFeedback.textContent = selectedQuestion.feedback;
      questionAnswered = true;
    if (currentQuestion === quizQuestions.length - 1) {
  showCompletion();
} else {
  nextQuestion.hidden = false;
}

    } else {
      quizFeedback.textContent = "Not quite. Try again!";
    }
  }
}

// Display the current quiz question and answers
function displayQuestion() {
  const selectedQuestion = quizQuestions[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  quizQuestion.textContent = selectedQuestion.question;
  answerOne.textContent = selectedQuestion.answers[0];
  answerTwo.textContent = selectedQuestion.answers[1];
  answerThree.textContent = selectedQuestion.answers[2];

  quizFeedback.textContent = "";
  questionAnswered = false;
  nextQuestion.hidden = true;
}

// Show the final quiz result after all questions are completed
function showCompletion() {
  questionNumber.textContent = "Quiz complete!";
  quizQuestion.textContent = `Well done! You scored ${score} out of ${quizQuestions.length}.`;
  quizFeedback.textContent = "Thanks for testing your aquarium knowledge.";
  answerOne.hidden = true;
  answerTwo.hidden = true;
  answerThree.hidden = true;
  nextQuestion.hidden = true;
}

// Run quiz code only when the quiz page is open
if (answerOne) {
  answerOne.addEventListener("click", () => {
    checkAnswer(0);
  });

  answerTwo.addEventListener("click", () => {
    checkAnswer(1);
  });

  answerThree.addEventListener("click", () => {
    checkAnswer(2);
  });

  // Move to the next question or show the final result
  nextQuestion.addEventListener("click", () => {
    currentQuestion = currentQuestion + 1;

    if (currentQuestion < quizQuestions.length) {
      displayQuestion();
    } else {
      showCompletion();
    }
  });
}

