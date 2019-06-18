/* menu bar */
const menuButton = document.querySelector('.menu');
const menuBar = document.querySelector('.menu-drop-down');

menuButton.addEventListener('click', (event) => {
  menuBar.classList.toggle('on');
});

/* modal */
const modal = document.getElementById('myModal');
const modalCloseBtn = document.querySelectorAll('.modal-close-btn');
const allForms = document.querySelectorAll('.property-form');
const addPropertyForm = document.querySelector('.add-property-form');
const addBtn = document.querySelector('.add-property-btn');

modalCloseBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    allForms.forEach((form) => {
      form.style.display = 'none';
    });
  });
});

addBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  addPropertyForm.style.display = 'block';
});

/* loader */
const formBtn = document.querySelector('.form-btn');

formBtn.addEventListener('click', () => {
  document.querySelector('.loader').style.display = 'block';
})