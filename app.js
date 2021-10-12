const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const mainFeedback = document.querySelector('.main-feedback');

window.addEventListener('DOMContentLoaded', () => {
  getProductRequests('./data.json');
});

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

async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.productRequests;
}

async function getProductRequests(URL) {
  const data = await fetchData(URL);
  displayProducts(data);
}

function displayProducts(data) {
  let dataHtml = data
    .map((item) => {
      // destructuring
      let { id, title, category, upvotes, description, comments } = item;

      return `
    <div class="single-item-feedback" data-id="${id}">
  <div class="single-item-text">
    <h4>${title}</h4>
    <p class="body3">
      ${description}
    </p>
    <button class="button2">${category}</button>
  </div>

  <button class="upvotes">
    <img src="./assets/shared/icon-arrow-up.svg" alt="" />
    <p>${upvotes}</p>
  </button>

  <div class="questions">
    <img src="./assets/shared/icon-comments.svg" alt="" />
    <p>${comments === undefined ? 0 : comments.length}</p>
  </div>
</div>
    `;
    })
    .join('');

  mainFeedback.innerHTML = dataHtml;
}
