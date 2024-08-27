
// ============================================
// Timeline accordion
// ============================================

document.querySelectorAll('.accordion-header').forEach(header => {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.arrow');

  // Check if the header has the active class
  if (header.classList.contains('timeline-active')) {
    content.style.display = 'flex';
    arrow.style.transform = 'rotate(180deg)';
  }

  header.addEventListener('click', () => {
    // Toggle active class
    header.classList.toggle('timeline-active');

    // Toggle content visibility
    content.style.display = content.style.display === 'flex' ? 'none' : 'flex';

    // Rotate the arrow
    arrow.style.transform = content.style.display === 'flex' ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});

// ============================================
// Slide percentage timeline
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  let currentProgress = 20; // Start at 20%

  // Initialize Swiper
  var swiper = new Swiper(".courseSlide", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        updateProgressFromSwiper();
      }
    }
  });

  // Update progress based on Swiper slides
  function updateProgressFromSwiper() {
    const totalSlides = document.querySelectorAll('.swiper-slide').length;
    const increment = 10 / (totalSlides - 1); // Calculate increment based on number of slides
    currentProgress = Math.min(currentProgress + increment, 30); // Increment up to 30%
    setProgress(currentProgress);
  }

  // Update the progress indicator
  function setProgress(lessonPercent) {
    lessonPercent = Math.min(lessonPercent, 30); // Ensure the percentage doesn't exceed 30%
    document.querySelector('.progressPercentageText').textContent = `${Math.round(lessonPercent)}%`;

    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (lessonPercent / 100) * circumference;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  }

  // Set initial progress
  setProgress(currentProgress);
});
// ============================================
// Overivew, Comments, Downloads - Tabs
// ============================================

document.querySelectorAll('.course-view-tab').forEach(tab => {
  tab.addEventListener('click', function () {

    // Remove tab-active class from all tabs
    document.querySelectorAll('.course-view-tab').forEach(t => t.classList.remove('tab-active'));

    // Add tab-active class to the clicked tab
    this.classList.add('tab-active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    // Show the corresponding tab content
    const tabContent = document.getElementById(this.getAttribute('data-tab'));
    tabContent.style.display = 'block';
  });
});

// ====================================
// Comment section 
// ====================================

function formatTime(timestamp) {
  const now = new Date();
  const postTime = new Date(timestamp);
  const timeDifference = now - postTime;

  const msInDay = 24 * 60 * 60 * 1000;

  if (timeDifference < msInDay && now.getDate() === postTime.getDate()) {
    return `Today ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 2 && now.getDate() !== postTime.getDate()) {
    return `Yesterday ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (timeDifference < msInDay * 7) {
    const daysAgo = Math.floor(timeDifference / msInDay);
    return `${daysAgo} days ago ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return postTime.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) + ` ${postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

document.getElementById('studentCmtPostBtn').addEventListener('click', function () {
  const textValue = document.getElementById('studentComment').value;
  const timestamp = Date.now(); // Get the current timestamp in milliseconds
  const formattedTime = formatTime(timestamp);

  if (textValue.trim() !== "") {
    const commentSection = document.getElementById('commentSection');

    // Create the comment div
    const commentDiv = document.createElement('div');
    commentDiv.className = 'flex mt-7';

    // User profile image
    const userProfileImg = document.createElement('img');
    userProfileImg.className = 'w-10 h-10 rounded-full border-2 border-primary';
    userProfileImg.src = 'assets/img/user.png';
    userProfileImg.alt = 'user profile';

    // Create comment content
    const commentContentDiv = document.createElement('div');
    commentContentDiv.className = 'pl-3 flex gap-3 w-full justify-between';

    // Comment text container
    const textContainer = document.createElement('div');
    const nameAndTimeDiv = document.createElement('div');
    nameAndTimeDiv.className = 'flex gap-1 items-center';

    const userName = document.createElement('p');
    userName.className = 'font-semibold text-base';
    userName.textContent = 'Faisal';

    const timeSpan = document.createElement('span');
    timeSpan.textContent = formattedTime;

    const timeText = document.createElement('p');
    timeText.className = 'text-black/50 underline text-sm';
    timeText.innerHTML = `at ${timeSpan.outerHTML}`;

    nameAndTimeDiv.appendChild(userName);
    nameAndTimeDiv.appendChild(timeText);

    const commentParagraph = document.createElement('p');
    commentParagraph.className = 'max-w-[85%]';
    commentParagraph.textContent = textValue;

    textContainer.appendChild(nameAndTimeDiv);
    textContainer.appendChild(commentParagraph);

    // Time of posting
    const timePosted = document.createElement('p');
    timePosted.className = 'min-w-fit';
    timePosted.textContent = formattedTime;

    commentContentDiv.appendChild(textContainer);
    commentContentDiv.appendChild(timePosted);

    // Assemble comment section
    commentDiv.appendChild(userProfileImg);
    commentDiv.appendChild(commentContentDiv);

    // Prepend the new comment to the comment section
    commentSection.insertBefore(commentDiv, commentSection.firstChild);

    // Clear the textarea after posting
    document.getElementById('studentComment').value = '';
  }
});

// ====================================
// Timeline details
// ====================================

const timelineBadgeBtn = document.querySelector('.timeline-badge-btn')
const timelineWindow = document.getElementById('timeline-window');
const timelineInsideBtn = document.getElementById("timeline-inside-btn")

document.querySelector('.timeline-badge-btn').addEventListener('click', function () {

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');
})

document.getElementById('timeline-inside-btn').addEventListener('click', function () {



  const accordion = document.querySelector('.accordion');

  // toggle width and padding when click the shrink button
  timelineBadgeBtn.classList.toggle('hidden');
  timelineWindow.classList.toggle('hidden');

});

// ====================================
// Slider details
// ====================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Swiper
  var swiper = new Swiper(".courseSlide", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});