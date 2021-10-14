// import
import { exitSlidebar, displaySidebar } from './utils/sidebar.js';
import { getSort, displaySort, filterSort } from './utils/sortFunctions.js';
import {
  getCategory,
  displayCategory,
  filterCategory,
} from './utils/categoryFuntions.js';

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
const numSug = document.querySelector('.num-sug');

window.addEventListener('DOMContentLoaded', () => {
  // load the hmtl with json
  getProductRequests(
    '../data/data.json',
    localStorage.getItem('category') || 'All',
    localStorage.getItem('sort') || 'Most Upvotes'
  );

  // display the sort html
  displaySort(localStorage.getItem('sort') || 'Most Upvotes');

  // display the category html
  displayCategory(localStorage.getItem('category') || 'All');
});

// sidebar events
toggleSidebarBtn.addEventListener('click', displaySidebar);
sidebar.addEventListener('click', exitSlidebar);

// sort events
sortHeader.addEventListener('click', () => sort.classList.toggle('show'));
selectSuggestions.addEventListener('click', getSort);

// category events
sidebarBtn.forEach((btn) => {
  btn.addEventListener('click', getCategory);
  btn.addEventListener('click', exitSlidebar);
});
categoryBtn.forEach((btn) => {
  btn.addEventListener('click', getCategory);
});

async function fetchData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.productRequests;
}

async function getProductRequests(URL, category, sort) {
  // get the data
  let data = await fetchData(URL);

  // filter data by category
  data = filterCategory(data, category);

  // filter data by sort
  data = filterSort(data, sort);

  numSug.innerHTML = `${data.length} Suggestions`;

  // display HTML
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

export { getProductRequests };
