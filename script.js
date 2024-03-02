const libraryArray = [];

const takeUserInput = function(){
    const authorInput = prompt("enter author name")
    const pagesInput = prompt('enter # pages')
    libraryArray.push(new Book(authorInput, pagesInput))
}

//book constructor
function Book(author,pages,isread){
    this.author = author;
    this.pages = pages;
    this.isread = false;
}
