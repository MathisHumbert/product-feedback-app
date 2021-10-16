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
  let comments = data.comments;

  comments.forEach((item) => {
    let { content, user, replies } = item;
    let { image, name, username } = user;
    console.log(replies);
  });
}

{
  /* <article class="single-comment">
  <div class="main-comment comment">
    <div class="comment-header">
      <div class="info-person">
        <img
          src="../data/assets/user-images/image-anne.jpg"
          alt="logo"
          class=""
        />
        <div class="container">
          <h4>Elijah Moss</h4>
          <p>@jejejekeeke</p>
        </div>
      </div>
      <p class="reply">Reply</p>
    </div>
    <p class="text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
      consequatur eaque illo officiis ad fuga sit magnam quidem quam facere.
      Rerum ipsa obcaecati expedita optio, reprehenderit nobis similique modi
      inventore.
    </p>
  </div>
</article> */
}
