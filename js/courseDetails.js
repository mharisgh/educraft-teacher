
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
// Play pause video & icon change on timeline
// ============================================

const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');

playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseIcon.src = '/assets/icons/pause-orange.svg';
    playPauseIcon.alt = 'Pause';
  } else {
    video.pause();
    playPauseIcon.src = '/assets/icons/play-orange.svg';
    playPauseIcon.alt = 'Play';
  }
});


// ============================================
// Timeline progress ring
// ============================================

function setProgress(percent) {
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  document.querySelector('p').textContent = `${percent}%`;
}

// Set the initial percentage
setProgress(20);

// ============================================
// Overivew, Comments, Downloads - Tabs
// ============================================

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));

    // Add active class to the clicked tab
    this.classList.add('tab-active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    // Show the corresponding tab content
    const tabContent = document.getElementById(this.getAttribute('data-tab'));
    tabContent.style.display = 'block';
  });
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
