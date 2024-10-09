// Sample JSON data for the menu
const menuData = [
  { "name": "Home", "link": "#", "type": "menu" },
  { "name": "Courses", "link": "#", "type": "menu" },
  { "name": "Learning Journey", "link": "#", "type": "menu" },
  { "name": "Classroom Chat", "link": "c#", "type": "menu" },
  { "name": "Chat", "link": "#", "type": "menu" },
  { "type": "separator" }, // Separator
  { "name": "Logout", "link": "#", "type": "menu" }
];


// Function to render menu items
function renderMenuItems() {
  const menuItemsContainer = document.getElementById('menu-items');
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page

  menuData.forEach(item => {
    const li = document.createElement('li');

    if (item.type === "menu") {
      li.className = 'cursor-pointer text-xl hover:text-primaryDark';
      li.innerText = item.name;
      li.addEventListener('click', () => {
        window.location.href = item.link; // Redirect to the page
        toggleMenu(); // Close the menu
      });

      // Check if this is the active page
      if (item.link === currentPage) {
        li.classList.add('font-semibold', 'underline'); // Add active styles
      }
    } else if (item.type === "separator") {
      const separatorDiv = document.createElement('div');
      separatorDiv.className = 'h-1 w-full max-w-[360px] bg-gradient-to-b from-transparent via-gray-200 to-transparent my-4'; // Style for separator
      menuItemsContainer.appendChild(separatorDiv);
      return; // Skip adding to menu items container
    }

    menuItemsContainer.appendChild(li);
  });
}

// Function to toggle the menu
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden'); // Toggle visibility
}

// Event listener for the hamburger button
document.getElementById('hamburger').addEventListener('click', toggleMenu);

// Event listener for the close button
document.getElementById('close-menu').addEventListener('click', toggleMenu);

// Render menu items when the page loads
window.onload = renderMenuItems;


// ===========================================
// swiper carousel
// ===========================================

// Initialize Swiper
document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper(".whatsNewSlider", {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: true, // Enable looping
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500, // Delay between slides in ms
      disableOnInteraction: false, // Continue autoplay after interaction
    },
  });
});

// ===========================================
// sidebar
// ===========================================

const sidebar = document.getElementById('sidebar');
const logoTexts = document.querySelectorAll('.logo-text');
const toggleBtn = document.getElementById('toggleBtn');
const sidebarTexts = document.querySelectorAll('.sidebar-text');
const main = document.getElementById('main');
const headerMenu = document.getElementById('header-menu');
const sidemenuList = document.querySelectorAll('.sidemenu-list');
const sidemenuLogo = document.getElementById('sidemenu-logo');
const toggleBtnArea = document.getElementById('toggle-btn-area');
const educatSidemenuBigBtn = document.getElementById('educat-sidemenu-big');
const educatSidemenuSmBtn = document.getElementById('educat-sidemenu-sm');
const menuItems = document.querySelectorAll('nav ul li');

// when click the shrink button from sidemenu
toggleBtn.addEventListener('click', () => {

  // toggle width and padding when click the shrink button
  sidebar.classList.toggle('w-24');
  sidebar.classList.toggle('w-72');


  // hide logo text when sidemenu shrink
  logoTexts.forEach(text => text.classList.toggle('hidden'));

  // toggle btn will center when sidemenu shrink
  toggleBtnArea.classList.toggle('justify-end');
  toggleBtnArea.classList.toggle('justify-center');


  toggleBtn.classList.toggle('rotate-180')

  educatSidemenuBigBtn.classList.toggle('hidden')
  educatSidemenuSmBtn.classList.toggle('flex')
  educatSidemenuSmBtn.classList.toggle('hidden')

  // center the logo when sidemenu shrink
  sidemenuLogo.classList.toggle('justify-center');

  // hide the side menu list text when shrink
  sidebarTexts.forEach(text => text.classList.toggle('hidden'));

  // center the menu icons when shrink the side menu bar
  sidemenuList.forEach(li => {
    li.classList.toggle('justify-center');
    li.classList.toggle('pl-4');
    li.classList.toggle('pl-0');
  });

});

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove 'active' class from all menu items
    menuItems.forEach(i => i.classList.remove('active'));
    // Add 'active' class to the clicked item
    item.classList.add('active');
  });
});

// sidebar END
// ===========================================



const fullscreenToggle = document.getElementById('fullscreenToggle');

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullscreenToggle.addEventListener('click', toggleFullscreen);



// comments
// Sample JSON data (you can fetch this data from an API)
const commentsData = [
  {
    "id": 1,
    "studentName": "Faisal Saleem",
    "comment": "I have a question about the assign...",
    "courseName": "Computer network & Internet",
    "timestamp": "2024-10-08T10:30:00Z",
    "isNew": true
  },
  {
    "id": 2,
    "studentName": "Amir Khan",
    "comment": "Can you please extend the deadline?",
    "courseName": "Operating Systems",
    "timestamp": "2024-10-07T09:20:00Z",
    "isNew": false
  },
  {
    "id": 3,
    "studentName": "Aisha Ahmed",
    "comment": "I need help with the last module.",
    "courseName": "Data Structures",
    "timestamp": "2024-10-06T15:45:00Z",
    "isNew": true
  },
  {
    "id": 4,
    "studentName": "Rahul Verma",
    "comment": "What is the next assignment topic?",
    "courseName": "Software Engineering",
    "timestamp": "2024-10-05T12:10:00Z",
    "isNew": false
  },
  {
    "id": 5,
    "studentName": "Maria Joseph",
    "comment": "Can you provide additional resources?",
    "courseName": "Database Management",
    "timestamp": "2024-10-04T09:00:00Z",
    "isNew": true
  }
]


// Function to calculate time difference (e.g., "3hr ago")
function timeAgo(dateString) {
  const now = new Date();
  const commentDate = new Date(dateString);
  const diffInMs = Math.abs(now - commentDate); // Use Math.abs() to avoid negative values
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  return diffInHours < 24 ? `${diffInHours}hr ago` : `${Math.floor(diffInHours / 24)}d ago`;
}

// Function to create a comment dynamically
function createComment(comment, index) {

  // Determine background color based on the index (odd/even)
  const bgColor = index % 2 === 0 ? '#29bc1e' : '#fff6ef';
  const hoverColor = index % 2 === 0 ? '#fbf0ce' : '#fffaf6'; // Slightly lighter hover color


  // Create a new div for the comment
  const commentDiv = document.createElement('div');
  commentDiv.id = `comment-${comment.id}`;
  commentDiv.classList.add('group');

  // Limit comment to 35 characters
  const truncatedComment = comment.comment.length > 35
    ? comment.comment.substring(0, 35) + '...'
    : comment.comment;

  // Set the inner HTML of the comment div
  commentDiv.innerHTML = `
    <div class="bg-[#fae3d2] h-[4px] w-[90%] mx-auto rounded-tl-lg rounded-tr-lg transition-all duration-1200"></div>
    <a href="#">
       <div class="w-full rounded-xl px-2 py-2 relative border border-black/10"
           style="background-color: ${bgColor}; transition: background-color 0.3s ease;">
        <div class="gap-2 flex flex-col">
          <div class="flex items-center gap-2">
            <img class="w-[34px] h-[34px] rounded-full" src="/assets/img/general/user.png" alt="user-profile-picture">
            <div class="w-full">
              <div class="flex justify-between w-full">
                <p id="studentName-${comment.id}" class="font-semibold">
                  ${comment.studentName}
                  <span class="font-normal text-black/50 pl-2">posted a comment!</span>
                </p>
                <div class="flex gap-1 items-center">
                  <div id="newComment-${comment.id}" class="w-2 h-2 bg-orange-500 rounded-full ${!comment.isNew ? 'hidden' : ''}"></div>
                  <p class="text-xs font-semibold text-primaryDark">${timeAgo(comment.timestamp)}</p>
                </div>
              </div>
              <p id="studentComment-${comment.id}" class="text-black/50 pt-1">${truncatedComment}</p>
            </div>
          </div>
          <div class="w-full min-h-[1px] bg-gray-200 mt-2"></div>
          <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
              <img src="assets/icons/book.svg" alt="">
              <p class="courseName">${comment.courseName}</p>
            </div>
            <a href="#" id="reply-${comment.id}" class="text-xs font-semibold text-primaryDark underline flex gap-1 items-center">
              <svg class="fill-primary w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 20L1 12L11 4V9C16.5228 9 21 13.4772 21 19C21 19.2729 20.9891 19.5433 20.9676 19.8107C19.4605 16.9502 16.458 15 13 15H11V20Z"></path>
              </svg>
              <p>Reply</p>
            </a>
          </div>
        </div>
      </div>
    </a>
  `;

  // Add click event to mark the comment as read
  commentDiv.querySelector('a').addEventListener('click', function () {
    const newCommentIndicator = document.getElementById(`newComment-${comment.id}`);
    if (newCommentIndicator) {
      newCommentIndicator.classList.add('hidden'); // Hide the "new" indicator
    }
  });

  return commentDiv;
}

// Function to render all comments
function renderComments(comments) {
  const commentsContainer = document.getElementById('commentsContainer');
  commentsContainer.innerHTML = ''; // Clear any existing content
  comments.forEach(comment => {
    const commentElement = createComment(comment);
    commentsContainer.appendChild(commentElement);
  });
}

// Load the comments dynamically on page load
document.addEventListener('DOMContentLoaded', function () {
  renderComments(commentsData);
});


// Sample Reviews Data
const reviews = [
  {
    "id": 1,
    "studentName": "Shemin Shah",
    "starRating": 3.5,
    "isNew": true,
    "timestamp": "1 day ago",
    "courseName": "Familiarize in microbit",
    "comment": "The Robotics course was amazing! Your step-by-step explanations made even the complex concepts..."
  },
  {
    "id": 2,
    "studentName": "Ali Hassan",
    "starRating": 4,
    "isNew": false,
    "timestamp": "2 days ago",
    "courseName": "Intro to Python",
    "comment": "Great course! I learned a lot about Python."
  }
];

const reviewsContainer = document.getElementById("reviewsContainer");

function generateStars(rating) {
  const fullStarSVG =
    '<svg class="w-4 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.951L12 .5l3.386 7.341 8.027.951-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';
  const halfStarSVG =
    '<svg class="w-4 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.968L16.247 18.345 15.299 13.572 18.872 10.267 14.039 9.694 12 5.275V15.968zM12 18.26L4.947 22.208 6.522 14.28.588 8.792 8.615 7.84 12 .5l3.386 7.34 8.027.951-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';
  const emptyStarSVG =
    '<svg class="w-4 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26L4.947 22.208 6.522 14.28.588 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';

  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    starsHTML += fullStarSVG;
  }
  if (hasHalfStar) {
    starsHTML += halfStarSVG;
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
    starsHTML += emptyStarSVG;
  }

  return starsHTML;
}

reviews.forEach((review) => {
  const reviewHTML = `
    <div class="bg-white hover:bg-[#fffcf6] border border-black/10 w-full rounded-xl px-2 py-2 relative hover:border-black/20 cursor-pointer">
      <div class="gap-2 flex flex-col">
        <div class="flex justify-between">
          <!-- profile pic, name, rating star -->
          <div class="flex items-center gap-2">
            <img class="w-[34px] h-[34px] rounded-full" src="/assets/img/general/user.png" alt="user-profile-picture">
            <div>
              <p id="studentName" class="font-semibold">${review.studentName}</p>
              <div id="starRating" class="flex gap-1">
                ${generateStars(review.starRating)}
              </div>
            </div>
          </div>

          <!-- timestamp, coursename -->
          <div class="flex flex-col items-end">
            <div class="flex gap-1 items-center">
              <div class="w-2 h-2 bg-orange-500 rounded-full ${!review.isNew ? 'hidden' : ''}"></div>
              <p class="text-xs font-semibold text-primaryDark">${review.timestamp}</p>
            </div>
            <div class="flex gap-2 items-center">
              <img src="assets/icons/book.svg" alt="">
              <p class="courseName">${review.courseName}</p>
            </div>
          </div>
        </div>

        <p class="text-black/50 pt-1">
          ${review.comment}
        </p>
      </div>
    </div>
  `;
  reviewsContainer.innerHTML += reviewHTML;
});