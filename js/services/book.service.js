'use strict'

const STORAGE_KEY = 'books'

var gBooks
_createBooks()
console.log(gBooks)

function getBooks(filterBy) {
    if (!filterBy) return gBooks

    return gBooks.filter(book => book.title.toLowerCase().includes(filterBy.toLowerCase()))

}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)

}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updatePrice(bookId, newPrice) {
    console.log('bookId', bookId)
    const book = getBookById(bookId)
    console.log(book)
    book.price = newPrice

    _saveBooks()
    return book
}

function addBook(title, price, img) {

    const newBook = _createBook(title, price, img)
    gBooks.push(newBook)

    _saveBooks()
    return newBook
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    if (gBooks && gBooks.length > 0) return

    gBooks = [
        _createBook('The Adventures of Lori Ipsi', 120, 'imgs/advanture.jpg', makeLorem(50)),
        _createBook('World Atlas', 300, 'imgs/atlas.jpg', makeLorem(50)),
        _createBook('Zorba the Greek', 87, 'imgs/zorba.jpg', makeLorem(50))
    ]

    _saveBooks()
}

function _createBook(title, price, img, description) {
    return {
        id: makeid(),
        title,
        price,
        img,
        description,
        rate: getRandomInt(1, 6),
    }
}

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function updateRating(bookId, diff) {
    const book = getBookById(bookId)
    book.rate += diff
    _saveBooks()
    return book
}

function addBookByModal(title, price, img) {
    addBook(title, price, img)
    _saveBooks

}