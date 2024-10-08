

document.addEventListener('DOMContentLoaded', () => {
  let materials = [];
  let quizzes = [];

  // Sample data for materials and quizzes
  const sampleData = {
    materials: [
      { name: "Introduction to HTML", file: "html-intro.pdf" },
      { name: "CSS Basics", file: "css-basics.pdf" },
      { name: "JavaScript Fundamentals", file: "js-fundamentals.pdf" },
      { name: "React Overview", file: "react-overview.pdf" },
      { name: "UI/UX Principles", file: "ui-ux-principles.pdf" },
    ],
    quizzes: [
      { name: "HTML Quiz", type: "MCQ" },
      { name: "CSS Assessment", type: "True/False" },
      { name: "JavaScript Challenge", type: "Short Answer" },
      { name: "React Basics Quiz", type: "MCQ" },
      { name: "UI/UX Knowledge Test", type: "Open-Ended" },
    ],
  };

  // Load sample data into materials and quizzes arrays
  function loadSampleData() {
    materials = sampleData.materials;
    quizzes = sampleData.quizzes;
    updateMaterialsList();
    updateQuizzesList();
  }

  // Function to switch tabs
  function switchTab(tab) {
    if (tab === 'materials') {
      document.getElementById('materialsTab').classList.add('bg-gray-300');
      document.getElementById('quizzesTab').classList.remove('bg-gray-300');
      document.getElementById('materialsContent').classList.remove('hidden');
      document.getElementById('quizzesContent').classList.add('hidden');
      document.getElementById('materialQuizAddBtn').innerText = 'Add Material';
    } else {
      document.getElementById('quizzesTab').classList.add('bg-gray-300');
      document.getElementById('materialsTab').classList.remove('bg-gray-300');
      document.getElementById('quizzesContent').classList.remove('hidden');
      document.getElementById('materialsContent').classList.add('hidden');
      document.getElementById('materialQuizAddBtn').innerText = 'Add Quiz';
    }
    currentTab = tab;
  }

  // Add event listeners for tab clicks
  document.getElementById('materialsTab').addEventListener('click', () => switchTab('materials'));
  document.getElementById('quizzesTab').addEventListener('click', () => switchTab('quizzes'));

  // Show the modal for adding material or quiz
  document.getElementById('materialQuizAddBtn').addEventListener('click', () => {
    if (currentTab === 'materials') {
      document.getElementById('materialModal').classList.remove('hidden');
    } else {
      document.getElementById('quizModal').classList.remove('hidden');
    }
  });

  // Close material modal
  document.getElementById('closeMaterialModal').addEventListener('click', () => {
    document.getElementById('materialModal').classList.add('hidden');
    document.getElementById('materialName').value = '';
    document.getElementById('materialFile').value = '';
  });

  // Close quiz modal
  document.getElementById('closeQuizModal').addEventListener('click', () => {
    document.getElementById('quizModal').classList.add('hidden');
    document.getElementById('quizName').value = '';
    document.querySelector('input[name="quizType"]:checked').checked = false;
  });

  // Add material
  document.getElementById('addMaterialBtn').addEventListener('click', () => {
    const name = document.getElementById('materialName').value;
    const file = document.getElementById('materialFile').files[0];

    if (name && file) {
      materials.push({ name, size: file.size });
      updateMaterialsList();
      closeMaterialModal();
    } else {
      alert('Please fill all fields.');
    }
  });

  // Add quiz
  document.getElementById('createQuizBtn').addEventListener('click', () => {
    const quizName = document.getElementById('quizName').value;
    const quizType = document.querySelector('input[name="quizType"]:checked');

    if (quizName && quizType) {
      quizzes.push({ name: quizName, type: quizType.value });
      updateQuizzesList();
      closeQuizModal();
    } else {
      alert('Please fill all fields.');
    }
  });

  // Update materials list
  function updateMaterialsList() {
    const list = document.getElementById('materialsList');
    list.innerHTML = ''; // Clear existing content

    materials.forEach((material, index) => {
      list.innerHTML += `
              <div class="flex justify-between items-center bg-gray-200 p-2 mt-2 rounded">
                  <span>${material.name} (${(material.size / 1024).toFixed(2)} MB)</span>
                  <div>
                      <button onclick="editMaterial(${index})" class="text-yellow-500">✎</button>
                      <button onclick="deleteMaterial(${index})" class="text-red-500">🗑️</button>
                  </div>
              </div>
          `;
    });
  }


  // Update quizzes list
  function updateQuizzesList() {
    const list = document.getElementById('quizzesList');
    list.innerHTML = ''; // Clear existing content

    quizzes.forEach((quiz, index) => {
      list.innerHTML += `
          <div class="flex justify-between items-center bg-gray-200 p-2 mt-2 rounded cursor-pointer" onclick="openQuizQuestionWindow('${quiz.name}', '${quiz.type}')">
              <span>${quiz.name} (${quiz.type})</span>
              <div>
                  <button onclick="editQuiz(${index}); event.stopPropagation();" class="text-yellow-500">✎</button>
                  <button onclick="deleteQuiz(${index}); event.stopPropagation();" class="text-red-500">🗑️</button>
              </div>
          </div>
      `;
    });
  }

  // Close material modal and reset fields
  function closeMaterialModal() {
    document.getElementById('materialModal').classList.add('hidden');
    document.getElementById('materialName').value = '';
    document.getElementById('materialFile').value = '';
  }

  // Close quiz modal and reset fields
  function closeQuizModal() {
    document.getElementById('quizModal').classList.add('hidden');
    document.getElementById('quizName').value = '';
    document.querySelector('input[name="quizType"]:checked').checked = false;
  }

  // Edit Material
  window.editMaterial = (index) => {
    // Implement editing logic
    alert(`Edit material: ${materials[index].name}`);
  };

  // Delete Material
  window.deleteMaterial = (index) => {
    materials.splice(index, 1);
    updateMaterialsList();
  };

  // Edit Quiz
  window.editQuiz = (index) => {
    // Implement editing logic
    alert(`Edit quiz: ${quizzes[index].name}`);
  };

  // Delete Quiz
  window.deleteQuiz = (index) => {
    quizzes.splice(index, 1);
    updateQuizzesList();
  };

  // Initialize with Materials tab open and load sample data
  loadSampleData();
  switchTab('materials');
});


// Show the Quiz Question Window with quiz details
function openQuizQuestionWindow() {

  document.getElementById('QuizQuestionWindowModal').classList.remove('hidden'); // Show modal
}

// Close the Quiz Question Window
function closeQuizQuestionWindow() {
  document.getElementById('QuizQuestionWindowModal').classList.add('hidden');
}

