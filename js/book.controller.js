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
                <td><span class="btn-read">Read</span>
                <span class"btn-update">Update</span>
                <span class="btn-delete" onclick="onRemoveBook(${book.id})">Delete</span>
                </td>
            </tr>`)
    elBooksTable.innerHTML = strHTML.join('')
}


function onRemoveBook(bookIdx) {
    removeBook(bookIdx)
    render()
}





