
// ============================================
// Timeline accordion
// ============================================

document.querySelectorAll('.accordion-header').forEach(header => {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.arrow');

  // Check if the header has the active class
  if (header.classList.contains('timeline-active')) {
    content.style.display = 'flex';
    arrow.style.transform = 'rotate(180deg)';
  }

  header.addEventListener('click', () => {
    // Toggle active class
    header.classList.toggle('timeline-active');

    // Toggle content visibility
    content.style.display = content.style.display === 'flex' ? 'none' : 'flex';

    // Rotate the arrow
    arrow.style.transform = content.style.display === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

// ============================================
// Quiz completion popup
// ============================================

// Grab the necessary elements
const submitBtn = document.getElementById('submitBtn');
const quizCompletionPopup = document.getElementById('quizCompletionPopup');
const quizContinueBtn = document.getElementById('quizContinueBtn');
const cancelBtn = document.getElementById('cancelBtn');
const studentReviewPopup = document.getElementById('studentReviewPopup');
const unitCompletionPopup = document.getElementById('unitCompletionPopup');
const stdReviewCloseBtn = document.getElementById('stdReviewCloseBtn');


// Show the popup when the quiz completed submit button is clicked
submitBtn.addEventListener('click', () => {
  quizCompletionPopup.classList.remove('hidden');
  quizCompletionPopup.classList.add('flex');
});

// Hide the popup when either the OK or Cancel button is clicked
quizContinueBtn.addEventListener('click', () => {
  quizCompletionPopup.classList.add('hidden');
  studentReviewPopup.classList.remove('hidden')
  studentReviewPopup.classList.add('flex')
});

cancelBtn.addEventListener('click', () => {
  quizCompletionPopup.classList.add('hidden');
});

function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question
  const allOptions = document.querySelectorAll(`div[data-option]`);
  allOptions.forEach(option => {
    option.classList.remove('border-[3px]', 'border-primary');
  });

  // Select the clicked option
  selectedDiv.classList.add('border-[3px]', 'border-primary');

  // Set the corresponding radio input as checked
  const input = selectedDiv.querySelector('input[type="radio"]');
  input.checked = true;
}

// ============================================
// Quiz, rating, feedback
// ============================================

// Sample questions JSON
const questions = [
  {
    id: 1,
    questionNo: 1,
    question: "What does 3D design mean?",
    options: [
      { emojiImg: "😉", emojiName: "Clear" },
      { emojiImg: "😇", emojiName: "Good" },
      { emojiImg: "😐", emojiName: "Average" },
      { emojiImg: "😞", emojiName: "Bad" },
      { emojiImg: "😡", emojiName: "Very Bad" }
    ]
  },
  {
    id: 2,
    questionNo: 2,
    question: "How do you rate the teacher's explanation?",
    options: [
      { emojiImg: "😊", emojiName: "Excellent" },
      { emojiImg: "🙂", emojiName: "Good" },
      { emojiImg: "😐", emojiName: "Average" },
      { emojiImg: "😕", emojiName: "Poor" },
      { emojiImg: "😡", emojiName: "Very Poor" }
    ]
  },
  // Add more questions here...
];

let currentQuestion = 0;
let answers = [];
let rating = 0;

// Initialize quiz
function initQuiz() {
  renderQuestion();
  updateProgressBar();
}

function renderQuestion() {
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML = ""; // Clear the container

  const question = questions[currentQuestion];

  // Create the main question container
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question", "question-active");

  // Create the question number paragraph
  const questionNumberP = document.createElement("p");
  questionNumberP.innerHTML = `Question <span>${question.questionNo}</span>`;
  questionDiv.appendChild(questionNumberP);

  // Create the question text paragraph
  const questionText = document.createElement("p");
  questionText.classList.add("font-semibold", "text-lg");
  questionText.innerText = question.question;
  questionDiv.appendChild(questionText);

  // Create the options container
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add(
    "flex", "lg:flex-row", "flex-col", 
    "w-full", "justify-between", "gap-3", "pt-3"
  );

  question.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add(
      "std-review-radio-option", // Specific class for styling
      "p-5", "bg-[#f7f7f7]", "w-full", "min-h-[20%]", 
      "flex", "flex-col", "justify-center", "items-center", 
      "gap-2", "rounded-2xl", "cursor-pointer", 
      "border-[3px]", "border-transparent"
    );
    optionDiv.dataset.option = option.emojiName;
    optionDiv.onclick = () => selectOption(optionDiv, `question_${question.id}`);

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question_${question.id}`;
    radio.value = option.emojiName;
    radio.classList.add("hidden");

    const emojiSpan = document.createElement("p");
    emojiSpan.innerText = option.emojiImg;
    emojiSpan.style.fontSize = "2rem";

    const label = document.createElement("label");
    label.classList.add("font-medium");
    label.innerText = option.emojiName;

    optionDiv.appendChild(radio);
    optionDiv.appendChild(emojiSpan);
    optionDiv.appendChild(label);

    optionsContainer.appendChild(optionDiv);
  });

  questionDiv.appendChild(optionsContainer);
  questionContainer.appendChild(questionDiv);
}

function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question by setting border to transparent
  const allOptions = selectedDiv.parentNode.querySelectorAll(".std-review-radio-option");
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

function selectOption(selectedDiv, questionName) {
  // Deselect all options for the current question by setting border to transparent
  const allOptions = selectedDiv.parentNode.querySelectorAll("div[data-option]");
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


// Update the progress bar
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const progressPercent = ((currentQuestion + 1) / (questions.length + 1)) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// Handle Close button click
stdReviewCloseBtn.addEventListener('click', () => {
  studentReviewPopup.classList.add('hidden');
});

// Handle Next button click
document.getElementById("nextBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector(
    `input[name="question_${questions[currentQuestion].id}"]:checked`
  );
  if (!selectedOption) {
    alert("Please select an option before continuing.");
    return;
  }

  answers[currentQuestion] = selectedOption.value;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgressBar();
    document.getElementById("prevBtn").disabled = false;
  } else if (currentQuestion === questions.length - 1) {
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("ratingContainer").style.display = "block";
    updateProgressBar();
  }
});

// Handle Previous button click
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    updateProgressBar();
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";
  }

  if (currentQuestion === 0) {
    document.getElementById("prevBtn").disabled = true;
  }
});

// Handle Star Rating click
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function () {
    rating = this.getAttribute('data-value');
    updateStarRating(rating);
  });
});

// Update Star Rating UI
function updateStarRating(rating) {
  document.querySelectorAll('.star').forEach(star => {
    const value = star.getAttribute('data-value');
    if (value <= rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}


// Handle Submit Final button click
document.getElementById("submitFinalBtn").addEventListener("click", () => {
  const comment = document.getElementById("comment").value;

  studentReviewPopup.classList.add('hidden')
  studentReviewPopup.classList.remove('flex')
  studentReviewPopup.classList.remove('fixed')

  console.log(unitCompletionPopup.classList)

  unitCompletionPopup.classList.remove('hidden')
  // unitCompletionPopup.classList.add('fixed')

  const finalData = {
    answers,
    rating,
    comment
  };

  console.log("Final Submission:", finalData);

  // Reset Quiz
  // resetQuiz();
});

// Reset the quiz after submission
function resetQuiz() {
  currentQuestion = 0;
  answers = [];
  rating = 0;
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("ratingContainer").style.display = "none";
  renderQuestion();
  updateStarRating(0);
  document.getElementById("prevBtn").disabled = true;
  updateProgressBar();
}

// Initialize the quiz on page load
initQuiz();


// ============================================
// Overivew, Comments, Downloads - Tabs
// ============================================

document.querySelectorAll('.course-view-tab').forEach(tab => {
  tab.addEventListener('click', function () {

    // Remove tab-active class from all tabs
    document.querySelectorAll('.course-view-tab').forEach(t => t.classList.remove('tab-active'));

    // Add tab-active class to the clicked tab
    this.classList.add('tab-active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    // Show the corresponding tab content
    const tabContent = document.getElementById(this.getAttribute('data-tab'));
    tabContent.style.display = 'block';
  });
});

// ====================================
// Comment section 
// ====================================

function formatTime(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const timeDifference = now - postTime;

  const msInDay = 24 * 60 * 60 * 1000;

  if (timeDifference < msInDay && now.getDate() === postTime.getDate()) {
    return `Today ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 2 && now.getDate() !== postTime.getDate()) {
    return `Yesterday ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 7) {
    const daysAgo = Math.floor(timeDifference / msInDay);
    return `${daysAgo} days ago ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return postTime.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) + ` ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

document.getElementById('studentCmtPostBtn').addEventListener('click', function () {
  const textValue = document.getElementById('studentComment').value;
  const timestamp = Date.now(); // Get the current timestamp in milliseconds
  const formattedTime = formatTime(timestamp);

  if (textValue.trim() !== "") {
    const commentSection = document.getElementById('commentSection');

    // Create the comment div
    const commentDiv = document.createElement('div');
    commentDiv.className = 'flex mt-7';

    // User profile image
    const userProfileImg = document.createElement('img');
    userProfileImg.className = 'w-10 h-10 rounded-full border-2 border-primary';
    userProfileImg.src = 'assets/img/user.png';
    userProfileImg.alt = 'user profile';

    // Create comment content
    const commentContentDiv = document.createElement('div');
    commentContentDiv.className = 'pl-3 flex gap-3 w-full justify-between';

    // Comment text container
    const textContainer = document.createElement('div');
    const nameAndTimeDiv = document.createElement('div');
    nameAndTimeDiv.className = 'flex gap-1 items-center';

    const userName = document.createElement('p');
    userName.className = 'font-semibold text-base';
    userName.textContent = 'Faisal';

    const timeSpan = document.createElement('span');
    timeSpan.textContent = formattedTime;

    const timeText = document.createElement('p');
    timeText.className = 'text-black/50 underline text-sm';
    timeText.innerHTML = `at ${timeSpan.outerHTML}`;

    nameAndTimeDiv.appendChild(userName);
    nameAndTimeDiv.appendChild(timeText);

    const commentParagraph = document.createElement('p');
    commentParagraph.className = 'max-w-[85%]';
    commentParagraph.textContent = textValue;

    textContainer.appendChild(nameAndTimeDiv);
    textContainer.appendChild(commentParagraph);

    // Time of posting
    const timePosted = document.createElement('p');
    timePosted.className = 'min-w-fit';
    timePosted.textContent = formattedTime;

    commentContentDiv.appendChild(textContainer);
    commentContentDiv.appendChild(timePosted);

    // Assemble comment section
    commentDiv.appendChild(userProfileImg);
    commentDiv.appendChild(commentContentDiv);

    // Prepend the new comment to the comment section
    commentSection.insertBefore(commentDiv, commentSection.firstChild);

    // Clear the textarea after posting
    document.getElementById('studentComment').value = '';
  }
});

// ====================================
// Timeline details
// ====================================

const timelineBadgeBtn = document.querySelector('.timeline-badge-btn')
const timelineWindow = document.getElementById('timeline-window');
const timelineInsideBtn = document.getElementById("timeline-inside-btn")

document.querySelector('.timeline-badge-btn').addEventListener('click', function () {

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');
})

document.getElementById('timeline-inside-btn').addEventListener('click', function () {



  const accordion = document.querySelector('.accordion');

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');

});

// ====================================
// Slider details
// ====================================

document.addEventListener('DOMContentLoaded', function () {

  // Initialize Swiper
  var swiper = new Swiper(".courseSlide", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});