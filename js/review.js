
// Sample Reviews Data
const commonQuestions = [
  {
    q1: "Did the course meet your expectations?",
    q1AnswerEmoji: "😊",
    q1AnswerEmojiText: "Satisfied",
    q2: "Was the content easy to understand?",
    q2AnswerEmoji: "👍",
    q2AnswerEmojiText: "Easy",
    q3: "How would you rate the instructor's delivery?",
    q3AnswerEmoji: "👏",
    q3AnswerEmojiText: "Excellent",
    q4: "Was the pace of the course appropriate?",
    q4AnswerEmoji: "👌",
    q4AnswerEmojiText: "Balanced",
    q5: "Would you recommend this course to others?",
    q5AnswerEmoji: "🤩",
    q5AnswerEmojiText: "Definitely",
  },
];

const reviews = [
  {
    id: 1,
    studentImg: "/assets/img/general/user.png",
    studentName: "Shemin Shah",
    class: "4A",
    isNew: true,
    timestamp: "1 day ago",
    courseName: "Familiarize in microbit",
    starRating: 3.5,
    comment: "The Robotics course was amazing! Your step-by-step explanations made even the complex concepts...",
    question: commonQuestions,
  },
  {
    id: 2,
    studentImg: "/assets/img/general/user2.jpg",
    studentName: "Arya Nair",
    class: "5B",
    isNew: false,
    timestamp: "2 days ago",
    courseName: "Game Development Basics",
    starRating: 4.2,
    comment: "It was a great introduction to game development. I enjoyed the practical approach!",
    question: commonQuestions,
  },
  {
    id: 3,
    studentImg: "/assets/img/general/user3.jpg",
    studentName: "Ramesh Kumar",
    class: "6A",
    isNew: true,
    timestamp: "3 hours ago",
    courseName: "Web Development Bootcamp",
    starRating: 4.8,
    comment: "This was an excellent course! I feel more confident building websites now.",
    question: commonQuestions,
  },
  {
    id: 4,
    studentImg: "/assets/img/general/user4.jpg",
    studentName: "Meera Joseph",
    class: "7C",
    isNew: false,
    timestamp: "1 week ago",
    courseName: "Python Programming Essentials",
    starRating: 3.8,
    comment: "The course was good, but I would have liked more real-world examples.",
    question: commonQuestions,
  },
  {
    id: 5,
    studentImg: "/assets/img/general/user5.jpg",
    studentName: "Anil Menon",
    class: "8D",
    isNew: true,
    timestamp: "5 days ago",
    courseName: "AI and Machine Learning Fundamentals",
    starRating: 4.0,
    comment: "I learned a lot about AI, but some concepts were challenging without prior knowledge.",
    question: commonQuestions,
  },
];

const reviewsContainer = document.getElementById("reviewsContainer");
const popupReview = document.getElementById("popupReview");
const popupReviewContent = document.getElementById("popupReviewContent");
const closeReviewPopup = document.getElementById("closeReviewPopup");

function generateStars(rating) {
  const fullStarSVG = '<svg class="w-4 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.951L12 .5l3.386 7.341 8.027.951-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';
  const halfStarSVG = '<svg class="w-4 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 15.968L16.247 18.345 15.299 13.572 18.872 10.267 14.039 9.694 12 5.275V15.968zM12 18.26L4.947 22.208 6.522 14.28.588 8.792 8.615 7.84 12 .5l3.386 7.34 8.027.951-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';
  const emptyStarSVG = '<svg class="w-4 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 18.26L4.947 22.208 6.522 14.28.588 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928L12 18.26z"/></svg>';

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
    <div class="bg-white hover:bg-[#fffcf6] border border-black/10 w-full rounded-xl px-2 py-2 relative hover:border-black/20 cursor-pointer" onclick="openReviewPopup(${review.id})">
      <div class="gap-2 flex flex-col">
        <div class="flex justify-between">
          <!-- Profile pic, name, rating star -->
          <div class="flex items-center gap-2">
            <img class="w-[34px] h-[34px] rounded-full" src=${review.studentImg} alt="user-profile-picture">
            <div>
              <p class="font-semibold">${review.studentName}</p>
              <div class="flex gap-1">
                ${generateStars(review.starRating)}
              </div>
            </div>
          </div>

          <!-- Timestamp, course name -->
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


// Function to open the popup with detailed review data
function openReviewPopup(reviewId) {
  const review = reviews.find(r => r.id === reviewId);

  const detailedReviewHTML = `
    <div class="flex flex-col p-4  max-h-[90vh] overflow-auto">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <img class="w-[34px] h-[34px] rounded-full" src="${review.studentImg}" alt="user-profile-picture">
          <div>
            <h2 class="font-semibold">${review.studentName}</h2>
            <h2 class="font-semibold text-primary">Class ${review.class}</h2>
          </div>
        </div>

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

      <div class="py-4">
        <p class="text-black/60">Feedback & Rating</p>
        <div class="flex gap-1 my-2 font-semibold">
          ${generateStars(review.starRating)}
          <span>${review.starRating.toFixed(1)}</span>
        </div>
        <p class="font-semibold">${review.comment}</p>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-black/60">Course Questionnaires</p>

        ${Object.keys(review.question[0]).filter(key => key.startsWith('q') && !key.includes('Answer')).map((key, index) => `
          <div class="">
            <div class="flex gap-1">
              <p class="text-black/60">Q${index + 1}:</p>
              <p class="font-semibold">${review.question[0][key]}</p>
            </div>
            <div class="flex gap-1 justify-center items-center border-[3px] border-primary min-w-[130px] w-fit h-[35px] rounded-lg my-2">
              <p class="text-xl">${review.question[0][key + 'AnswerEmoji']}</p>
              <p class="font-semibold text-xs">${review.question[0][key + 'AnswerEmojiText']}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  popupReviewContent.innerHTML = detailedReviewHTML;
  popupReview.classList.remove('hidden');
  popupReview.classList.add('flex');
}


// Close popup when close button is clicked
closeReviewPopup.addEventListener('click', () => {
  popupReview.classList.add('hidden');
});