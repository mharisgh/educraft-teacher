const classFoldersData = [
  { id: 1, className: "Robotics Camp", classStudentCount: 3, classFolderColor: "#b7a597", link: "/robotics-camp.html" },
  { id: 2, className: "Mathematics", classStudentCount: 5, classFolderColor: "#9d673d", link: "/classroom/mathematics" },
  { id: 3, className: "Class 4A", classStudentCount: 7, classFolderColor: "#7a4e2a", link: "/class-4a" },
  { id: 4, className: "Art", classStudentCount: 8, classFolderColor: "#cca487", link: "/classroom/art" },
  { id: 5, className: "History", classStudentCount: 3, classFolderColor: "#ec6409", link: "/history" },
  { id: 6, className: "Literature", classStudentCount: 6, classFolderColor: "#bf4b00", link: "/literature" },
  { id: 7, className: "Microbit Advanced", classStudentCount: 2, classFolderColor: "#ffaf43", link: "/microbit-advanced" }
];

// Function to create class folders
function createClassFolders() {
  const container = document.getElementById("classFoldersContainer");
  container.innerHTML = ""; // Clear container

  classFoldersData.forEach(classData => {
    const folder = document.createElement("div");
    folder.className = "relative w-fit mb-5";

    const folderBackground = document.createElement("a");
    folderBackground.className = "bg-gradient-to-b from-[#fef8f4] to-[#ede6e0] absolute w-full h-[110%] top-5 rounded-xl p-3 flex flex-col justify-between hover:top-4 transition-all ease-in-out";
    folderBackground.href = classData.link;

    const classNameElement = document.createElement("p");
    classNameElement.className = "class-name font-semibold";
    classNameElement.textContent = classData.className;

    const studentCountElement = document.createElement("p");
    studentCountElement.className = "text-xs";
    studentCountElement.innerHTML = `<span>${classData.classStudentCount}</span> Quiz`;

    folderBackground.appendChild(classNameElement);
    folderBackground.appendChild(studentCountElement);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "fill-blue-500");
    svg.setAttribute("width", "152");
    svg.setAttribute("height", "89");
    svg.setAttribute("viewBox", "0 0 152 89");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M45.0995 2.45838C43.5909 1.40864 41.797 0.845947 39.9591 0.845947H8.51562C4.09741 0.845947 0.515625 4.42773 0.515625 8.84595V80.0989C0.515625 84.5171 4.09741 88.0989 8.51562 88.0989H143.494C147.912 88.0989 151.494 84.5171 151.494 80.0989V20.1545C151.494 15.184 147.465 11.1545 142.494 11.1545H63.8972C59.9729 11.1545 57.9089 11.1545 55.0306 9.36862L45.0995 2.45838Z");
    path.setAttribute("fill", classData.classFolderColor); // Use the dynamic color from JSON

    svg.appendChild(path);
    folder.appendChild(folderBackground);
    folder.appendChild(svg);
    container.appendChild(folder);
  });
}

// Function to toggle modal visibility
function toggleModal(visible) {
  const modalOverlay = document.getElementById("classModalOverlay");
  const modal = document.getElementById("classModal");

  if (visible) {
    modalOverlay.classList.remove("hidden");
    modal.classList.remove("hidden");
  } else {
    modalOverlay.classList.add("hidden");
    modal.classList.add("hidden");
  }
}

// Handle Create Class Button click
document.getElementById("createClassButton").addEventListener("click", () => toggleModal(true));

// Handle Close Modal click
document.getElementById("closeClassModal").addEventListener("click", () => toggleModal(false));

// Handle Cancel button click
document.getElementById("cancelButton").addEventListener("click", () => toggleModal(false));

// Handle color selection
document.querySelectorAll("[data-color]").forEach(div => {
  div.addEventListener("click", function () {
    document.getElementById("selectedColor").value = this.getAttribute("data-color");
    this.style.border = "2px solid black"; // Highlight selected color
  });
});

// Handle Create button click
document.getElementById("createClassForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const className = document.getElementById("classNameInput").value.trim();
  const classFolderColor = document.getElementById("selectedColor").value;

  if (className.length > 0) {
    // Add new class to the data array
    classFoldersData.push({
      id
