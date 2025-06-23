'use strict'

var gBooks = [
    { id: 1, title: 'The Adventures of Lori Ipsi', price: 120 },
    { id: 2, title: 'World Atlas', price: 300 },
    { id: 3, title: 'Zorba the Greek', price: 87 },
]

function getBooks() {
    return gBooks
}

function removeBook(bookIdx) {
    const idx = gBooks.findIndex(book => book.id === bookIdx)
    gBooks.splice(idx, 1)
}