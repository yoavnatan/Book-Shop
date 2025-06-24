'use strict'

var gBooks
_createBooks()
console.log(gBooks)

function getBooks() {
    return gBooks
}

function getBookById(bookIdx) {
    return gBooks.find(book => book.id === bookIdx)

}

function removeBook(bookIdx) {
    const idx = gBooks.findIndex(book => book.id === bookIdx)
    gBooks.splice(idx, 1)
}

function updatePrice(bookIdx, newPrice) {
    console.log('bookIdx', bookIdx)
    const book = gBooks.find(book => book.id === bookIdx)
    console.log(book)
    book.price = newPrice

    return book
}

function addBook(title, price) {

    const newBook = _createBook(title, price)
    gBooks.push(newBook)

    return newBook
}

function _createBooks() {

    gBooks = [
        _createBook('The Adventures of Lori Ipsi', 120),
        _createBook('World Atlas', 300),
        _createBook('Zorba the Greek', 87)
    ]
}

function _createBook(title, price) {
    return {
        id: makeid(),
        title,
        price,
    }
}
