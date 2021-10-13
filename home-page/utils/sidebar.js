const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');

// exite the slidebar if click outside
function exitSlidebar(e) {
  if (
    e.target.classList.contains('sidebar') ||
    e.target.classList.contains('sidebar-btn')
  ) {
    sidebar.classList.remove('show');
    toggleSidebarBtn.innerHTML =
      '<img src="../data/assets/shared/mobile/icon-hamburger.svg" alt="" />';
  }
}

// toggle the slidebar
function displaySidebar(e) {
  let source = e.currentTarget.children[0].src;
  if (source.includes('hamburger')) {
    sidebar.classList.add('show');
    toggleSidebarBtn.innerHTML =
      '<img src="../data/assets/shared/mobile/icon-close.svg" alt="" />';
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.remove('show');
    toggleSidebarBtn.innerHTML =
      '<img src="../data/assets/shared/mobile/icon-hamburger.svg" alt="" />';
    document.body.style.overflow = 'visible';
  }
}

export { exitSlidebar, displaySidebar };
