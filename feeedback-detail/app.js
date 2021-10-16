import fetchData from '../home-page/utils/fetchData.js';
import toggleUpVotes from '../home-page/utils/toggleUpVotes.js';

const singleItem = document.querySelector('.single-item-feedback');
const commentsContainer = document.querySelector('.comments-container');
const numCom = document.querySelector('.num-com');
const formComment = document.querySelector('.form-comment');
const textaeraComment = document.querySelector('.textarea-comment');
const numChar = document.querySelector('.char-num');

async function getData(URL) {
  let data = await fetchData(URL);

  displaySingleItem(data.productRequests);
  displayComments(data);
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
  let profileData = data.currentUser;
  data = data.productRequests;
  data = data.filter((item) => item.id == localId)[0];
  let allComments = data.comments;

  if (allComments === undefined) {
    numCom.innerHTML = `There is no comments yet`;
    return false;
  }

  numCom.innerHTML = `${data.comments.length} ${
    data.comments.length > 1 ? 'Comments' : 'Comment'
  }`;

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
<form action="#" class="form-reply">
  <textarea
    maxlength="250"
    placeholder="Type your comment here"
    class="textarea-reply"
  ></textarea>
  <button class="post-reply">post reply</button>
</form>
</div>
    `;

    if (!(replies === undefined)) {
      displayReply(replies, comment, username);
    }

    commentsContainer.appendChild(comment);
  });

  const replyBtn = document.querySelectorAll('.reply');

  replyBtn.forEach((btn) => btn.addEventListener('click', showReply));
}

function displayReply(replies, element, previousName) {
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
    <span class= "previous-comment">@${previousName} </span>${content}
  </p>

<form action="#" class="form-reply">
  <textarea
    maxlength="250"
    placeholder="Type your comment here"
    class="textarea-reply"
  ></textarea>
  <button class="post-reply">post reply</button>
</form>
    `;

    if (!(replies === undefined)) {
      displayReply(replies, comment);
    }

    element.appendChild(comment);
  });
}

function showReply() {
  this.parentElement.parentElement.children[2].classList.toggle('show');
}

formComment.addEventListener('submit', addNewComment);
textaeraComment.addEventListener('keyup', charactersLeft);

function addNewComment(e) {
  e.preventDefault();
  const commentValue = textaeraComment.value;
  this.reset();

  // set a new comment
}

function charactersLeft() {
  console.log(numChar);
  const value = textaeraComment.value.length;
  numChar.innerHTML = `${250 - value} Characters left`;
}
