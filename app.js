const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');

toggleSidebarBtn.addEventListener('click', displaySidebar);
sidebar.addEventListener('click', (e) => {
  if (e.target.classList.contains('sidebar')) {
    sidebar.classList.remove('show');
    toggleSidebarBtn.innerHTML =
      '<img src="./assets/shared/mobile/icon-hamburger.svg" alt="" />';
  }
});

function displaySidebar(e) {
  let source = e.currentTarget.children[0].src;
  if (source.includes('hamburger')) {
    sidebar.classList.add('show');
    toggleSidebarBtn.innerHTML =
      '<img src="./assets/shared/mobile/icon-close.svg" alt="" />';
  } else {
    sidebar.classList.remove('show');
    toggleSidebarBtn.innerHTML =
      '<img src="./assets/shared/mobile/icon-hamburger.svg" alt="" />';
  }
}
