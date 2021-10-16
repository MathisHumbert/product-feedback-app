import displaySingleItem from './displaySingleItem.js';
import toggleUpVotes from './toggleUpVotes.js';

const mainFeedback = document.querySelector('.main-feedback');

function displayProducts(data) {
  // if there is no element
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

  // if there is element
  let dataHtml = displaySingleItem(data);
  // push the html
  mainFeedback.innerHTML = dataHtml;

  // get element
  const upvotesBtn = mainFeedback.querySelectorAll('.upvotes');
  const ItemLink = mainFeedback.querySelectorAll('.item-link');

  // event for upvote click
  upvotesBtn.forEach((btn) => btn.addEventListener('click', toggleUpVotes));

  // set id of the item click on in local storage
  ItemLink.forEach((link) => {
    link.addEventListener('click', (e) =>
      localStorage.setItem('id-item', e.target.dataset.id)
    );
  });
}

export default displayProducts;
