const libraryArray = [];

const takeUserInput = function(titleInput,authorInput, pagesInput){
    // const authorInput = prompt("enter author name")
    // const pagesInput = prompt('enter # pages')
    libraryArray.push(new Book(titleInput, authorInput, pagesInput))
}

//book constructor
function Book(title, author,pages,isread){
    this.title = title
    this.author = author;
    this.pages = pages;
    this.isread = false;
}


//placeholder books
takeUserInput('The Bible','Shakespeare', 444)
takeUserInput('Chinese Manifesto','Mao Ze Dong', 555)


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

const modal = document.querySelector(".book-form-dialog")

const newBook = document.querySelector(".new-book")
newBook.addEventListener("click", ()=>{
    modal.showModal()
})

const closeModal = document.querySelector(".close")
closeModal.addEventListener("click", ()=>{
    modal.close()
})

const submit = document.querySelector("button[type='submit']")
submit.addEventListener("click", ()=>{
    e.preventdefault
    //TODO:add book to library
    const formTitle = document.querySelector("#title").value
})
