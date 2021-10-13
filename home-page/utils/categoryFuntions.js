// import
import { getProductRequests } from '../app.js';

// get elements
const sidebarBtn = document.querySelectorAll('.sidebar-btn');
const categoryBtn = document.querySelectorAll('.category-btn');

// main function
function getCategory() {
  let value = this.textContent;

  // display CSS
  displayCategory(value);

  // display HTML
  getProductRequests(
    '../data/data.json',
    value,
    localStorage.getItem('sort') || 'Most Upvotes'
  );
}

// display CSS
function displayCategory(value) {
  sidebarBtn.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.textContent === value) btn.classList.add('active');
  });
  categoryBtn.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.textContent === value) btn.classList.add('active');
  });
}

// display HTML
function filterCategory(data, category) {
  // get the category
  // push it to local storage
  localStorage.setItem('category', category);

  // return the filter
  if (category === 'all') return data;
  else {
    return (data = data.filter((item) => item.category === category));
  }
}

export { getCategory, displayCategory, filterCategory };
