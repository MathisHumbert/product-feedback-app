function displaySingleItem(data) {
  return data
    .map((item) => {
      // destructuring
      let { id, title, category, upvotes, description, comments } = item;

      // return the html
      return `
<section class="single-item-feedback">
  <div class="single-item-text">
    <a href="../feeedback-detail/feedback-detail.html" class="item-link" data-id="${id}">${title}</a>
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
}

export default displaySingleItem;
