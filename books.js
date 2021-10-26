const placeToAddBook = document.querySelector('.bookList');
const readTitle = document.querySelector('#title');
const readAuthor = document.querySelector('#author');

// Array for storing a books
let arrayBooks = [];

function setFromLocalStorage() {
  arrayBooks = JSON.parse(localStorage.getItem('books'));
}

function setToLocalStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
  const bookToStore = {
    title: readTitle.value,
    author: readAuthor.value,
  };
  arrayBooks.push(bookToStore);
  setToLocalStorage(arrayBooks);
}

function addToPage(book) {
  placeToAddBook.innerHTML += `
  <div class="myDiv">
    <h4 class="title">"${book.title}" By ${book.author}</h4>
    <button class="remove">Remove</button>
  </div>
  <hr>`;
}

if (localStorage.getItem('books')) {
  setFromLocalStorage();
  arrayBooks.forEach((book) => {
    addToPage(book);
  });
}

function removeElement(index) {
  arrayBooks.splice(index, 1);
  setToLocalStorage(arrayBooks);
  window.location.reload(false);
}

// Add book button and event
const addButton = document.querySelector('#addBook');
addButton.addEventListener('click', addBook);

// Remove book button and event
const allRemoveBtn = document.querySelectorAll('.remove');
const removeButtons = Array.from(allRemoveBtn);
removeButtons.forEach((book) => book.addEventListener('click', () => {
  removeElement(removeButtons.indexOf(book));
}));