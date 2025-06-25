'use strict'

var gFilterBy = ''

function onInit() {
    render()
}


function render() {

    const elBooksTable = document.querySelector('.main-container tbody')
    const books = getBooks(gFilterBy)

    var strHTML = books.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td><span class="btn-read" onclick="onReadBook('${book.id}')">Read</span>
                <span class"btn-update" onclick="onUpdateBook('${book.id}')">Update</span>
                <span class="btn-delete" onclick="onRemoveBook('${book.id}')">Delete</span>
                </td>
            </tr>`)
    elBooksTable.innerHTML = strHTML.join('')
}

function onSearchBook(elFilterBy) {
    gFilterBy = elFilterBy.value
    render()
}

function onClearClicked() {
    const elSearchLine = document.querySelector('input')
    elSearchLine.value = ''
    gFilterBy = ''
    render()
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    document.querySelector('.modal').innerText = 'The book has been deleted'
    showElement('.modal')

    render()

    setTimeout(() => hideElement('.modal'), 2000)

}


function onUpdateBook(bookId) {
    const newPrice = prompt('Insert a new price')
    updatePrice(bookId, newPrice)
    render()

}

function onAddBook() {
    const title = prompt('Insert a book title')
    const price = prompt('Insert a book price')
    addBook(title, price)
    render()
}

function onReadBook(bookId) {
    const elDetailsModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('.book-description')
    const elPrice = document.querySelector('.book-price span')
    const elTitle = document.querySelector('.book-title')
    const elImg = document.querySelector('.details-modal span')

    const book = getBookById(bookId)
    if (book.img) {
        elImg.innerHTML = `<img src="${book.img}">`
        elDetails.innerText = book.description
        elPrice.innerText = book.price
        elTitle.innerText = book.title
    }
    else elDetails.innerText = JSON.stringify(book)
    elDetailsModal.showModal()
}




