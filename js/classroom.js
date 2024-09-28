const classFoldersData = [
  { id: 1, className: "Robotics Camp", classStudentCount: 3, classFolderColor: "#b7a597", link: "/robotics-camp.html" },
  { id: 2, className: "Mathematics", classStudentCount: 5, classFolderColor: "#9d673d", link: "/classroom/mathematics" },
  { id: 3, className: "Class 4A", classStudentCount: 7, classFolderColor: "#7a4e2a", link: "/class-4a" },
  { id: 4, className: "Art", classStudentCount: 8, classFolderColor: "#cca487", link: "/classroom/art" },
  { id: 5, className: "History", classStudentCount: 3, classFolderColor: "#ec6409", link: "/history" },
  { id: 6, className: "Literature", classStudentCount: 6, classFolderColor: "#bf4b00", link: "/literature" },
  { id: 7, className: "Microbit Advanced", classStudentCount: 2, classFolderColor: "#ffaf43", link: "/microbit-advanced" }
];

function createClassFolders() {
  const container = document.getElementById("classFoldersContainer");

  classFoldersData.forEach(classData => {
    // Create folder wrapper
    const folder = document.createElement("div");
    folder.className = "relative w-fit mb-5";

    // Create folder background
    const folderBackground = document.createElement("a");
    folderBackground.className = "bg-gradient-to-b from-[#fef8f4] to-[#ede6e0] absolute w-full h-[110%] top-5 rounded-xl p-3 flex flex-col justify-between hover:top-4 transition-all ease-in-out";

    // Set the link for folderBackground
    folderBackground.href = classData.link;

    // Create class name
    const classNameElement = document.createElement("p");
    classNameElement.className = "class-name font-semibold";
    classNameElement.textContent = classData.className;

    // Create student count
    const studentCountElement = document.createElement("p");
    studentCountElement.className = "text-xs";
    studentCountElement.innerHTML = `<span>${classData.classStudentCount}</span> Quiz`;

    // Append class name and student count to background
    folderBackground.appendChild(classNameElement);
    folderBackground.appendChild(studentCountElement);

    // Create SVG icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "fill-blue-500");
    svg.setAttribute("width", "152");
    svg.setAttribute("height", "89");
    svg.setAttribute("viewBox", "0 0 152 89");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M45.0995 2.45838C43.5909 1.40864 41.797 0.845947 39.9591 0.845947H8.51562C4.09741 0.845947 0.515625 4.42773 0.515625 8.84595V80.0989C0.515625 84.5171 4.09741 88.0989 8.51562 88.0989H143.494C147.912 88.0989 151.494 84.5171 151.494 80.0989V20.1545C151.494 15.184 147.465 11.1545 142.494 11.1545H63.8972C59.9729 11.1545 57.9089 11.1545 55.0306 9.36862L45.0995 2.45838Z");
    path.setAttribute("fill", classData.classFolderColor); // Use the dynamic color from JSON

    // Append the path to the SVG
    svg.appendChild(path);

    // Append background and SVG to the folder
    folder.appendChild(folderBackground);
    folder.appendChild(svg);

    // Append folder to the container
    container.appendChild(folder);
  });
}

// Call the function to create class folders
createClassFolders();



const stdAnnouncementData = [
  {
    "announcementType": "general",
    "sendTo": "Class 4",
    "postedDate": "2024-09-27",
    "message": "Student Fasial Saleem has asked for clarification on the AI project requirements. Please provide detailed instructions for the final submission."
  },
  {
    "announcementType": "important notice",
    "sendTo": "All students",
    "postedDate": "2024-09-26",
    "message": "Reminder: The submission deadline for the science project is approaching. Make sure to submit by the end of the week."
  },
  {
    "announcementType": "study tips",
    "sendTo": "Class 2",
    "postedDate": "2024-09-25",
    "message": "Don't forget to review your notes before the upcoming math test. Here are some tips to help you study effectively."
  },
  {
    "announcementType": "question",
    "sendTo": "Class 1",
    "postedDate": "2024-09-24",
    "message": "Is there anyone who can explain the difference between living and non-living things? Please share your thoughts."
  },
  {
    "announcementType": "general",
    "sendTo": "microbit camp",
    "postedDate": "2024-09-23",
    "message": "Great job on the microbit projects! Let's discuss what we learned during our next meeting."
  },
  {
    "announcementType": "important notice",
    "sendTo": "Class 3",
    "postedDate": "2024-09-22",
    "message": "Important: The field trip scheduled for this Friday has been postponed. Further details will follow."
  },
  {
    "announcementType": "study tips",
    "sendTo": "All students",
    "postedDate": "2024-09-21",
    "message": "Here are some effective study techniques to help you prepare for exams. Be sure to try them out!"
  },
  {
    "announcementType": "question",
    "sendTo": "robotics quiz",
    "postedDate": "2024-09-20",
    "message": "Anyone struggling with the coding part of the robotics quiz? Let's have a quick session to clarify doubts."
  }
];

// Function to convert posted date to a relative date format
function formatPostedDate(dateString) {
  const postedDate = new Date(dateString);
  const today = new Date();

  const timeDiff = today - postedDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) return "Today";
  if (daysDiff === 1) return "Yesterday";
  return postedDate.toLocaleDateString(); // Change this format as needed
}

// Function to render announcements
function renderAnnouncements() {
  const announcementContainer = document.getElementById('announcementContainer');

  stdAnnouncementData.forEach((announcement, index) => {
    const announcementDiv = document.createElement('div');

    // Determine the image source based on the announcement type
    let imgSrc;
    switch (announcement.announcementType) {
      case "general":
        imgSrc = "/assets/img/classroom/general.png";
        break;
      case "important notice":
        imgSrc = "/assets/img/classroom/important.png";
        break;
      case "study tips":
        imgSrc = "/assets/img/classroom/tips.png";
        break;
      case "question":
        imgSrc = "/assets/img/classroom/question.png";
        break;
      default:
        imgSrc = ""; // Fallback if needed
    }

    // Add this inside the announcementDiv creation, right after the announcement type and class info.
    let newTag = '';
    if (formatPostedDate(announcement.postedDate) === "Today" || formatPostedDate(announcement.postedDate) === "Yesterday") {
      newTag = '<div class="bg-primary font-medium text-xs px-2 py-1 rounded-lg text-white h-fit">New</div>';
    }

    // Create the inner HTML structure
    announcementDiv.innerHTML = `
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
        <div class="bg-primaryLight border border-primary rounded-lg w-10 h-10 flex justify-center items-center">
          <img src="${imgSrc}" alt="${announcement.announcementType}" class="w-7">
        </div>
          
          <div class="flex flex-col gap-1">
            <p class="font-semibold">${announcement.announcementType.charAt(0).toUpperCase() + announcement.announcementType.slice(1)}</p>
            <div class="flex gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_371_497)">
              <path class="fill-[#e97224]"
                d="M17.836 14.034H17.5417V11.9743C17.5417 11.7402 17.4487 11.5157 17.2832 11.3502C17.1176 11.1846 16.8931 11.0916 16.659 11.0916H11.9512C11.7171 11.0916 11.4926 11.1846 11.3271 11.3502C11.1615 11.5157 11.0685 11.7402 11.0685 11.9743V14.034H3.41843V4.61844H15.7763V9.03197C15.7763 9.26608 15.8693 9.49059 16.0348 9.65613C16.2004 9.82167 16.4249 9.91467 16.659 9.91467C16.8931 9.91467 17.1176 9.82167 17.2832 9.65613C17.4487 9.49059 17.5417 9.26608 17.5417 9.03197V4.3242C17.5417 3.93402 17.3867 3.55982 17.1108 3.28392C16.8349 3.00803 16.4607 2.85303 16.0705 2.85303H3.12419C2.73401 2.85303 2.35981 3.00803 2.08391 3.28392C1.80801 3.55982 1.65302 3.93402 1.65302 4.3242V14.034H1.35878C1.12467 14.034 0.900152 14.127 0.734613 14.2925C0.569073 14.458 0.476074 14.6826 0.476074 14.9167C0.476074 15.1508 0.569073 15.3753 0.734613 15.5408C0.900152 15.7064 1.12467 15.7994 1.35878 15.7994H17.836C18.0701 15.7994 18.2946 15.7064 18.4601 15.5408C18.6257 15.3753 18.7187 15.1508 18.7187 14.9167C18.7187 14.6826 18.6257 14.458 18.4601 14.2925C18.2946 14.127 18.0701 14.034 17.836 14.034ZM12.834 12.857H15.7763V14.034H12.834V12.857Z"
                fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_371_497">
                <rect width="18.8311" height="18.8311" fill="white" transform="translate(0.181641 0.20459)" />
              </clipPath>
            </defs>
          </svg>
              <p>${announcement.sendTo}</p>
            </div>
            
          </div>
        </div>
        
        <div class="flex gap-2">
        ${newTag}  
        <p class="text-primaryDark  font-medium">${formatPostedDate(announcement.postedDate)}</p>
        </div>
        
        
      </div>
      <p class="text-black/70 pt-2">${announcement.message}</p>
    `;

    // Append the announcement to the container
    announcementContainer.appendChild(announcementDiv);

    // Add the separator line if this is not the last announcement
    if (index < stdAnnouncementData.length - 1) {
      const separator = document.createElement('div');
      separator.className = 'h-[1px] bg-gradient-to-r from-black/5 via-black/20 to-black/5 w-full';
      announcementContainer.appendChild(separator);
    }
  });
}

// Call the function to render announcements on page load
renderAnnouncements();
