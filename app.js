const sidebar = document.querySelector('.sidebar');
const toggleSidebarBtn = document.querySelector('.toggle-sidebar-btn');
const mainFeedback = document.querySelector('.main-feedback');
const sort = document.querySelector('.sort');
const sortHeader = document.querySelector('.sort-header');
const selectSuggestions = document.querySelector('.select-suggestions');
const singleSelect = document.querySelectorAll('.single-select');
const sortResult = document.querySelector('.sort-result');

window.addEventListener('DOMContentLoaded', () => {
  getProductRequests('./data.json', 'Most Upvotes');
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

async function getProductRequests(URL, filterSort) {
  const data = await fetchData(URL);
  displayProducts(data, filterSort);
}

function displayProducts(data, filterSort) {
  if (filterSort === 'Most Upvotes') {
    data = filterMostVotes(data);
  } else if (filterSort === 'Least Upvotes') {
    data = filterLeastVotes(data);
  } else if (filterSort === 'Most Comments') {
    data = filterMostComments(data);
  } else {
    data = filterLeastComments(data);
  }
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
    <button class="main-btn">${category}</button>
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
  const upvotesBtn = mainFeedback.querySelectorAll('.upvotes');
  upvotesBtn.forEach((btn) =>
    btn.addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
        this.children[0].src = './assets/shared/arrow-up-white.svg';
      } else {
        this.classList.remove('active');
        this.children[0].src = './assets/shared/icon-arrow-up.svg';
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
    singleSelect.forEach((item) => item.classList.remove('show'));
    e.target.parentElement.classList.add('show');
    sortResult.textContent = e.target.textContent;

    sort.classList.remove('show');
    // display html
    getProductRequests('./data.json', e.target.textContent);
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
