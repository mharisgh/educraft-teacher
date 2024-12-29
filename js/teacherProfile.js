// Reference to the change button and file input
const changeBtn = document.getElementById('change-btn');
const fileInput = document.getElementById('file-input');
const profileImage = document.getElementById('profile-image');

// Show file explorer when clicking the change button
changeBtn.addEventListener('click', () => {
  fileInput.click();
});

// Update the profile image when a file is selected
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file); // Convert the file to a data URL
  } else {
    alert("Please select a valid image file (JPEG or PNG).");
  }
});