var swiper = new Swiper(".BadgeSlider", {
  slidesPerView: 'auto', // Default to 1 slide per view
  spaceBetween: 16, // Space between slides
  // pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  // },
});

document.addEventListener('DOMContentLoaded', function() {
  const headers = document.querySelectorAll('.journey-accordion-header');

  headers.forEach(header => {
      header.addEventListener('click', () => {
          const isActive = header.classList.contains('active');
          const arrow = header.querySelector('img');

          // Collapse all
          document.querySelectorAll('.journey-accordion-header').forEach(h => {
              h.classList.remove('active');
              h.querySelector('img').style.transform = 'rotate(0deg)'; // Reset arrow rotation
          });
          document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));

          // Expand the clicked one if it wasn't already active
          if (!isActive) {
              header.classList.add('active');
              header.nextElementSibling.classList.add('active');
              arrow.style.transform = 'rotate(180deg)'; // Rotate arrow
          }
      });
  });
});
