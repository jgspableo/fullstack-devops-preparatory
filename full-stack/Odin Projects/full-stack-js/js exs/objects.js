function Book(title, author, numberOfPages, hasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.hasRead = hasRead;

  this.info = function () {
    let hasReadMessage = "";
    if (this.hasRead == true) {
      hasReadMessage = "has been read";image.png
    } else {
      hasReadMessage = "not read yet";
    }

    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${hasReadMessage}`;
  };
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book1.info());

console.log(Object.getPrototypeOf(Book.prototype) === Object.prototype);
console.log(book1.valueOf());
