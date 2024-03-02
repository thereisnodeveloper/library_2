const libraryArray = [];

const takeUserInput = function(authorInput, pagesInput){
    // const authorInput = prompt("enter author name")
    // const pagesInput = prompt('enter # pages')
    libraryArray.push(new Book(authorInput, pagesInput))
}

//book constructor
function Book(author,pages,isread){
    this.author = author;
    this.pages = pages;
    this.isread = false;
}


//placeholder books
takeUserInput('Shakespeare', 444)
takeUserInput('Mao Ze Dong', 555)


function displayBooks(){
    libraryArray.forEach((book)=>{
        const tbody = document.querySelector("tbody")
        const tr = tbody.insertRow()
        for(const [key, value] of Object.entries(book)){
            const td = tr.insertCell()
            td.textContent = value
        }
    })
}

displayBooks()


const newBook = document.querySelector(".new-book")
newBook.addEventListener("click", ()=>{
    document.querySelector(".book-form-dialog").showModal()

})

function showModal(){
    
}
