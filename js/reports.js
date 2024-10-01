// Tab Elements
const studentTab = document.getElementById('studentTab');
const quizTab = document.getElementById('quizTab');
const tabContent = document.getElementById('tabContent');

// Download PDF Button
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// JSON Data for Filters
const filterData = {
  classes: ["Class 1", "Class 2", "Class 3", "Class 4"],
  grades: ["Grade A", "Grade B", "Grade C", "Grade D"]
};

// Fill Dropdowns with Data
function populateDropdowns() {
  const classDropdown = document.getElementById('classDropdown');
  const gradeDropdown = document.getElementById('gradeDropdown');

  // Clear current options
  classDropdown.innerHTML = '';
  gradeDropdown.innerHTML = '';

  // Add Class Options
  filterData.classes.forEach(classOption => {
    const option = document.createElement('option');
    option.value = classOption;
    option.textContent = classOption;
    classDropdown.appendChild(option);
  });

  // Add Grade Options
  filterData.grades.forEach(gradeOption => {
    const option = document.createElement('option');
    option.value = gradeOption;
    option.textContent = gradeOption;
    gradeDropdown.appendChild(option);
  });
}

// Initialize Dropdowns
populateDropdowns();

// Switch Tab Functionality
studentTab.addEventListener('click', () => {
  studentTab.classList.add('text-primary', 'border-primary');
  quizTab.classList.remove('text-primary', 'border-primary');
  quizTab.classList.add('text-gray-500');
});

quizTab.addEventListener('click', () => {
  quizTab.classList.add('text-primary', 'border-primary');
  studentTab.classList.remove('text-primary', 'border-primary');
  studentTab.classList.add('text-gray-500');
});

// Download PDF Functionality
downloadPdfBtn.addEventListener('click', () => {
  const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // URL of test PDF
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'test.pdf'; // Set the filename
  link.click();
});
