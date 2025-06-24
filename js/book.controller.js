'use strict'

function onInit() {
    render()
}


function render() {

    const elBooksTable = document.querySelector('.main tbody')
    const books = getBooks()

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


function onRemoveBook(bookIdx) {
    removeBook(bookIdx)
    render()
}


function onUpdateBook(bookIdx) {
    const newPrice = prompt('Insert a new price')
    updatePrice(bookIdx, newPrice)
    render()

}

function onAddBook() {
    const title = prompt('Insert a book title')
    const price = prompt('Insert a book price')
    addBook(title, price)
    render()
}

function onReadBook(bookIdx) {
    const elDetailsModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('pre')

    const book = getBookById(bookIdx)
    elDetails.innerText = JSON.stringify(book)
    elDetailsModal.showModal()
}



