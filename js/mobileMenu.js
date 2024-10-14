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
const hamburger = document.getElementById('hamburger');
const closeMenu = document.getElementById('close-menu');

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

if (closeMenu) {
  closeMenu.addEventListener('click', toggleMenu);
}
// Render menu items when the page loads
window.onload = renderMenuItems;
