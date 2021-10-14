// import
import { exitSlidebar, displaySidebar } from './utils/sidebar.js';
import { getSort, displaySort, filterSort } from './utils/sortFunctions.js';
import {
  getCategory,
  displayCategory,
  filterCategory,
} from './utils/categoryFuntions.js';
import displayNumbers from './utils/displayNumbers.js';

// get elements
const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const mainFeedback = document.querySelector('.main-feedback');
const sort = document.querySelector('.sort');
const sortHeader = document.querySelector('.sort-header');
const selectSuggestions = document.querySelector('.select-suggestions');
const sidebarBtn = document.querySelectorAll('.sidebar-btn');
const categoryBtn = document.querySelectorAll('.category-btn');

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

  // display the number of suggestions and roadmap
  displayNumbers(data);

  // display HTML
  displayProducts(data);
}

function displayProducts(data) {
  if (data.length === 0) {
    mainFeedback.innerHTML = `<section class="no-feedback">
    <img src="../data/assets/suggestions/illustration-empty.svg" alt="logo" class="logo">
    <h2>There is no feedback yet.</h2>
    <p>Got a suggestion? Found a bug that needs to be
    squashed? We love hearing about new ideas to improve our app.</p>
    <a href="../feedback-edit/feedback-edit.html" class="button1"
            ><img src=" ../data/assets/shared/icon-plus.svg" alt="" /> Add
            Feedback</a
          >
  </section>`;
    return;
  }
  let dataHtml = data
    .map((item) => {
      // destructuring
      let { id, title, category, upvotes, description, comments } = item;

      return `
    
<section class="single-item-feedback" data-id="${id}">
  <div class="single-item-text">
    <a href="../feedback-edit/feedback-edit.html" class="item-link">${title}</a>
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
</section>

    
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
        this.children[1].textContent =
          parseInt(this.children[1].textContent) + 1;
      } else {
        this.classList.remove('active');
        this.children[0].src = '../data/assets/shared/icon-arrow-up.svg';
        this.children[1].textContent = this.children[1].textContent - 1;
      }
    })
  );
}

export { getProductRequests };
