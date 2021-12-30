let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

if (!myLibrary){
    myLibrary = [];
}

const container = document.querySelector("#container");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

myLibrary.forEach(book => display(book));

function display(item){
    const newItem = document.createElement("div");
    newItem.classList = "book-card";

    const title = document.createElement("p");
    title.textContent = item.title;
    newItem.appendChild(title);

    const author = document.createElement("p");
    author.textContent = "by " + item.author;
    newItem.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = item.pages + " pages";
    newItem.appendChild(pages);

    const read = document.createElement("button");
    read.classList.add("readBtn");
    read.textContent = (item.read) ? "read": "not read yet";
    read.style.backgroundColor = (item.read) ? "#4fff3e": "#fa4545";
    read.addEventListener("click", () => {
        if (item.read){
            item.read = false;
            read.style.backgroundColor = "#fa4545";
        }else{
            item.read = true;
            read.style.backgroundColor = "#4fff3e";
        }
        read.textContent = (item.read) ? "read": "not read yet";
        saveToLocal();
    })
    newItem.appendChild(read);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Remove Book";
    removeBtn.addEventListener("click", () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        container.textContent = "";
        myLibrary.forEach(book => display(book));
        checkEmptyDiv();
        saveToLocal();
    })
    newItem.appendChild(removeBtn);
    
    container.appendChild(newItem);
}

const newBookBtn = document.querySelector("#newBook");
newBookBtn.addEventListener("click", displayForm);

function displayForm(){
   let overlay = document.querySelector(".overlay");
   overlay.style.display = "block";
}

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", closeForm);

function closeForm(){
    let overlay = document.querySelector(".overlay");
   overlay.style.display = "none";
   clearForm();
}

const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const readInput = document.querySelector("#read");

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", submitForm)

function submitForm(){
    $('#form').submit(function() {
        if (!attributeSupported("required") || ($.browser.safari)) {
         $("#form [required]").each(function(index) {
          if (!$(this).val()) {
           alert("Please fill all required fields.");
           return false;
          }
         });
        }
        return false; 
      });
    if (inputTitle.value && inputAuthor.value && inputPages.value){
        let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, readInput.checked);
        addBookToLibrary(newBook);
        closeForm();
        container.textContent = "";
        myLibrary.forEach(book => display(book));
    }
    checkEmptyDiv()
    saveToLocal();
}

function clearForm(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    readInput.checked = false;
}

let form = document.querySelector("#form");

function checkInputs(){
    if ((!inputTitle.value) || (!inputAuthor.value) || (!inputYear.value) ){
        let errorMsg = document.createElement("p");
        errorMsg.textContent = "*please fill out all the forms required*";
        form.appendChild(errorMsg);
    }
}

let body = document.querySelector("body");
let emptyString = document.createElement("p");
emptyString.classList.add("empty");
body.appendChild(emptyString);

function checkEmptyDiv(){
    if (container.children.length === 0){
        emptyString.textContent = "Nothing to show yet";
    }else if(container.children.length > 0){
        emptyString.textContent = ""
    }
}
checkEmptyDiv()

function saveToLocal(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}