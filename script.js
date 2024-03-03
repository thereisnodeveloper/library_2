const libraryArray = [];

const takeUserInput = function(titleInput,authorInput, pagesInput, isReadInput){
    libraryArray.push(new Book(titleInput, authorInput, pagesInput, isReadInput))
}

//book constructor
function Book(title, author,pages,isRead){
    this.title = title
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


//placeholder books
// takeUserInput('The Bible','Shakespeare', 444)
// takeUserInput('Chinese Manifesto','Mao Ze Dong', 555)


function displayBooks(){
    const tableRows = document.querySelectorAll("tbody > tr");
    tableRows.forEach((row)=>{
        row.remove()
    })

    let index = 0

    libraryArray.forEach((book)=>{
        const tbody = document.querySelector("tbody")
        const tr = tbody.insertRow()
        tr.setAttribute("index", index)
        for(const [key, value] of Object.entries(book)){
            const td = tr.insertCell()
            td.textContent = value
        }
        const tdRemoveButton = tr.insertCell()
        addRemoveButton(tdRemoveButton)
        const tdReadButton = tr.insertCell()
        addReadButton(tdReadButton)
        index++
    })
    attachEventListenerToRemoveButton()
    attachEventListenerToReadButton()
}
// displayBooks()

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

submit.addEventListener("click", addNewBook)

function addNewBook(e){
    e.preventDefault()
    const formIsRead = document.querySelector("#isread")
    const forms = document.querySelectorAll("form input:not(#isread)")
    const formsArray = []
    forms.forEach((formElement) =>{
    formsArray.push(formElement.value)
    })
    formsArray.push(formIsRead.checked)


    takeUserInput(...formsArray)
    modal.close()
    displayBooks()
}

function attachEventListenerToRemoveButton(){
const removeButtons = document.querySelectorAll(".remove")
removeButtons.forEach((removeButton)=>{
    removeButton.addEventListener("click", removeBook )
})
}

function attachEventListenerToReadButton(){
    const readButtons = document.querySelectorAll(".read")
    readButtons.forEach((readButton)=>{
        readButton.addEventListener("click", readBook )
    })
    }

function removeBook(e){
    const targetRow = e.target.parentElement.parentElement 

    //remove from libraryArray
   const index = targetRow.getAttribute("index")
    libraryArray.splice(index,1)
    //remove from display
    targetRow.remove()

}

function readBook(e){
    const targetRow = e.target.parentElement.parentElement 
    const index = targetRow.getAttribute("index")

    //toggle isRead
    if(libraryArray[index].isRead === true){
        libraryArray[index].isRead = false
    } else {libraryArray[index].isRead = true}
    displayBooks()
}

function addRemoveButton(row){
    const removeButton = document.createElement("button")
    removeButton.classList.add("remove")
    removeButton.textContent = "Remove"
    row.appendChild(removeButton)
}

function addReadButton(row){
    const readButton = document.createElement("button")
    readButton.classList.add("read")
    readButton.textContent= "Read"
    row.appendChild(readButton)
}

attachEventListenerToRemoveButton()