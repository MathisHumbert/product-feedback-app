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

export {
  filterLeastComments,
  filterMostComments,
  filterLeastVotes,
  filterMostVotes,
};
