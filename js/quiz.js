const quizData = {
  "id": 1,
  "quizName": "Robotics Quiz",
  "totalQuestions": [
    {
      "questionType": "Multiple Choice Question",
      "question": "What is a robot and its primary function in various industries?",
      "options": [
        "A machine designed to perform tasks",
        "A type of natural organism",
        "An advanced form of AI",
        "A software application"
      ],
      "correctAnswer": 0,
      "educoinForThisQuestion": 1
    },
    {
      "questionType": "Multiple Choice Question",
      "question": "What does AI stand for, and how does it relate to robotics?",
      "options": [
        "Automated Intelligence in machines",
        "Artificial Intelligence enabling tasks",
        "Actual Intelligence in computers",
        "Advanced Integration of systems"
      ],
      "correctAnswer": 1,
      "educoinForThisQuestion": 2
    },
    {
      "questionType": "Multiple Choice Question",
      "question": "What role do sensors play in the functionality of robots?",
      "options": [
        "They detect environmental conditions",
        "They generate power for operation",
        "They store information about tasks",
        "They program the robot's actions"
      ],
      "correctAnswer": 0,
      "educoinForThisQuestion": 1
    },
    {
      "questionType": "Multiple Choice Question",
      "question": "In what ways can drones be classified within the realm of robotics?",
      "options": [
        "As flying robots for various purposes",
        "As ground-based autonomous machines",
        "As intelligent robotic pets",
        "As mobile applications"
      ],
      "correctAnswer": 0,
      "educoinForThisQuestion": 1
    },
    {
      "questionType": "Multiple Choice Question",
      "question": "How does automation enhance productivity in modern industries?",
      "options": [
        "By enabling automatic operation of machines",
        "By requiring manual intervention in processes",
        "By facilitating human oversight",
        "By creating robotic art"
      ],
      "correctAnswer": 0,
      "educoinForThisQuestion": 1
    },
    {
      "questionType": "Multiple Choice Question",
      "question": "What is coding, and why is it essential for programming robots?",
      "options": [
        "It involves writing instructions for software",
        "It relates to creating music compositions",
        "It focuses on designing graphics and visuals",
        "It encompasses culinary skills"
      ],
      "correctAnswer": 0,
      "educoinForThisQuestion": 2
    }
  ],
  "totalEducoins": 10
};



// Variable names
let currentQuizQuestion = 0;
let correctQuizAnswers = 0;
const userQuizAnswers = [];

// Unique DOM elements
const quizQuestionCurrentEducoinElem = document.getElementById("quizQuestionCurrentEducoin");

const quizQuestionTypeElem = document.getElementById("quizQuestionType");
const quizQuestionProgressNumberElem = document.getElementById("quizQuestionProgressNumber");
const quizQuestionProgressBarElem = document.getElementById("progressBarFill");
const quizQuestionCurrentNumElem = document.getElementById("quizQuestionCurrentNum");

const quizQuestionTextElem = document.getElementById("quizQuestionText");
const quizOptionsElem = document.getElementById("quizOptions");
const quizProgressBarElem = document.getElementById("quizProgressBar");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizResultModal = document.getElementById("quizResultModal");
const quizResultEducoinEarnedElem = document.getElementById("quizResultEducoinEarned");

const quizTotalQuestionCount = document.querySelectorAll(".quiz-popup-total-question-count");

const quizName = document.querySelectorAll(".quiz-name");

// Update the text of each element in the NodeList
quizTotalQuestionCount.forEach((element) => {
  element.innerText = quizData.totalQuestions.length;
})

quizName.forEach((element) => {
  element.innerText = quizData.quizName;
})



function loadQuizQuestion() {
  const questionData = quizData.totalQuestions[currentQuizQuestion];

  quizQuestionCurrentEducoinElem.innerHTML = `<p class="flex gap-2 items-center text-black/70 "> For this question you will earn 
    <span class="font-bold flex items-center gap-1 ">  
    ${questionData.educoinForThisQuestion}
    <img class="w-[26px]" src="/assets/img/educoin-sm.png"/>
    </span>Educoins</p>`;

  quizQuestionTypeElem.innerHTML = `<p>${questionData.questionType}</p>`;
  quizQuestionCurrentNumElem.innerHTML = `Question <span>${currentQuizQuestion + 1}</span>`;
  quizTotalQuestionCount.innerText = quizData.totalQuestions.length;

  // Update question number and text
  quizQuestionProgressNumberElem.innerHTML = `<span class="text-black font-bold">${currentQuizQuestion + 1}</span> / ${quizData.totalQuestions.length}`;

  // Calculate and update progress bar (only once)
  const quizProgressPercentage = ((currentQuizQuestion) / quizData.totalQuestions.length) * 100;
  quizQuestionProgressBarElem.style.width = `${quizProgressPercentage}%`;

  const quizEducyFlyProgress = (currentQuizQuestion / quizData.totalQuestions.length) * 96; // Move image to max 96%
  document.getElementById("quizProgressEducy").style.left = `${quizEducyFlyProgress}%`;

  quizQuestionTextElem.classList.add("font-semibold", "text-lg");
  quizQuestionTextElem.innerText = questionData.question;

  // Clear previous options
  quizOptionsElem.innerHTML = "";

  // Create options with similar structure to feedback design
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add(
    "flex", "lg:flex-row", "flex-col",
    "w-full", "gap-4", "pt-3"
  );

  questionData.options.forEach((option, index) => {
    const optionQuizDiv = document.createElement("div");
    optionQuizDiv.classList.add(
      "quiz-radio-option",
      "p-5", "bg-white", "w-full", "lg:w-[180px]", "min-h-[120px]",
      "flex", "flex-col", "justify-center", "items-center", "gap-2", "rounded-2xl", "cursor-pointer", "text-center",
      "border-[3px]", "border-transparent", "hover:border-[#f8740b]/50"
    );
    optionQuizDiv.dataset.option = `option_${index}`;
    optionQuizDiv.onclick = () => selectOption(optionQuizDiv, `question_${currentQuizQuestion}`);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question_${currentQuizQuestion}`;
    radio.value = index;
    radio.classList.add("hidden");

    const label = document.createElement("label");
    label.classList.add("font-medium", "text-center");
    label.innerText = option;

    optionQuizDiv.appendChild(radio);
    optionQuizDiv.appendChild(label);
    optionsContainer.appendChild(optionQuizDiv);
  });

  quizOptionsElem.appendChild(optionsContainer);

  // Change button text on the last question
  quizNextBtn.textContent = (currentQuizQuestion === quizData.totalQuestions.length - 1) ? "Submit" : "Next";
}


function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question by setting border to transparent
  const allOptions = selectedDiv.parentNode.querySelectorAll(".quiz-radio-option");
  allOptions.forEach(option => {
    option.classList.remove('border-primary');
    option.classList.add('border-transparent');
  });

  // Select the clicked option by changing border color to primary
  selectedDiv.classList.remove('border-transparent');
  selectedDiv.classList.add('border-primary');

  // Set the corresponding radio input as checked
  const input = selectedDiv.querySelector('input[type="radio"]');
  input.checked = true;
}

// Function to trigger the confetti
function triggerConfetti() {
  confetti({
    particleCount: 200, // Number of confetti particles
    spread: 70, // Spread of the confetti
    origin: { y: 0.6 }, // Origin of the confetti (centered vertically)
    colors: ['#FFA500', '#FF8C00', '#FF4500', '#FFD700'], // Shades of orange
  });
}

// Function to show quiz result
function showQuizResult() {
  const totalQuestions = quizData.totalQuestions.length;
  let earnedEducoins = 0;

  // Loop through user answers to calculate total Educoins earned
  userQuizAnswers.forEach(answer => {
    const question = quizData.totalQuestions[answer.questionId]; // Get the corresponding question
    if (answer.answer === question.correctAnswer) { // Check if the answer is correct
      earnedEducoins += question.educoinForThisQuestion; // Add Educoins for the correct answer
    }
  });

  // Update progress circle dynamically
  const progressCircle = document.getElementById("progressCircle");
  const progressText = document.getElementById("progressText");
  const percentageCorrect = (correctQuizAnswers / totalQuestions) * 100;

  const circleDashArray = 283; // Full circumference of circle
  const dashOffset = circleDashArray - (circleDashArray * percentageCorrect) / 100;
  progressCircle.style.strokeDashoffset = dashOffset;
  progressText.innerText = `${correctQuizAnswers}`;

  quizResultEducoinEarnedElem.innerText = earnedEducoins;

  document.querySelector(".quizCorrectAnswers").innerText = correctQuizAnswers;

  // Show the popup
  quizCompletionPopup.classList.remove('hidden');
  quizCompletionPopup.classList.add('flex');

  // Trigger any celebration animation (if required)
  triggerConfetti();
}
// Event listener for the next button
quizNextBtn.addEventListener("click", () => {

  const selectedAnswer = document.querySelector(`input[name="question_${currentQuizQuestion}"]:checked`);

  // Check if an answer is selected
  if (selectedAnswer === null) {
    alert("Please select an option before continuing.");
    return;  // Exit if no answer is selected
  }

  // Store the user's answer
  userQuizAnswers.push({ questionId: currentQuizQuestion, answer: parseInt(selectedAnswer.value) });

  // Check if the answer is correct
  if (parseInt(selectedAnswer.value) === quizData.totalQuestions[currentQuizQuestion].correctAnswer) {
    correctQuizAnswers++;
  }

  // Only update progress if it's not the last question
  if (currentQuizQuestion < quizData.totalQuestions.length - 1) {
    currentQuizQuestion++;

    // Update the progress bar to reflect answering each question
    const progressPercentage = (currentQuizQuestion / quizData.totalQuestions.length) * 100;
    quizQuestionProgressBarElem.style.width = `${progressPercentage}%`;

    // Load the next question
    loadQuizQuestion();
  } else {
    // On the last question, finalize the progress at 100%
    quizQuestionProgressBarElem.style.width = `100%`;

    // On the last question, finalize the educy img at 96%
    quizProgressEducy.style.left = `96%`


    // Show results after the last question is answered
    console.log("User's Answers:", JSON.stringify(userQuizAnswers));
    console.log(`Correct Answers: ${correctQuizAnswers}`);
    showQuizResult();


  }
});

loadQuizQuestion();
