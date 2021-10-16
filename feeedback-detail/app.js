import fetchData from '../home-page/utils/fetchData.js';
import toggleUpVotes from '../home-page/utils/toggleUpVotes.js';

const singleItem = document.querySelector('.single-item-feedback');
const comments = document.querySelector('.all-comments');

async function getData(URL) {
  let data = await fetchData(URL);

  displaySingleItem(data.productRequests);
  displayComments(data.productRequests);
}
window.addEventListener('DOMContentLoaded', () => {
  getData('../data/data.json');
});

function displaySingleItem(data) {
  let localId = localStorage.getItem('id-item');

  data = data.filter((item) => item.id == localId)[0];
  let { title, category, upvotes, description, comments } = data;

  singleItem.innerHTML = `
  <div class="single-item-text">
        <a href="#" class="item-link">${title}</a>
        <p>${description}</p>
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
  `;
  const upvote = singleItem.querySelector('.upvotes');

  upvote.addEventListener('click', toggleUpVotes);
}

function displayComments(data) {
  let localId = localStorage.getItem('id-item');
  data = data.filter((item) => item.id == localId)[0];
  let allComments = data.comments;

  if (allComments === undefined) {
    return false;
  }

  allComments.forEach((item) => {
    let comment = document.createElement('article');
    comment.className = 'single-comment';
    let { content, user, replies } = item;
    let { image, name, username } = user;

    comment.innerHTML = `
    <div class="main-comment comment">
  <div class="comment-header">
    <div class="info-person">
      <img
        src="${image}"
        alt="logo"
        class=""
      />
      <div class="container">
        <h4>${name}</h4>
        <p>@${username}</p>
      </div>
    </div>
    <p class="reply">Reply</p>
  </div>
  <p class="text">
    ${content}
  </p>
</div>

    `;

    if (!(replies === undefined)) {
      displayReply(replies, comment);
    }

    comments.appendChild(comment);
  });
}

function displayReply(replies, element) {
  replies.forEach((item) => {
    let comment = document.createElement('div');
    comment.className = 'reply-comment comment';
    let { content, user, replies } = item;
    let { image, name, username } = user;

    comment.innerHTML = `
  <div class="comment-header">
    <div class="info-person">
      <img
        src="${image}"
        alt="logo"
        class=""
      />
      <div class="container">
        <h4>${name}</h4>
        <p>@${username}</p>
      </div>
    </div>
    <p class="reply">Reply</p>
  </div>
  <p class="text">
    ${content}
  </p>
    `;

    if (!(replies === undefined)) {
      displayReply(replies, comment);
    }

    element.appendChild(comment);
  });
}
