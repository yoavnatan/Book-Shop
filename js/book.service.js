'use strict'

var gBooks
_createBooks()
console.log(gBooks)

function getBooks() {
    return gBooks
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)

}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}

function updatePrice(bookId, newPrice) {
    console.log('bookId', bookId)
    const book = gBooks.find(book => book.id === bookId)
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
        _createBook('The Adventures of Lori Ipsi', 120, 'imgs/advanture.jpg', 'Siki & Lori is about a Siamese cat boy named Siki and a golden retriever dog named Lori. That go on exciting adventures & most haunting and action type series. They encounter many villains slowly twists over to cursed odjects, possessed pets and people. With scary monsters & ghosts although it gets bloody during in the futher chapters of Siki and Lori.'),
        _createBook('World Atlas', 300, 'imgs/atlas.jpg', 'lorem ipsum'),
        _createBook('Zorba the Greek', 87, 'imgs/zorba.jpg', 'lorem ipsum')
    ]
}

function _createBook(title, price, img, description) {
    return {
        id: makeid(),
        title,
        price,
        img,
        description,
    }
}
