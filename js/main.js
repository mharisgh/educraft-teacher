// ===========================================
    // sidebar
    // ===========================================

    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const toggleIcon = document.getElementById('toggleIcon');
    const main = document.getElementById('main');
    const headerMenu = document.getElementById('header-menu');
    const menuItems = document.querySelectorAll('nav ul li');

    // if(headerMenu.classList.contains('pl-64'))

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('w-16');
      sidebar.classList.toggle('w-64');
      main.classList.toggle('pl-16');    
      main.classList.toggle('pl-64');
      headerMenu.classList.toggle('pl-16');
      headerMenu.classList.toggle('pl-64');
      
      sidebarTexts.forEach(text => text.classList.toggle('hidden'));
console.log(main.classList)
      // Toggle icon direction
      if (sidebar.classList.contains('w-16')) {
        toggleIcon.setAttribute('d', 'M9 18l6-6-6-6');
      } else {
        toggleIcon.setAttribute('d', 'M6 9l6 6 6-6');
      }
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
