const menuButton = document.querySelector('.menu');
const menuBar = document.querySelector('.menu-drop-down');

menuButton.addEventListener('click', (event) => {
  menuBar.classList.toggle('on');
});