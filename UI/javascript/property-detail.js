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
const deletePropertyForm = document.querySelector('.delete-property-form');
const deleteBtn = document.querySelectorAll('.sold-btn');

modalCloseBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    allForms.forEach((form) => {
      form.style.display = 'none';
    });
  });
});

deleteBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = 'block';
    deletePropertyForm.style.display = 'block';
  });
});