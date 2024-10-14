// Get the elements
const postNewAnnouncementBtn = document.getElementById('postNewAnnoucementBtn');
const announcementPostPopup = document.getElementById('announcementPostPopup');
const closeAnnouncementPostPopupBtn = document.querySelectorAll('.close-announcement-post-popup-btn');

postNewAnnoucementBtn.addEventListener('click', () => {
  announcementPostPopup.classList.toggle('hidden');
  announcementPostPopup.classList.toggle('flex');
})

closeAnnouncementPostPopupBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    announcementPostPopup.classList.toggle('hidden');
    announcementPostPopup.classList.toggle('flex');
  })
})



// Select all tab buttons and content sections with unique class names
const tabButtons = document.querySelectorAll('.post-announcement-tab-btn');
const tabContents = document.querySelectorAll('.post-announcement-tab-content');

// Add event listeners to each tab button
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Switch active state
    tabButtons.forEach((btn) =>
      btn.classList.remove('bg-primary', 'text-white')
    );
    button.classList.add('bg-primary', 'text-white');

    // Get the target tab content ID from data attribute
    const targetTab = button.dataset.tab;

    // Show the target tab content, hide others
    tabContents.forEach((content) => {
      content.classList.toggle('hidden', content.id !== targetTab);
    });

    // Optional: Call your custom function on tab change
    onTabSwitch(targetTab);
  });
});

// Custom function to handle tab switching logic (optional)
function onTabSwitch(tab) {
  console.log(`Switched to ${tab} tab.`);
  // Add any custom behavior here
}



// Select the container and all radio options
const questionTypeContainer = document.getElementById('questionTypeContainer');
const radioOptions = document.querySelectorAll('.radioOption');

// Function to handle selection
function handleSelection(selectedOption) {
  // Remove selected class and border from all options
  radioOptions.forEach(option => {
    option.classList.remove('selected');
    option.classList.replace('border-[#9c663b]', 'border-black/5');
  });

  // Add selected class and border color to the clicked option
  selectedOption.classList.add('selected');
  selectedOption.classList.replace('border-black/5', 'border-[#9c663b]');
}

// Add click event listeners to each radio option
radioOptions.forEach(option => {
  option.addEventListener('click', () => {
    handleSelection(option);
    // Check the associated hidden input
    option.querySelector('input').checked = true;
  });
});