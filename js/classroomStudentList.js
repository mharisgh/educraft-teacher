const studentsData = [
  { id: 1, name: "Faisal Saleem", grade: "5A", image: "user.png" },
  { id: 2, name: "Ahmed Ali", grade: "6B", image: "user3.jpg" },
  { id: 3, name: "Huda Karim", grade: "4C", image: "user2.jpg" },
  { id: 4, name: "Sara Khalid", grade: "7A", image: "user4.jpg" },
  { id: 5, name: "Mohammed Zayed", grade: "3B", image: "user2.jpg" },
  { id: 6, name: "Fatima Noor", grade: "8A", image: "user2.jpg" },
  { id: 7, name: "Omar Hassan", grade: "9C", image: "user3.jpg" },
  { id: 8, name: "Kareem Al-Mutawa", grade: "2A", image: "user4.jpg" },
  { id: 9, name: "Layla Ahmad", grade: "1B", image: "user4.jpg" },
  { id: 10, name: "Zainab Siddiq", grade: "10A", image: "user2.jpg" }
];

// Fetch student data and render the list
function renderStudentList() {
  const studentList = document.getElementById("studentList");

  // Iterate over the studentsData JSON array
  studentsData.forEach(student => {
    const studentItem = document.createElement("div");
    studentItem.className = "flex justify-between bg-transparent hover:bg-[#fff5e7] py-2 px-2 rounded-lg";

    // Student details container
    const studentDetails = document.createElement("div");
    studentDetails.className = "flex gap-2 items-center";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Student image
    const img = document.createElement("img");
    img.src = `/assets/img/general/${student.image}`;
    img.alt = student.name;
    img.className = "w-8 h-8 rounded-full object-cover";

    // Student name
    const nameLink = document.createElement("a");
    nameLink.href = "#";
    nameLink.textContent = student.name;
    nameLink.className = "hover:underline";

    // Append elements to the details section
    studentDetails.appendChild(checkbox);
    studentDetails.appendChild(img);
    studentDetails.appendChild(nameLink);

    // Grade display
    const grade = document.createElement("p");
    grade.innerHTML = `Grade <span class="font-medium">${student.grade}</span>`;

    // Append student details and grade to the item container
    studentItem.appendChild(studentDetails);
    studentItem.appendChild(grade);

    // Append the item to the student list container
    studentList.appendChild(studentItem);
  });
}

// Call the function to render the student list
renderStudentList();
