// import
import { getProductRequests } from '../app.js';

// get elements
const singleSelect = document.querySelectorAll('.single-select');
const sortResult = document.querySelector('.sort-result');
const sort = document.querySelector('.sort');

// main function
function getSort(e) {
  if (e.target.classList.contains('sort-filter')) {
    let value = e.target.textContent;

    // display css
    displaySort(value);

    // display HTML
    getProductRequests(
      '../data/data.json',
      localStorage.getItem('category') || 'All',
      value
    );
  } else return;
}

// display the CSS
function displaySort(value) {
  // display the sort
  singleSelect.forEach((item) => item.classList.remove('show'));
  singleSelect.forEach((item) => {
    if (item.children[0].textContent === value) item.classList.add('show');
  });

  sortResult.textContent = value;
  sort.classList.remove('show');
}

// all of the function that sort

// return the fuction slected
function filterSort(data, sort) {
  // push it to local storage
  localStorage.setItem('sort', sort);

  // return the filter
  if (sort === 'Most Upvotes') {
    return filterMostVotes(data);
  } else if (sort === 'Least Upvotes') {
    return filterLeastVotes(data);
  } else if (sort === 'Most Comments') {
    return filterMostComments(data);
  } else {
    return filterLeastComments(data);
  }
}

// sort most votes
function filterMostVotes(data) {
  data.sort((a, b) => {
    if (a.upvotes < b.upvotes) return 1;
    else if (a.upvotes > b.upvotes) return -1;
    else return 0;
  });
  return data;
}

// sort least votes
function filterLeastVotes(data) {
  data.sort((a, b) => {
    if (a.upvotes < b.upvotes) return -1;
    else if (a.upvotes > b.upvotes) return 1;
    else return 0;
  });
  return data;
}

// sort most comments
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
  return data;
}

// sort least comments
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

export { getSort, displaySort, filterSort };
