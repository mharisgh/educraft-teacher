// Select elements
const tabButtons = document.querySelectorAll('.post-announcement-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const closeCreateQuizButtons = document.querySelectorAll('.close-create-class-popup-btn');
const closeAddMaterialButtons = document.querySelectorAll('.close-add-material-popup-btn');
const createQuizBtn = document.getElementById('createQuizBtn');
const addMaterialBtn = document.getElementById('addMaterialBtn');
const createQuizPopup = document.getElementById('createQuizPopup');
const addMaterialPopup = document.getElementById('addMaterialPopup');


// Function to switch tabs and toggle buttons
function switchTab(selectedTab) {
  // Reset all buttons and hide all content
  tabButtons.forEach((btn) => {
    btn.classList.remove('active', 'bg-primary', 'text-white');
    btn.classList.add('bg-white', 'text-black');
  });
  tabContents.forEach((content) => content.classList.add('hidden'));

  // Activate selected tab button and show its content
  selectedTab.classList.add('active', 'bg-primary', 'text-white');
  selectedTab.classList.remove('bg-white', 'text-black');
  const tabId = selectedTab.getAttribute('data-tab');
  document.getElementById(tabId).classList.remove('hidden');

  // Show/hide buttons based on active tab
  if (tabId === 'quiz-tab') {
    createQuizBtn.classList.remove('hidden');
    addMaterialBtn.classList.add('hidden');
  } else {
    addMaterialBtn.classList.remove('hidden');
    createQuizBtn.classList.add('hidden');
  }
}

// Add event listeners to each tab button
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn));
});

const materials = [
  { file: "file.pdf", fileName: "Data Structures", fileSize: "3 MB", downloadLink: "https://abc.com/file.pdf" },
  { file: "file2.pdf", fileName: "Operating Systems", fileSize: "5 MB", downloadLink: "https://abc.com/file2.pdf" },
  { file: "file3.pdf", fileName: "Database Systems", fileSize: "4 MB", downloadLink: "https://abc.com/file3.pdf" },
  { file: "file4.pdf", fileName: "Algorithms", fileSize: "6 MB", downloadLink: "https://abc.com/file4.pdf" },
];

const quizzes = [
  {
    quizName: "AI Fundamental Quiz",
    noOfQuestions: 4,
    eduCoins: 8,
    students: [
      { id: 1, name: "Basheer", profilePicture: "/img/student1.jpg" },
      { id: 2, name: "Muneer", profilePicture: "/img/student2.jpg" },
      { id: 3, name: "Hamza", profilePicture: "/img/student3.jpg" },
    ],
    QuizStatus: "Draft",
    quizCompletionProgress: 0,  // New key for quiz completion progress
    quizLink: "/quiz-question-creation.html",    // Link to the quiz
  },
  {
    quizName: "Data Structures Quiz",
    noOfQuestions: 5,
    eduCoins: 10,
    students: [
      { id: 4, name: "Ali", profilePicture: "/img/student4.jpg" },
      { id: 5, name: "Fatima", profilePicture: "/img/student5.jpg" },
    ],
    QuizStatus: "Published",
    quizCompletionProgress: 40,
    quizLink: "/quiz02.html",      // Link to the quiz
  },
  {
    quizName: "Web Development Quiz",
    noOfQuestions: 6,
    eduCoins: 12,
    students: [
      { id: 6, name: "Zara", profilePicture: "/img/student6.jpg" },
      { id: 7, name: "Omar", profilePicture: "/img/student7.jpg" },
      { id: 8, name: "Sara", profilePicture: "/img/student8.jpg" },
    ],
    QuizStatus: "Draft",
    quizCompletionProgress: 100,
    quizLink: "/quiz03.html",      // Link to the quiz
  },
  {
    quizName: "Data Structures Quiz",
    noOfQuestions: 5,
    eduCoins: 10,
    students: [
      { id: 4, name: "Ali", profilePicture: "/img/student4.jpg" },
      { id: 5, name: "Fatima", profilePicture: "/img/student5.jpg" },
    ],
    QuizStatus: "Published",
    quizCompletionProgress: 40,
    quizLink: "/quiz02.html",      // Link to the quiz
  },
  {
    quizName: "Data Structures Quiz",
    noOfQuestions: 5,
    eduCoins: 10,
    students: [
      { id: 4, name: "Ali", profilePicture: "/img/student4.jpg" },
      { id: 5, name: "Fatima", profilePicture: "/img/student5.jpg" },
    ],
    QuizStatus: "Published",
    quizCompletionProgress: 40,
    quizLink: "/quiz02.html",      // Link to the quiz
  }
];

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  }
  return str;
}

function displayMaterials() {
  const container = document.getElementById("classroomClassContents");

  materials.forEach((material) => {
    const materialElement = document.createElement("a");
    materialElement.className = "bg-white border border-black/20 p-4 rounded-xl relative lg:min-w-[194px] group hover:border-black/40";
    materialElement.href = material.downloadLink;
    materialElement.target = "_blank";

    materialElement.innerHTML = `
      <img class="w-8 mb-2" src="/assets/img/classroom/material-icon.png" alt="material">
      <p class="text-black/60 text-xs">${material.fileSize}</p>  
      <p class="font-medium">${truncateString(material.fileName, 23)}</p>
      <a href="${material.downloadLink}" target="_blank" class="absolute top-2 right-2 group-hover:visible invisible">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4">
          <path class="fill-[#bf4b00]" d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z">
          </path>
        </svg>
      </a>
    `;

    container.appendChild(materialElement);
  });
}

function displayQuizzes() {
  const container = document.getElementById("classroomClassQuizes");

  quizzes.forEach((quiz) => {
    const quizElement = document.createElement("a");
    quizElement.className = "bg-white border border-black/20 p-4 rounded-xl lg:min-w-[260px] w-full group hover:border-black/40";
    quizElement.href = quiz.quizLink;  // Set the link for the quiz
    // quizElement.target = "_blank";      // Open link in a new tab

    let studentList = quiz.students
      .map((student) => `<img src="${student.profilePicture}" alt="${student.name}" title="${student.name}" />`)
      .join("");

    let statusBgColor = "";  // Initialize variable for status background color
    let statusTxtColor = "";

    if (quiz.QuizStatus === "Draft") {
      statusBgColor = "bg-gray-200";  // Not Started - gray
      statusTxtColor = "text-[black]"
    } else if (quiz.QuizStatus === "Published") {
      statusBgColor = "bg-[#f8740b]";  // Completed - orange
      statusTxtColor = "text-[white]"
    }

    quizElement.innerHTML = `
      <div class="flex justify-between">
        <p class="font-medium">${quiz.quizName}</p>
        <img class="w-5 invisible group-hover:visible opacity-50" src="/assets/icons/arrow-right.svg" alt="next">
      </div>
      <p class="text-black/70 mt-2">No of Questions: <span class="font-semibold text-black">${quiz.noOfQuestions}</span></p>
      
      <div class="flex items-center my-3">
        <img class="w-6" src="assets/img/general/educoin-sm.png" alt="">
        <p class="text-black/80">Educoins: <span class="font-semibold text-black">${quiz.eduCoins}</span></p>
      </div>

      <div>Participation</div>
      <div class="flex justify-between items-center ">
        <div class="w-[82%] bg-gray-200 rounded-full h-2 ">
          <div class="bg-gradient-to-r from-[#ffc66e] to-[#fd9512] h-2 rounded-full" style="width: ${quiz.quizCompletionProgress}%;"></div>
        </div>
        <p class="text-sm  font-medium">${quiz.quizCompletionProgress}%</p>
      </div>

      <div class="flex justify-between mt-2">
        <div><span class="font-semibold">${quiz.students.length} </span>Total Students</div>
        <div class="px-2 py-1 ${statusTxtColor} ${statusBgColor} rounded-lg text-xs font-medium">${quiz.QuizStatus}</div>
      </div>
    `;

    container.appendChild(quizElement);
  });
}

// Function calls
displayMaterials();
displayQuizzes();



// Select the container and all radio options
const questionTypeContainer = document.getElementById('questionTypeContainer');
const radioOptions = document.querySelectorAll('.radioOption');

// Function to handle selection
function handleSelection(selectedOption) {
  // Remove selected class and border from all options
  radioOptions.forEach(option => {
    option.classList.remove('selected');
    option.classList.replace('border-[#9c663b]', 'border-black/5');
  });

  // Add selected class and border color to the clicked option
  selectedOption.classList.add('selected');
  selectedOption.classList.replace('border-black/5', 'border-[#9c663b]');
}

// Add click event listeners to each radio option
radioOptions.forEach(option => {
  option.addEventListener('click', () => {
    handleSelection(option);
    // Check the associated hidden input
    option.querySelector('input').checked = true;
  });
});

// Initialize Dropzone
Dropzone.autoDiscover = false;

const myDropzone = new Dropzone("#myDropzone", {
  maxFiles: 1,
  maxFilesize: 5, // 5MB limit
  acceptedFiles: ".pdf", // Only accept PDF files
  autoProcessQueue: false,
  previewsContainer: false, // Disable the Dropzone preview feature
  dictDefaultMessage: "", // Disable Dropzone's default message

  init: function () {
    const uploadText = document.getElementById("uploadText");

    // Ensure clicking the text triggers file upload dialog
    uploadText.addEventListener("click", () => {
      this.hiddenFileInput.click(); // Trigger Dropzone's hidden input
    });

    this.on("addedfile", function (file) {
      // Update the text to show the uploaded file name
      uploadText.textContent = `Uploaded: ${file.name}`;

      // Allow re-upload by clicking again
      this.on("click", () => {
        this.removeAllFiles();
        uploadText.textContent = "Click to upload or Drag & Drop here";
      });
    });

    this.on("error", function (file, message) {
      alert(message); // Display any error message (e.g., file size exceeded)
      this.removeFile(file); // Clear the invalid file
    });
  },
});

const togglePopup = (popup) => {
  popup.classList.toggle('hidden');
  popup.classList.toggle('flex');
};

// Toggle Quiz Popup
createQuizBtn.addEventListener('click', () => togglePopup(createQuizPopup));
closeCreateQuizButtons.forEach(btn => btn.addEventListener('click', () => togglePopup(createQuizPopup)));

// Toggle Material Popup
addMaterialBtn.addEventListener('click', () => togglePopup(addMaterialPopup));
closeAddMaterialButtons.forEach(btn => btn.addEventListener('click', () => togglePopup(addMaterialPopup)));



// Add studnet to quiz page

const studentListAddPopupContainer = document.getElementById('studentListAddPopupContainer');
const studentAddPopupBtn = document.getElementById('studentAddPopupBtn');
const closeAddStudentButtons = document.querySelectorAll('.close-add-student-popup-btn');

const togglePopups = (popup) => {
  popup.classList.toggle('hidden');
  popup.classList.toggle('flex');
  console.log(popup)
};

// Toggle Quiz Popup
studentAddPopupBtn.addEventListener('click', () => togglePopups(studentListAddPopupContainer));

closeAddStudentButtons.forEach(btn => btn.addEventListener('click', () => togglePopups(studentListAddPopupContainer)));
