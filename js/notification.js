document.addEventListener('DOMContentLoaded', () => {
  const notificationBtn = document.getElementById('notificationBtn');
  // const notificationBtns = document.querySelectorAll('.notification-btn');
  const popupNotification = document.getElementById('popupNotification');
  const closePopup = document.getElementById('closeNotificationPopup');

  // Show popup when notification button is clicked
  notificationBtn.addEventListener('click', () => {
    console.log('first')
    popupNotification.classList.toggle('hidden'); // Toggle visibility
    popupNotification.classList.toggle('lg:flex'); // Toggle visibility
  });


  // Close the popup when the close button is clicked
  closePopup.addEventListener('click', () => {
    popupNotification.classList.add('hidden'); // Hide the popup
    popupNotification.classList.toggle('lg:flex'); // Toggle visibility
  });

  // Optional: Close the popup when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === popupNotification) {
      popupNotification.classList.add('hidden'); // Hide the popup
    }
  });
});
