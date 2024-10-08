// Simulating the JSON data
const questions = [
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "Multiple Choice",
    "educoin": 2,
    "questionTitle": "Which programming languages can you use to program a Microbit?",
    "answers": [
      { "text": "abc", "isCorrect": false },
      { "text": "def", "isCorrect": true },
      { "text": "ghi", "isCorrect": false },
      { "text": "jkl", "isCorrect": false }
    ]
  },
  {
    "questionType": "True or False",
    "educoin": 3,
    "questionTitle": "JavaScript is used for frontend development only.",
    "answers": [
      { "text": "True", "isCorrect": false },
      { "text": "False", "isCorrect": true }
    ]
  }
];

const container = document.getElementById('questionContainer');

// Function to create question HTML from JSON
function renderQuestions() {
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('p-4', 'bg-white', 'shadow', 'rounded-lg', 'space-y-3', 'draggable-item');

    // Create the header with question type and educoins
    questionDiv.innerHTML = `
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
        <div class="handle cursor-move">
        <img class="w-[18px]" src="assets/icons/draggable.svg" alt="drag">
        </div>
          <img class="w-[24px] h-[24px]" src="assets/img/classroom/mcq.png" alt="drag">
          <div class="font-semibold">${question.questionType}</div>
          <div class="pl-10 flex gap-1">
                                <img class="w-6 " src="assets/img/general/educoin-sm.png" alt="educoin">
          Educoins
          <span class="font-semibold">${question.educoin}
          </span>
          </div>
        </div>
        <div class="space-x-2 flex">
                              <button id="questionDuplicateBtn"
                      class="bg-white border border-black/10 rounded-lg px-3 py-2 flex gap-1 items-center hover:border-black/30">
                      <span><img class="w-[16px] fill-[#9c663b]" src="assets/icons/duplicate-brown.svg" alt="edit"></span>
                      Duplicate
                    </button>
                              <button id="questionEditBtn"
                      class="bg-white border border-black/10 rounded-lg px-3 py-2 flex gap-1 items-center hover:border-black/30">
                      <span><img class="w-[16px]"
                      src="assets/icons/edit.svg" alt="edit"></span>
                      Edit
                    </button>
                              <button id="questionDeleteBtn"
                      class="bg-white border border-black/10 rounded-lg px-3 py-2 flex gap-1 items-center hover:border-black/30 ">
                      <span><img class="w-full h-full object-fit" src="assets/icons/delete.svg" alt="edit"></span>
                    </button>
        </div>
      </div>
      <div class="font-semibold">${question.questionTitle}</div>
    `;

    // Create answer section
    const answersDiv = document.createElement('div');
    answersDiv.classList.add('flex', 'gap-4');

    question.answers.forEach(answer => {
      const answerDiv = document.createElement('div');
      answerDiv.classList.add('flex', 'gap-1', 'items-center'); // Ensure proper layout for the icon and text

      // If the answer is correct, add the check icon
      if (answer.isCorrect) {
        const checkIcon = document.createElement('img');
        checkIcon.src = 'assets/icons/check.svg'; // Add the path to your check icon
        checkIcon.alt = 'right-answer';
        checkIcon.classList.add('w-[22px]'); // Add your desired size and styles for the icon

        // Append the icon to the answerDiv
        answerDiv.appendChild(checkIcon);

        // Also add a special style to the correct answer text
        answerDiv.classList.add('text-primary', 'font-bold');
      }

      // Append the answer text
      const answerText = document.createElement('p');
      answerText.textContent = answer.text;
      answerDiv.appendChild(answerText);

      // Append the answerDiv to the answers container
      answersDiv.appendChild(answerDiv);

    });

    // Append the answersDiv to the questionDiv
    questionDiv.appendChild(answersDiv);

    // Append to container
    container.appendChild(questionDiv);
  });
}

// Render questions on page load
renderQuestions();

// Make the container sortable using SortableJS
var sortable = new Sortable(container, {
  animation: 150,  // Adds smooth dragging animation
  handle: '.draggable-item',  // Specifies the draggable area (entire question block)
  onEnd: function (evt) {
    console.log(`Item moved from ${evt.oldIndex} to ${evt.newIndex}`);
  }
});


// Select all options
  const options = document.querySelectorAll('.radioOption');

  options.forEach(option => {
    option.addEventListener('click', () => {
      // Reset all borders
      options.forEach(opt => {
        opt.classList.remove('border-[#9c663b]');
        opt.classList.add('border-black/10');
        opt.querySelector('input').checked = false;
      });
      
      // Apply selected styles
      option.classList.add('border-[#9c663b]');
      option.classList.remove('border-black/10');
      option.querySelector('input').checked = true;
    });
  });