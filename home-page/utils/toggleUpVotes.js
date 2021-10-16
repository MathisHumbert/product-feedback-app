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

export default toggleUpVotes;
