'use strict'

const STORAGE_KEY = 'books'

var gBooks
_createBooks()
console.log(gBooks)

function getBooks(options) {
    if (!options) options = {} // why?

    const filterBy = options.filterBy
    const sortBy = options.sortBy
    const page = options.page

    var books = _filterBooks(filterBy)

    if (sortBy.sortField) {
        if (sortBy.sortField === 'title') {
            books.sort((book1, book2) => book1.title.localeCompare(book2.title) * sortBy.sortDir)
        } else if (sortBy.sortField === 'minRate') {
            books.sort((book1, book2) => (book1.rate - book2.rate) * sortBy.sortDir)
        }
    }

    const startIdx = page.idx * page.size
    const endIdx = startIdx + page.size
    books = books.slice(startIdx, endIdx)

    return books
}

function _filterBooks(filterBy) {
    var books = gBooks.slice()

    if (filterBy.txt) {
        books = books.filter(book => book.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
    }
    if (filterBy.minRate) {
        books = books.filter(book => book.rate >= filterBy.minRate)
    }

    return books
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

function saveLayout(layout) {
    saveToStorage('viewKey', layout)
}


//TODO: change 'viewKey'
function getLayout() {
    return loadFromStorage('viewKey') || 'table'

}

function getLastPageIdx(options) {
    const filterBy = options.filterBy
    const page = options.page
    const length = _filterBooks(filterBy).length

    return Math.ceil(length / page.size) - 1
}