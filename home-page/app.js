// import
import { exitSlidebar, displaySidebar } from './utils/sidebar.js';
import { getSort, displaySort, filterSort } from './utils/sortFunctions.js';
import {
  getCategory,
  displayCategory,
  filterCategory,
} from './utils/categoryFuntions.js';
import displayNumbers from './utils/displayNumbers.js';
import displayProducts from './utils/displayProducts.js';
import fetchData from './utils/fetchData.js';

// get elements
const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const sort = document.querySelector('.sort');
const sortHeader = document.querySelector('.sort-header');
const selectSuggestions = document.querySelector('.select-suggestions');
const sidebarBtn = document.querySelectorAll('.sidebar-btn');
const categoryBtn = document.querySelectorAll('.category-btn');

// ALL EVENTS

// winfow event for loading everything
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

// get the data and call the displayProducts
async function getProductRequests(URL, category, sort) {
  // get the data
  let data = await fetchData(URL);
  data = data.productRequests;

  // filter data by category
  data = filterCategory(data, category);

  // filter data by sort
  data = filterSort(data, sort);

  // display the number of suggestions and roadmap
  displayNumbers(data);

  // display HTML
  displayProducts(data);
}

export { getProductRequests };
