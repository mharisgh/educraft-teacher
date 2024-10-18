// Your JSON data
const data = {
  highFlyers: [
    { id: 1, studentName: "Sameer Nawas", studentClass: "4A", noOfCourses: 4, educoins: 30 },
    { id: 2, studentName: "Ayesha Kareem", studentClass: "4A", noOfCourses: 3, educoins: 28 },
    { id: 3, studentName: "Shemin Shah", studentClass: "4B", noOfCourses: 3, educoins: 32 },
    { id: 4, studentName: "Faizan Ahmed", studentClass: "4C", noOfCourses: 2, educoins: 26 }
  ],
  mediumFlyers: [
    { id: 1, studentName: "Rahul Menon", studentClass: "5A", noOfCourses: 2, educoins: 20 },
    { id: 2, studentName: "Sara Khan", studentClass: "5A", noOfCourses: 3, educoins: 19 },
    { id: 3, studentName: "Ravi Varma", studentClass: "5B", noOfCourses: 2, educoins: 18 },
    { id: 4, studentName: "Priya Kapoor", studentClass: "5C", noOfCourses: 2, educoins: 17 },
    { id: 5, studentName: "Priya Kapoor", studentClass: "5C", noOfCourses: 2, educoins: 17 },
    { id: 6, studentName: "Priya Kapoor", studentClass: "5C", noOfCourses: 2, educoins: 17 }

  ],
  lowFlyers: [
    { id: 1, studentName: "John Smith", studentClass: "6A", noOfCourses: 1, educoins: 10 },
    { id: 2, studentName: "Linda Rose", studentClass: "6B", noOfCourses: 1, educoins: 12 },
    { id: 3, studentName: "David Lee", studentClass: "6C", noOfCourses: 1, educoins: 11 },
    { id: 4, studentName: "Emily Davis", studentClass: "6D", noOfCourses: 1, educoins: 9 }
  ]
};

// Function to update flyers section
function updateFlyersSection(sectionId, countId, listId, flyers) {
  const sectionList = document.getElementById(listId);
  const sectionCount = document.getElementById(countId);

  // Update the student count
  sectionCount.textContent = flyers.length;

  // Loop through the flyers array and create the HTML
  flyers.forEach((student) => {
    // Limit studentName to 13 characters
    let truncatedName = student.studentName;
    if (truncatedName.length > 13) {
      truncatedName = truncatedName.substring(0, 13) + "...";
    }

    const studentHTML = `
      <div class="h-[2px] w-full bg-gradient-to-r from-black/5 via-black/10 to-black/5"></div>

      <div class="grid grid-cols-3">
        <!-- First grid column with min-width -->
        <div class="flex min-w-[180px]">
          <img class="w-10 h-10" src="/assets/img/general/user.png" alt="student">
          <div>
            <p class="font-medium">${truncatedName}</p>
            <p class="text-xs">Grade ${student.studentClass}</p>
          </div>
        </div>

        <!-- Second grid column -->
        <p class="justify-self-end text-semibold text-primaryDark">${student.noOfCourses}</p>

        <!-- Third grid column -->
        <p class="justify-self-center text-semibold text-primaryDark">${student.educoins}</p>
      </div>
    `;

    sectionList.innerHTML += studentHTML;
  });
}

// Update all sections
updateFlyersSection("highFlyersSection", "highFlyerCount", "highFlyersList", data.highFlyers);
updateFlyersSection("mediumFlyersSection", "mediumFlyerCount", "mediumFlyersList", data.mediumFlyers);
updateFlyersSection("lowFlyersSection", "lowFlyerCount", "lowFlyersList", data.lowFlyers);



// References to DOM elements
const popupOverlay = document.getElementById('popupOverlay');
const addCourseButton = document.getElementById('addCourseButton');
const closePopupButton = document.getElementById('closePopupButton');
const cancelButton = document.getElementById('cancelButton');
const createButton = document.getElementById('createButton');

const courseTitle = document.getElementById('courseTitle');
const courseCategory = document.getElementById('courseCategory');
const courseGrade = document.getElementById('courseGrade');
const skillDropdown = document.getElementById('skillDropdown');
const addSkillButton = document.getElementById('addSkillButton');
const skillTags = document.getElementById('skillTags');
const courseOverview = document.getElementById('courseOverview');
const thumbnailInput = document.getElementById('thumbnailInput');
const thumbnailPreview = document.getElementById('thumbnailPreview');

const previewTitle = document.getElementById('previewTitle');
const previewCategory = document.getElementById('previewCategory');
const previewGrade = document.getElementById('previewGrade');
const previewSkills = document.getElementById('previewSkills');

let selectedSkills = [];

// Event listeners to open and close popup
addCourseButton.addEventListener('click', () => {
  popupOverlay.classList.remove('hidden');
  popupOverlay.classList.add('flex');
});

closePopupButton.addEventListener('click', closePopup);
cancelButton.addEventListener('click', closePopup);

function closePopup() {
  popupOverlay.classList.add('hidden');
  resetForm();
}

// Add skill and display as tags
addSkillButton.addEventListener('click', (e) => {
  e.preventDefault();
  const selectedSkill = skillDropdown.value;
  if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
    selectedSkills.push(selectedSkill);
    updateSkillTags();
  }
});

function updateSkillTags() {
  skillTags.innerHTML = '';
  selectedSkills.forEach(skill => {
    const skillTag = document.createElement('div');
    skillTag.classList.add('bg-[#fcf7f0]', 'px-2', 'py-1', 'rounded-lg', 'flex', 'items-center', 'gap-2');

    skillTag.innerHTML = `
      <span>${skill}</span>
      <button class="text-red-500 hover:text-red-700" onclick="removeSkill('${skill}')">x</button>
    `;
    skillTags.appendChild(skillTag);
  });
}

function removeSkill(skill) {
  selectedSkills = selectedSkills.filter(s => s !== skill);
  updateSkillTags();
}

// Live preview update
courseTitle.addEventListener('input', () => {
  previewTitle.textContent = `Title: ${courseTitle.value}`;
});

courseCategory.addEventListener('change', () => {
  previewCategory.textContent = `Category: ${courseCategory.value}`;
});
courseGrade.addEventListener('change', () => {
  previewGrade.textContent = `Grade: ${courseGrade.value}`;
});
addSkillButton.addEventListener('click', () => {
  previewSkills.textContent = `Skills: ${selectedSkills.join(', ')}`;
});

// Thumbnail upload preview
thumbnailInput.addEventListener('change', () => {
  const file = thumbnailInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      thumbnailPreview.src = e.target.result;
      thumbnailPreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }
});

// Create button to gather form data
createButton.addEventListener('click', () => {
  const courseData = {
    title: courseTitle.value,
    category: courseCategory.value,
    grade: courseGrade.value,
    skills: selectedSkills,
    overview: courseOverview.value,
    thumbnail: thumbnailPreview.src,
  };
  console.log(courseData); // Send this JSON to backend

  closePopup();
});

// Reset form
function resetForm() {
  courseTitle.value = '';
  courseCategory.value = '';
  courseGrade.value = '';
  selectedSkills = [];
  updateSkillTags();
  courseOverview.value = '';
  thumbnailInput.value = '';
  thumbnailPreview.classList.add('hidden');
  previewTitle.textContent = '';
  previewCategory.textContent = '';
  previewGrade.textContent = '';
  previewSkills.textContent = '';
}
