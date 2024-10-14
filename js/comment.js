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