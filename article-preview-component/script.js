const button = document.querySelector('.card__share-btn');
const toast = document.querySelector('.share__toast');

button.addEventListener('click', function (e) {
  toast.classList.toggle('hidden');
});

document.addEventListener('click', function (e) {
  if (!button.contains(e.target) && !toast.contains(e.target)) {
    toast.classList.add('hidden');
  }
});
