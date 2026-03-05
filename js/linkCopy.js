// linkCopy.js — обновлённый для динамических блогов
const gridWrapper = document.querySelector('.grid-wrapper');

gridWrapper.addEventListener('click', e => {
  const icon = e.target.closest('.copy-link'); // проверяем, что клик по кнопке
  if (!icon) return;

  const blogElement = icon.closest('.blog-element');
  if (!blogElement || !blogElement.id) return;

  const url = `${window.location.origin}${window.location.pathname}#${blogElement.id}`;

  navigator.clipboard.writeText(url)
    .then(() => {
      icon.classList.add('copied');
      setTimeout(() => icon.classList.remove('copied'), 1200);
    })
    .catch(err => {
      console.error('Ошибка копирования:', err);
    });
});