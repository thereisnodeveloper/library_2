const testElem = document.querySelector('body');

const libraryArray = [];

const saveToLibrary = function (titleInput, authorInput, pagesInput, isReadInput) {
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
  constructor() {}
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
    Library.attachEventListenerToRemoveButton();
    Library.attachEventListenerToReadButton();
  }

  static {
    this.domElements = {
      /** @type {HTMLFormElement} */
      form: document.querySelector('.book-form'),
      modal: document.querySelector('.book-form-dialog'),
      buttonAddNewBook: document.querySelector('.new-book'),
      closeModal: document.querySelector('.close'),
      submit: document.querySelector("button[type='submit']"),
      /** @type {HTMLInputElement} */
      bookTitle: document.querySelector('#title'),
      /** @type {HTMLInputElement} */
      bookAuthor: document.querySelector('#author'),
      /** @type {HTMLInputElement} */
      bookPages: document.querySelector('#pages'),
      /** @type {HTMLInputElement} */
      bookIsRead: document.querySelector('#isread'),
    };
  }
  //ewqljewq
  static bulkAddEventListeners() {
    Library.domElements.buttonAddNewBook.addEventListener('click', () => {
      Library.domElements.modal.showModal();
    });

    Library.domElements.closeModal.addEventListener('click', () => {
      Library.domElements.modal.close();
    });

    Library.domElements.submit.addEventListener('click', submitFormNewBook);
  }

  static attachEventListenerToRemoveButton() {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach((removeButton) => {
      removeButton.addEventListener('click', removeBook);
    });
  }

  static attachEventListenerToReadButton() {
    const readButtons = document.querySelectorAll('.read');
    readButtons.forEach((readButton) => {
      readButton.addEventListener('click', readBook);
    });
  }
}

(function initiate() {
  // console.log(Library.eventListenersList);
  Library.bulkAddEventListeners(Library.eventListenersList);
})();

//TODO: add custom error msg
function throwValidationError() {
  Library.domElements.bookTitle.setCustomValidity('invalid book title');
  // throw new Error('Form aint valid, my g');
  // alert('Form aint valid, my g');
}

function submitFormNewBook(evt) {
  evt.preventDefault();

  // Library.domElements.bookAuthor.validity.value;

  //check book title

  // function isBookTitleValid() {
  //   Library.domElements.bookTitle.setCustomValidity('');
  //   if (!Library.domElements.bookTitle.validity.valid) {
  //     Library.domElements.bookTitle.setCustomValidity('3-5 characters');
  //     return false;
  //   } else {
  //     Library.domElements.bookTitle.setCustomValidity('');
  //     return true;
  //   }
  // }

  // function isBookAuthorValid() {
  //   const bookAuthor = Library.domElements.bookAuthor.validity;
  //   if (bookAuthor.valueMissing || bookAuthor.patternMismatch) {
  //     console.log('pattern mismatch!');
  //     Library.domElements.bookAuthor.reportValidity();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  //TODO: check everytime input is changed, not submit
  function isBookPagesValid() {
    const bookPages = Library.domElements.bookPages;
    bookPages.setCustomValidity('');
    if(bookPages.validity.typeMismatch)

    if(!bookPages.validity.valid) {
    }
  }

  function isFormValid() {
    Library.domElements.bookIsRead.willValidate = false
    // Library.domElements.bookIsRead.formNoValidate
    return Library.domElements.form.checkValidity();
  }
  console.log('isFormValid():', isFormValid());

  //FIXME:
  //submit form
  if (
    isFormValid()

    // isBookTitleValid() && isBookAuthorValid()
  ) {
    // evt.preventDefault();
    const formDataArray = extractFormData();

    saveToLibrary(...formDataArray);
    Library.domElements.modal.close();
    Library.displayBooks();
  }
}

function extractFormData() {
  const formIsRead = document.querySelector('#isread');
  const formControls = document.querySelectorAll('form input:not(#isread)');
  const formDataArray = [];
  formControls.forEach((formElement) => {
    formDataArray.push(formElement.value);
  });
  formDataArray.push(formIsRead.checked);
  return formDataArray;
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

const domElements = {
  modal: document.querySelector('.book-form-dialog'),
  buttonAddNewBook: document.querySelector('.new-book'),
  closeModal: document.querySelector('.close'),
  submit: document.querySelector("button[type='submit']"),
};
