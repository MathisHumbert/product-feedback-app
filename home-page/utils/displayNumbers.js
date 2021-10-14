const numSug = document.querySelector('.num-sug');
const planned = document.querySelectorAll('.planned');
const inProgress = document.querySelectorAll('.in-progress');
const live = document.querySelectorAll('.live');

function displayNumbers(data) {
  numSug.innerHTML = `${data.length} Suggestions`;

  planned.forEach(
    (plan) =>
      (plan.innerHTML = data.filter((item) => item.status === 'planned').length)
  );
  inProgress.forEach(
    (inp) =>
      (inp.innerHTML = data.filter(
        (item) => item.status === 'in-progress'
      ).length)
  );
  live.forEach(
    (li) =>
      (li.innerHTML = data.filter((item) => item.status === 'live').length)
  );
}

export default displayNumbers;
