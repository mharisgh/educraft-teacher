const quizData = [
  { quizName: "Python Basics", questionCount: 8, eduCoins: 8 },
  { quizName: "JavaScript Essentials", questionCount: 10, eduCoins: 10 },
  { quizName: "HTML & CSS", questionCount: 5, eduCoins: 5 },
  { quizName: "React Basics", questionCount: 6, eduCoins: 6 },
  { quizName: "Tailwind Mastery", questionCount: 12, eduCoins: 12 },
  { quizName: "Data Structures", questionCount: 7, eduCoins: 7 },
];

const courseData = [
  {
    courseName: "Classroom Management", skills: 3, progress: 23,
    image: "assets/img/course-thumbnail/modern.jpg"
  },
  {
    courseName: "Behavioral Psychology", skills: 4, progress: 50,
    image: "assets/img/course-thumbnail/modern.jpg"
  },
  {
    courseName: "Educational Technology", skills: 2, progress: 75,
    image: "assets/img/course-thumbnail/modern.jpg"
  },
  {
    courseName: "Lesson Planning 101", skills: 5, progress: 40,
    image: "assets/img/course-thumbnail/modern.jpg"
  },
  {
    courseName: "AI in Education", skills: 6, progress: 65,
    image: "assets/img/course-thumbnail/modern.jpg"
  },
  {
    courseName: "Student Engagement", skills: 3, progress: 90,
    image: "assets/img/course-thumbnail/modern.jpg"
  }
];



const quizContainer = document.querySelector("#quiz-container");
const courseContainer = document.querySelector("#course-container");

// Function to render quiz scores dynamically
function renderQuizzes(data) {
  quizContainer.innerHTML = ""; // Clear any existing content
  data.forEach((quiz) => {
    const quizItem = `
      <div class="flex justify-between items-center bg-primaryLight py-2 px-3 border border-black/10 rounded-lg">
        <div>
          <p class="font-medium text-[16px]">${quiz.quizName}</p>
          <p class="mt-1">No of Questions: <span class="font-medium">${quiz.questionCount}</span></p>
        </div>
        <div class="flex items-center gap-1">
          <p>Educoins</p>
          <img class="w-8" src="assets/img/general/educoin-sm.png" alt="educoin">
          <p class="font-medium text-lg">${quiz.eduCoins}</p>
        </div>
      </div>
    `;
    quizContainer.insertAdjacentHTML("beforeend", quizItem);
  });
}

// Function to render courses dynamically
function renderCourses(data) {
  courseContainer.innerHTML = ""; // Clear any existing content
  data.forEach((course) => {
    const courseItem = `
      <div class="bg-white border border-black/10 p-2 rounded-2xl flex flex-col justify-between lg:flex-row gap-4">
        <img class="w-full lg:max-w-[80px] max-h-[80px] object-cover rounded-lg"
             src="${course.image}" alt="Courses">
        <div class="w-full flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div class="flex flex-col justify-between h-full w-full">
            <p class="text-md font-semibold">${course.courseName}</p>
            <div class="flex gap-6 items-center">
              <div class="flex gap-2">
                <img class="min-w-[16px]" src="assets/icons/idea.svg" alt="lesson">
                <span class="font-semibold">${course.skills}</span>
                <p class="text-black/60">Skills</p>
              </div>
            </div>
            <div class="flex gap-4 items-center ">
              <div class="relative h-[8px] w-full rounded-xl overflow-hidden">
                <div class="absolute z-[10] rounded-xl h-full" style="width: ${course.progress}%;">
                  <div class="bg-gradient-to-r from-[#FD9512] to-[#FFC770] h-full"></div>
                </div>
                <div class="absolute h-full w-full z-[2] bg-gray-100 rounded-xl"></div>
              </div>
              <span class="font-semibold">${course.progress}%</span>
            </div>
          </div>
        </div>
      </div>
    `;
    courseContainer.insertAdjacentHTML("beforeend", courseItem);
  });
}

// Load initial data
renderQuizzes(quizData);
renderCourses(courseData);
