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
  let dataHtml = data
    .map((item) => {
      // destructuring
      let { id, title, category, upvotes, description, comments } = item;

      // return the html
      return `
<section class="single-item-feedback">
  <div class="single-item-text">
    <a href="../feedback-edit/feedback-edit.html" class="item-link" data-id="${id}">${title}</a>
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

// CSS and HTML toggle upvotes
function toggleUpVotes() {
  if (!this.classList.contains('active')) {
    this.classList.add('active');
    this.children[0].src = '../data/assets/shared/arrow-up-white.svg';
    this.children[1].textContent = parseInt(this.children[1].textContent) + 1;
  } else {
    this.classList.remove('active');
    this.children[0].src = '../data/assets/shared/icon-arrow-up.svg';
    this.children[1].textContent = this.children[1].textContent - 1;
  }
}

export default displayProducts;
