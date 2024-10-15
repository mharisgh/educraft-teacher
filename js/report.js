// Select elements
const tabButtons = document.querySelectorAll('.reports-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

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
}

// Add event listeners to each tab button
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => switchTab(btn));
});









const tableBody = document.getElementById('tableBody');
let currentPage = 0;
const rowsPerPage = 10; // Number of rows to load per request

// Sample JSON data (replace this with your actual data fetching)
const sampleData = [
  {
    "studentName": "Alice Johnson",
    "Grade": "A",
    "email": "alice.johnson@example.com",
    "eduCoins": 150,
    "level": 3,
    "badgeName": "Gold",
    "courses": 3,
    "quizzes": 5
  },
  {
    "studentName": "Bob Smith",
    "Grade": "B",
    "email": "bob.smith@example.com",
    "eduCoins": 200,
    "level": 4,
    "badgeName": "Platinum",
    "courses": 5,
    "quizzes": 3
  },
  {
    "studentName": "Charlie Brown",
    "Grade": "A",
    "email": "charlie.brown@example.com",
    "eduCoins": 300,
    "level": 5,
    "badgeName": "Gold",
    "courses": 2,
    "quizzes": 6
  },
  {
    "studentName": "Diana Prince",
    "Grade": "C",
    "email": "diana.prince@example.com",
    "eduCoins": 100,
    "level": 2,
    "badgeName": "Silver",
    "courses": 4,
    "quizzes": 2
  },
  {
    "studentName": "Ethan Hunt",
    "Grade": "B",
    "email": "ethan.hunt@example.com",
    "eduCoins": 250,
    "level": 4,
    "badgeName": "Platinum",
    "courses": 5,
    "quizzes": 4
  },
  {
    "studentName": "Fiona Gallagher",
    "Grade": "A",
    "email": "fiona.gallagher@example.com",
    "eduCoins": 175,
    "level": 3,
    "badgeName": "Gold",
    "courses": 3,
    "quizzes": 5
  },
  {
    "studentName": "George Costanza",
    "Grade": "B",
    "email": "george.costanza@example.com",
    "eduCoins": 220,
    "level": 3,
    "badgeName": "Silver",
    "courses": 4,
    "quizzes": 3
  },
  {
    "studentName": "Hannah Montana",
    "Grade": "A",
    "email": "hannah.montana@example.com",
    "eduCoins": 300,
    "level": 5,
    "badgeName": "Gold",
    "courses": 6,
    "quizzes": 5
  },
  {
    "studentName": "Ian Malcolm",
    "Grade": "B",
    "email": "ian.malcolm@example.com",
    "eduCoins": 180,
    "level": 4,
    "badgeName": "Silver",
    "courses": 3,
    "quizzes": 4
  },
  {
    "studentName": "Julia Roberts",
    "Grade": "A",
    "email": "julia.roberts@example.com",
    "eduCoins": 210,
    "level": 5,
    "badgeName": "Gold",
    "courses": 5,
    "quizzes": 6
  }
];


// Function to generate and append rows
const loadMoreRows = () => {
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Check if there are more rows to load
  if (startIndex >= sampleData.length) return;

  // Load rows for the current page
  const dataToLoad = sampleData.slice(startIndex, endIndex);
  dataToLoad.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center pl-2 ';
    row.innerHTML = `
                    <div class="w-[20px] pl-2">
          <input type="checkbox" class="student-checkbox" />
        </div>
              <div class="w-1/5 flex gap-2 p-4 border-b border-gray-200 items-center">
               <img class="w-7 h-7 rounded-full object-cover" src="assets/img/general/user2.jpg" alt="pdf">
            <div>
            <p class="font-medium">${item.studentName}</p>
            <p class="text-black/40 text-xs">Grade <span class="text-primaryDark font-medium"> ${item.Grade}</span></p>
            </div>
            </div>

            <div class="w-1/5 p-4 border-b border-gray-200">${item.email}</div>

            <div class="w-1/5 p-4 border-b border-gray-200">${item.eduCoins}</div>
            
            <div class="w-1/5 p-4 border-b border-gray-200">Level ${item.level}<span class="font-medium"> ${item.badgeName}</span></div>
            
            <div class="w-1/5 p-4 border-b border-gray-200">Courses: <span class="font-medium">${item.courses}</span>, Quizzes: <span class="font-medium">${item.quizzes}</span></div>
        `;
    tableBody.appendChild(row);
  });
  currentPage++;
};

// Initial load
loadMoreRows();

// Infinite scroll listener
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreRows();
  }
}, {
  root: document.querySelector('.overflow-auto'), // Set the scrollable area as the root
  threshold: 1.0 // Trigger when the last row is fully visible
});

// Create a sentinel element at the end of the table to observe
const sentinel = document.createElement('div');
tableBody.appendChild(sentinel);
observer.observe(sentinel);




const sampleQuizData = [
  {
    "quizName": "Fundamentals 101",
    "questionCount": 10,
    "eduCoins": 50,
    "participation": "32 out of 70"
  },
  {
    "quizName": "AI Basics",
    "questionCount": 8,
    "eduCoins": 40,
    "participation": "25 out of 50"
  },
  {
    "quizName": "JavaScript Essentials",
    "questionCount": 12,
    "eduCoins": 60,
    "participation": "50 out of 100"
  },
  {
    "quizName": "Python for Beginners",
    "questionCount": 10,
    "eduCoins": 45,
    "participation": "30 out of 70"
  },
  {
    "quizName": "HTML & CSS Basics",
    "questionCount": 8,
    "eduCoins": 35,
    "participation": "20 out of 40"
  },
  {
    "quizName": "Data Structures",
    "questionCount": 15,
    "eduCoins": 75,
    "participation": "60 out of 80"
  },
  {
    "quizName": "Web Development",
    "questionCount": 11,
    "eduCoins": 55,
    "participation": "45 out of 90"
  },
  {
    "quizName": "Machine Learning 101",
    "questionCount": 9,
    "eduCoins": 50,
    "participation": "35 out of 60"
  },
  {
    "quizName": "Cloud Computing Basics",
    "questionCount": 7,
    "eduCoins": 30,
    "participation": "15 out of 30"
  },
  {
    "quizName": "Cybersecurity Essentials",
    "questionCount": 10,
    "eduCoins": 50,
    "participation": "40 out of 70"
  }
];

const quizTableBody = document.getElementById('quizTableBody');
let currentQuizPage = 0;
const quizRowsPerPage = 5; // Number of rows to load per request for quizzes

// Function to generate and append quiz rows
const loadMoreQuizRows = () => {
  const startIndex = currentQuizPage * quizRowsPerPage;
  const endIndex = startIndex + quizRowsPerPage;

  // Check if there are more rows to load
  if (startIndex >= sampleQuizData.length) return;

  // Load rows for the current page
  const quizDataToLoad = sampleQuizData.slice(startIndex, endIndex);
  quizDataToLoad.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center p-4 border-b  border-gray-200';
    row.innerHTML = `
      <div class="w-[20px] ">
        <input type="checkbox" class="quiz-checkbox" />
      </div>
      <div class="w-1/4">${item.quizName}</div>
      <div class="w-1/4">${item.questionCount}</div>
      <div class="w-1/4">${item.eduCoins}</div>
      <div class="w-1/4">${item.participation}</div>
    `;
    quizTableBody.appendChild(row);
  });
  currentQuizPage++;
};

// Initial load for quizzes
loadMoreQuizRows();

// Infinite scroll listener for quizzes
const quizObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreQuizRows();
  }
}, {
  root: document.querySelector('.overflow-auto'), // Set the scrollable area as the root
  threshold: 1.0 // Trigger when the last row is fully visible
});

// Create a sentinel element at the end of the quiz table to observe
const quizSentinel = document.createElement('div');
quizTableBody.appendChild(quizSentinel);
quizObserver.observe(quizSentinel);

// Select All Checkbox Functionality
document.getElementById('selectAll').addEventListener('change', function () {
  const checkboxes = document.querySelectorAll('.quiz-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = this.checked; // Check or uncheck all based on the "Select All" checkbox
  });
});
