// import
import { exitSlidebar, displaySidebar } from './utils/sidebar.js';

const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const mainFeedback = document.querySelector('.main-feedback');
const sort = document.querySelector('.sort');
const sortHeader = document.querySelector('.sort-header');
const selectSuggestions = document.querySelector('.select-suggestions');
const singleSelect = document.querySelectorAll('.single-select');
const sortResult = document.querySelector('.sort-result');
const sidebarBtn = document.querySelectorAll('.sidebar-btn');
const categoryBtn = document.querySelectorAll('.category-btn');

window.addEventListener('DOMContentLoaded', () => {
  getProductRequests('../data/data.json', 'Most Upvotes');
});

// sidebar event
toggleSidebarBtn.addEventListener('click', displaySidebar);
sidebar.addEventListener('click', exitSlidebar);

async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.productRequests;
}

async function getProductRequests(URL) {
  const data = await fetchData(URL);
  // data = filterData(sort, category);
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
    <h1>${title}</h1>
    <p>
      ${description}
    </p>
    <button class="main-btn">${category}</button>
  </div>

  <button class="upvotes">
    <img src="../data/assets/shared/icon-arrow-up.svg" alt="" />
    <p>${upvotes}</p>
  </button>

  <div class="questions">
    <img src="../data/assets/shared/icon-comments.svg" alt="" />
    <p>${comments === undefined ? 0 : comments.length}</p>
  </div>
</div>
    `;
    })
    .join('');

  mainFeedback.innerHTML = dataHtml;
  const upvotesBtn = mainFeedback.querySelectorAll('.upvotes');
  upvotesBtn.forEach((btn) =>
    btn.addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
        this.children[0].src = '../data/assets/shared/arrow-up-white.svg';
      } else {
        this.classList.remove('active');
        this.children[0].src = '../data/assets/shared/icon-arrow-up.svg';
      }
    })
  );
}

sortHeader.addEventListener('click', displaySelection);
selectSuggestions.addEventListener('click', sortHtml);

function displaySelection(e) {
  sort.classList.toggle('show');
}

function sortHtml(e) {
  if (e.target.classList.contains('body1')) {
    // display css
    singleSelect.forEach((item) => item.classList.remove('show'));
    e.target.parentElement.classList.add('show');
    sortResult.textContent = e.target.textContent;
    localStorage.setItem('sort', e.target.textContent);
    sort.classList.remove('show');

    // display html
    getProductRequests('../data/data.json', e.target.textContent);
  } else return;
}

function filterMostVotes(data) {
  data.sort((a, b) => {
    if (a.upvotes < b.upvotes) return 1;
    else if (a.upvotes > b.upvotes) return -1;
    else return 0;
  });
  return data;
}

function filterLeastVotes(data) {
  data.sort((a, b) => {
    if (a.upvotes < b.upvotes) return -1;
    else if (a.upvotes > b.upvotes) return 1;
    else return 0;
  });
  return data;
}

function filterMostComments(data) {
  data.sort((a, b) => {
    if (
      (a.comments === undefined ? 0 : a.comments.length) <
      (b.comments === undefined ? 0 : b.comments.length)
    )
      return 1;
    else if (
      (a.comments === undefined ? 0 : a.comments.length) >
      (b.comments === undefined ? 0 : b.comments.length)
    )
      return -1;
    else return 0;
  });
  console.log(data);

  return data;
}

function filterLeastComments(data) {
  data.sort((a, b) => {
    if (
      (a.comments === undefined ? 0 : a.comments.length) <
      (b.comments === undefined ? 0 : b.comments.length)
    )
      return -1;
    else if (
      (a.comments === undefined ? 0 : a.comments.length) >
      (b.comments === undefined ? 0 : b.comments.length)
    )
      return 1;
    else return 0;
  });

  return data;
}

sidebarBtn.forEach((btn) => {
  btn.addEventListener('click', filterCategory);
});
categoryBtn.forEach((btn) => {
  btn.addEventListener('click', filterCategory);
});

function filterCategory() {
  let value = this.textContent;

  sidebarBtn.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.textContent === value) btn.classList.add('active');
  });
  categoryBtn.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.textContent === value) btn.classList.add('active');
  });
}
