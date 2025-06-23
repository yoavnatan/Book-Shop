'use strict'

var gBooks
_createBooks()

function getBooks() {
    return gBooks
}

function removeBook(bookIdx) {
    const idx = gBooks.findIndex(book => book.id === bookIdx)
    gBooks.splice(idx, 1)
}

function updatePrice(bookIdx, newPrice) {
    const book = gBooks.find(book => book.id === bookIdx)
    book.price = newPrice
}

function addBook(title, price) {

    const book = _createBook(title, price)
    gBooks.push(book)

}

function _createBooks() {

    gBooks = [
        _createBook('The Adventures of Lori Ipsi', 120),
        _createBook('World Atlas', 300),
        _createBook('Zorba the Greek', 87),
    ]
}

function _createBook(title, price) {
    return {
        id: makeid(),
        title,
        price,
    }
}
