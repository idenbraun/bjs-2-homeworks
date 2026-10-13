class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const found = this.books.find((book) => book[type] === value);
    return found || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);

    if (index === -1) {
      return null;
    }

    const [book] = this.books.splice(index, 1);
    return book;
  }
}

const testLibrary = new Library("Тестовая библиотека");

testLibrary.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
testLibrary.addBook(new Magazine("Мурзилка", 1924, 60));

let book1919 = testLibrary.findBookBy("releaseDate", 1919);
if (!book1919) {
	book1919 = new DetectiveBook("Агата Кристи", "Таинственное происшествие в Стайлзе", 1919, 296);
	testLibrary.addBook(book1919);
}

const givenBook = testLibrary.giveBookByName(book1919.name);
console.log("Выдана книга: " + givenBook.name);

givenBook.state = 20;
console.log("Состояние после повреждения: " + givenBook.state);

givenBook.fix();
console.log("Состояние после восстановления: " + givenBook.state);

testLibrary.addBook(givenBook);
console.log("Книга добавлена обратно: " + testLibrary.books.includes(givenBook));

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject]) {
      return 0;
    }

    const sum = this.marks[subject].reduce((total, mark) => total + mark, 0);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);

    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce((total, subject) => total + this.getAverageBySubject(subject), 0);
    return sum / subjects.length;
  }
}
