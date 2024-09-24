// skill map course list
const courseData = [
  {
    id: "1",
    coinCount: 5,
    courseStatus: "completed",
    courseName: "Computer Networks",
    bgColor: "bg-red-800"
  },
  {
    id: "2",
    coinCount: 5,
    courseStatus: "completed",
    courseName: "Computer Networks",
    bgColor: "bg-red-800"
  },
  {
    id: "3",
    coinCount: 5,
    courseStatus: "completed",
    courseName: "Computer Networks",
    bgColor: "bg-red-800"
  },
  {
    id: "4",
    coinCount: 8,
    courseStatus: "now",
    courseName: "Data Structures",
    bgColor: "bg-pink-600"
  },
  {
    id: "5",
    coinCount: 3,
    courseStatus: "locked",
    courseName: "Operating Systems",
    bgColor: "bg-blue-600"
  },
  {
    id: "6",
    coinCount: 3,
    courseStatus: "locked",
    courseName: "Operating Systems",
    bgColor: "bg-blue-600"
  },
  {
    id: "7",
    coinCount: 3,
    courseStatus: "final",
    courseName: "Operating Systems",
    bgColor: "bg-blue-600"
  }
];

// Initialize a counter to track completed course status
let completedCounter = 0;

// Function to set the image based on course status
function getImageForStatus(status) {
  switch (status) {
    case 'completed':
      completedCounter++; // Increment the counter for each completed course
      // Alternate between the two completed images
      return completedCounter % 2 === 0 ? 'course-icon-2.png' : 'course-icon-1.png';
    case 'now':
      return 'course-icon-now.png';
    case 'locked':
      return 'course-icon-locked.png';
    case 'final':
      return 'course-icon-final.png';
    default:
      return 'default.png';
  }
}

// Function to generate the course card HTML based on JSON data
function generateCourseCards() {
  const container = document.getElementById("skillMapCourseContainer");

  courseData.map((course, index) => {
    // Set the image based on the courseStatus
    course.imageSrc = getImageForStatus(course.courseStatus);

    // Determine whether to hide the pathLine for first and last objects
    let pathLine = "visible";
    if (index === 0 || index === courseData.length - 1) {
      pathLine = "hidden";
    }

    // Create a new div for left-right margin for skill map course
    const courseOuterDiv = document.createElement("div");
    courseOuterDiv.classList.add("lg:w-[52%]", "mx-auto", "grid", "relative");

    // Alternate between 'justify-self-start' and 'justify-self-end' for every other course
    const alignmentClass = index % 2 === 0 ? 'justify-self-start' : 'justify-self-end';
    const pathImage = index % 2 === 0 ? 'path-right.svg' : 'path-left.svg';

    // Create a new div for each course
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("lg:w-[340px]", alignmentClass, course.bgColor, "h-[90px]", "flex", "z-[12]");

    // Inner HTML of the course card using template literals
    courseDiv.innerHTML = `
      <img
      class="w-[80px] object-contain"
      id="${course.id}" src='/assets/img/skillmap/${course.imageSrc}' alt="${course.courseName}">
      <div>
        <p>${course.coinCount}</p>
        <img class="w-[36px]"
         src="/assets/img/educoin-big.png" alt="educoin points">
      </div>
      <p>${course.courseStatus}</p>
      <p>${course.courseName}</p>
      <div style="visibility: ${pathLine}; height: 2px; background-color: black; margin-top: 10px;"></div>
    `;

    // Append courseDiv inside courseOuterDiv
    courseOuterDiv.appendChild(courseDiv);

    // Add the path image (except for the last object)
    if (index !== courseData.length - 1) {
      const pathImg = document.createElement("img");

      // Determine if the path should be positioned left or right based on alignmentClass
      const positionClass = alignmentClass === 'justify-self-start' ? '-right-[80px]' : '-left-[80px]';

      // Add multiple classes to pathImg
      pathImg.classList.add(
        "w-[260px]",
        "absolute",

        positionClass, // Use the determined position class

        "top-[40px]",
        "z-[10]"
      );

      // Set the source and alt attributes
      pathImg.src = `/assets/img/skillmap/${pathImage}`;
      pathImg.alt = `${alignmentClass} path`;

      // Append the path image based on alignment
      courseOuterDiv.appendChild(pathImg);
    }

    // Now append courseOuterDiv to the main container (only this one)
    container.appendChild(courseOuterDiv);

  });
}

// Call the function to generate the course cards
generateCourseCards();
