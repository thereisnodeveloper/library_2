const libraryArray = [];

const takeUserInput = function (titleInput, authorInput, pagesInput, isReadInput) {
  libraryArray.push(new Book(titleInput, authorInput, pagesInput, isReadInput));
};

//book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//TEST: add book
//TEST: remove book
//TEST: read book

//REFAC: create library Object
//REFAC: extract function

//library factory function
class Library {
  static displayBooks() {
    const tableRows = document.querySelectorAll('tbody > tr');
    tableRows.forEach((row) => {
      row.remove();
    });

    let index = 0;

    libraryArray.forEach((book) => {
      const tbody = document.querySelector('tbody');
      const tr = tbody.insertRow();
      tr.setAttribute('index', index);
      for (const [key, value] of Object.entries(book)) {
        const td = tr.insertCell();
        td.textContent = value;
      }
      const tdRemoveButton = tr.insertCell();
      addRemoveButton(tdRemoveButton);
      const tdReadButton = tr.insertCell();
      addReadButton(tdReadButton);
      index++;
    });
    attachEventListenerToRemoveButton();
    attachEventListenerToReadButton();
  }

  static {
    this.domElements = {
      modal: document.querySelector('.book-form-dialog'),
      buttonAddNewBook: document.querySelector('.new-book'),
      closeModal: document.querySelector('.close'),
      submit: document.querySelector("button[type='submit']"),
    };
  }
}
// Library.domElements.
Library.domElements.buttonAddNewBook.addEventListener('click', () => {
  Library.domElements.modal.showModal();
});

Library.domElements.closeModal.addEventListener('click', () => {
  Library.domElements.modal.close();
});

Library.domElements.submit.addEventListener('click', addNewBook);

function addNewBook(e) {
  e.preventDefault();
  const formIsRead = document.querySelector('#isread');
  const forms = document.querySelectorAll('form input:not(#isread)');
  const formsArray = [];
  forms.forEach((formElement) => {
    formsArray.push(formElement.value);
  });
  formsArray.push(formIsRead.checked);

  takeUserInput(...formsArray);
  Library.domElements.modal.close();
  Library.displayBooks();
}

function attachEventListenerToRemoveButton() {
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', removeBook);
  });
}

function attachEventListenerToReadButton() {
  const readButtons = document.querySelectorAll('.read');
  readButtons.forEach((readButton) => {
    readButton.addEventListener('click', readBook);
  });
}

function removeBook(e) {
  const targetRow = e.target.parentElement.parentElement;

  //remove from libraryArray
  const index = targetRow.getAttribute('index');
  libraryArray.splice(index, 1);
  //remove from display
  targetRow.remove();
}

function readBook(e) {
  const targetRow = e.target.parentElement.parentElement;
  const index = targetRow.getAttribute('index');

  //toggle isRead
  if (libraryArray[index].isRead === true) {
    libraryArray[index].isRead = false;
  } else {
    libraryArray[index].isRead = true;
  }
  Library.displayBooks();
}

function addRemoveButton(row) {
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = 'Remove';
  row.appendChild(removeButton);
}

function addReadButton(row) {
  const readButton = document.createElement('button');
  readButton.classList.add('read');
  readButton.textContent = 'Read';
  row.appendChild(readButton);
}

attachEventListenerToRemoveButton();
