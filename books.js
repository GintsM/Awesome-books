/* eslint-disable */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
/* eslint-enable */
class Build {
  // Create array to store elements
  static getFromLocalStore() {
    let book;
    if (localStorage.getItem('book')) {
      book = JSON.parse(localStorage.getItem('book'));
    } else {
      book = [];
    }
    return book;
  }

  // Add to LocalStorage
  static addToLocalStore(book) {
    let storedBooks = Build.getFromLocalStore();// eslint-disable-line
    storedBooks.push(book);
    localStorage.setItem('book', JSON.stringify(storedBooks));
  }

  // Add book to array
  static addToarray() {
    const arrayBooks = Build.getFromLocalStore();
    arrayBooks.forEach((book) => Build.drawPage(book));
  }

  // Remove from LocalStorage
  static removeBook(target, index) {
    let storedBooks = Build.getFromLocalStore();// eslint-disable-line
    storedBooks.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(storedBooks));
    target.parentElement.parentElement.remove();
    window.location.reload(false);
  }

  // Display on a page
  static drawPage(book) {
    const div = document.createElement('div');
    div.classList.add('book-container');
    div.innerHTML = `
      <div class="heading flexwide">
        <h4>"${book.title}" By ${book.author}</h4>
      </div>
      <div class="button heading flexnarow">
        <button class="remove">Remove</button>
      </div>`;
    const atPlace = document.querySelector('#bookList');
    atPlace.appendChild(div);
  }

  static clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static fillMessage() {
    const message = document.createElement('span');
    message.classList.add('message');
    const messageParent = document.querySelector('#submitBtn');
    const messageSibling = document.querySelector('#addBook');
    messageParent.insertBefore(message, messageSibling);
    message.textContent = 'Please fill all fields';
    setTimeout(() => document.querySelector('.message').remove(), 4000);
  }

  // Display only one Section, IF YOU ARE IN funct upgrade
  static dislpayProper(index) {
    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections[index].classList.contains('hide')) {

      //here will be function to show msg if you are in that section// eslint-disable-linegit
    } else {
      sections.forEach((section) => {
        if (!section.classList.contains('hide')) {
          section.classList.toggle('hide');
        }
      });
      if (index === 0) {
        window.location.reload(false);
      }
      sections[index].classList.toggle('hide');
      Build.showTime(sections[index]);
    }
  }

  // Show a time
  static showTime(parent) {
    if (!parent.lastElementChild.hasAttribute('id')) {
      const DateTime = luxon.DateTime;// eslint-disable-line
      const timeSpan = document.createElement('span');
      timeSpan.setAttribute('id', 'time');
      parent.appendChild(timeSpan);
      setInterval(() => { timeSpan.innerHTML = `${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`; }, 1000);
    }
  }
}

// Starts here
Build.addToarray();
Build.showTime(document.getElementById('list'));

// Add book from Screen
const addBook = document.querySelector('#addBook');
addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  if (title.value === '' || author.value === '') {
    Build.fillMessage();
  } else {
    const newBook = new Book(title.value, author.value);
    Build.drawPage(newBook);
    Build.clearForm();
    Build.addToLocalStore(newBook);
  }
});

// Remove book from a list
const removeBtn = Array.from(document.querySelectorAll('.remove'));
removeBtn.forEach((btn) => btn.addEventListener('click', (e) => {
  Build.removeBook(e.target, removeBtn.indexOf(btn));
}));

// Select and apply eventlistener on navigation elements and read index in array
const navigation = Array.from(document.querySelectorAll('ul.links > li'));
navigation.forEach((link) => link.addEventListener('click', () => {
  Build.dislpayProper(navigation.indexOf(link));
}));