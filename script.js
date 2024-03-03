const libraryArray = [];

const takeUserInput = function(titleInput,authorInput, pagesInput){
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
// takeUserInput('The Bible','Shakespeare', 444)
// takeUserInput('Chinese Manifesto','Mao Ze Dong', 555)


function displayBooks(){
    const tableRows = document.querySelectorAll("tbody > tr");
    tableRows.forEach((row)=>{
        row.remove()
    })

    libraryArray.forEach((book)=>{
        let index = 0
        const tbody = document.querySelector("tbody")
        const tr = tbody.insertRow()
        tr.setAttribute("index", index)
        for(const [key, value] of Object.entries(book)){
            const td = tr.insertCell()
            td.textContent = value
        }
        const tdRemoveButton = tr.insertCell()
        addRemoveButton(tdRemoveButton)
        index++
    })
    attachEventListenerToRemoveButton()
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

submit.addEventListener("click", (e)=>{
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
})

function attachEventListenerToRemoveButton(){
const removeButtons = document.querySelectorAll(".remove")
removeButtons.forEach((removeButton)=>{
    removeButton.addEventListener("click", removeBook )
})
}

function removeBook(e){
    const targetRow = e.target.parentElement.parentElement 
    console.log(targetRow);

    //remove from libraryArray
   console.log(targetRow.firstElementChild.value)
   const index = targetRow.getAttributes("index")
   console.log(index);
    //remove from display
    targetRow.remove()


}

function addRemoveButton(row){
    const removeButton = document.createElement("button")
    removeButton.classList.add("remove")
    removeButton.textContent = "Remove"
    row.appendChild(removeButton)
}

attachEventListenerToRemoveButton()