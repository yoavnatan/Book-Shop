'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRate: 0 },
    sortBy: {},
    page: {},
}

var gLayout = getLayout()

function onInit() {
    readQueryParams()
    render()
}


function render() {
    const books = getBooks(gQueryOptions)

    if (gLayout === 'cards') renderCards(books)
    if (gLayout === 'table') renderTable(books)
    _renderstats()
    setQueryParams()

}
function renderCards(books) {

    const elBooksCard = document.querySelector('.cards-container')

    var strHTML = books.map(book => `<div class="card">


<img alt="No image" src="${book.img}">
        <div class="title">${book.title}</div>
        <div class="price">${book.price}$</div>
        <div class="rate">${book.rate} ⭐️</div>
        <div class="btns-conatiner">
        <span class="button btn-read" onclick="onReadBook('${book.id}')">Read</span>
            <span class="button btn-update" onclick="onUpdateBook('${book.id}')">Update</span>
            <span class="button btn-delete" onclick="onRemoveBook('${book.id}')">Delete</span>
            </div>
        </div>
        `
    )
    elBooksCard.style.display = 'flex'
    elBooksCard.innerHTML = strHTML.join('')
    hideElement('.table-container')
    showElement('.cards-container')
}

function renderTable(books) {
    const elBooksTable = document.querySelector('.table-container tbody')

    if (!gBooks || gBooks.length < 1) {
        elBooksTable.innerHTML = `<tr><td class="empty-table" colspan="4">No matching books were found</td></tr>`
        _renderstats()
        return
    }

    var strHTML = books.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>${book.rate} ⭐️</td>
                <td>${book.price}</td>
                <td><span class="button btn-read" onclick="onReadBook('${book.id}')">Read</span>
                <span class="button btn-update" onclick="onUpdateBook('${book.id}')">Update</span>
                <span class="button btn-delete" onclick="onRemoveBook('${book.id}')">Delete</span>
                </td>
            </tr>`)
    elBooksTable.innerHTML = strHTML.join('')
    document.querySelector('.cards-container').style.display = 'none'

    hideElement('.cards-container')
    showElement('.table-container')

}


function onSearchBook(elFilterBy) {
    gQueryOptions.filterBy.txt = elFilterBy.value
    render()
}

function onClearClicked() {
    const elSearchLine = document.querySelector('input')
    const elMinRateDropDown = document.querySelector('[name="rates"]')
    elMinRateDropDown.selectedIndex = 0
    console.log(elMinRateDropDown.selectedIndex)
    elMinRateDropDown.value = ''
    elSearchLine.value = ''
    gQueryOptions.filterBy.txt = ''
    gQueryOptions.filterBy.minRate = 0

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
    const price = +prompt('Insert a book price')
    if (!title || !price || price < 0) return alert('please insert propper inputs')
    addBook(title, price)
    render()
}

function onAddBookByModal() {
    const elAddModal = document.querySelector('.update-modal')
    elAddModal.showModal()
}

function onReadBook(bookId) {
    const elDetailsModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('.book-description')
    const elPrice = document.querySelector('.book-price span')
    const elTitle = document.querySelector('.book-title')
    const elImg = document.querySelector('.details-modal span')
    const elRate = document.querySelector('.book-rate span')

    const book = getBookById(bookId)

    console.log('book.rate', book.rate)
    if (book.img) {
        elImg.innerHTML = `<img src="${book.img}">`
        elDetails.innerText = book.description
        elPrice.innerText = book.price
        elTitle.innerText = book.title
        elRate.innerText = book.rate
    }
    else elDetails.innerText = JSON.stringify(book)

    elDetailsModal.dataset.bookId = bookId
    elDetailsModal.showModal()
}

function _renderstats() {
    const stats = gBooks.reduce((acc, book) => {
        if (book.price >= 200) acc.exp++
        else if (200 > book.price && book.price >= 80) acc.avg++
        else if (book.price < 80) acc.cheap++

        return acc
    }, { exp: 0, avg: 0, cheap: 0 })

    document.querySelector('.expensive-books span').innerText = stats.exp
    document.querySelector('.avarage-books span').innerText = stats.avg
    document.querySelector('.cheap-books span').innerText = stats.cheap
}

function onToggleView() {

    var stateToSet = gLayout === 'cards' ? 'table' : 'cards'
    gLayout = stateToSet

    //  or
    // gLayout = gLayout === 'cards' ? 'table' : 'cards'

    render()
    saveLayout(gLayout)
}

// function onTableView() {

//     gLayout = 'table'
//     document.querySelector('.cards-container').style.display = 'none'
//     render()
//     saveLayout('table')

// }

function onChangeRate(ev, diff) {
    ev.preventDefault()

    const elBookModal = document.querySelector('.details-modal')
    const bookId = elBookModal.dataset.bookId
    const book = updateRating(bookId, +diff)

    elBookModal.querySelector('.book-rate span').innerText = book.rate

}

function onInputPrice(elPriceInput) {

    var price = +elPriceInput.value
    elPriceInput.value = price.toFixed(2)
}

function onSubmit() {
    const bookTitle = document.getElementById('booktitle').value
    const bookprice = document.getElementById('bookprice').value
    const imgUrl = document.getElementById('bookimage').value
    addBook(bookTitle, bookprice, imgUrl)
    render()

}

function onFilterByRate(elFilterBy) {
    gQueryOptions.filterBy.minRate = elFilterBy.value
    render()
}

function onSetSortBy() {
    const elSortField = document.querySelector('.sort-field')
    const elSortDirs = document.querySelectorAll('.sort-dir')
    var elSortDir
    for (var i = 0; i < 2; i++) {
        if (elSortDirs[i].checked) {
            elSortDir = elSortDirs[i]
        }
    }

    if (elSortDir.value === 'ascending') gQueryOptions.sortBy.sortDir = 1
    else if (elSortDir.value === 'descending') gQueryOptions.sortBy.sortDir = -1
    gQueryOptions.sortBy.sortField = elSortField.value

    render()

}

//* Query Params
function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        txt: queryParams.get('title') || '',
        minRate: +queryParams.get('minRate') || 0
    }

    if (queryParams.get('sortField')) {
        const field = queryParams.get('sortField')
        const dir = queryParams.get('sortDir')

        gQueryOptions.sortBy.sortField = field
        gQueryOptions.sortBy.sortDir = dir
    }

    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
    }

    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.title-search').value = gQueryOptions.filterBy.txt
    document.querySelector('.min-rate-filter').selectedIndex = gQueryOptions.filterBy.minRate

    const sortField = gQueryOptions.sortBy.sortField
    const sortDir = +gQueryOptions.sortBy.sortDir

    document.querySelector('.sort-by select').value = sortField || ''
    document.querySelector('#descending').checked = (sortDir === -1) ? true : false
    document.querySelector('#ascending').checked = (sortDir === 1) ? true : false
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('minRate', gQueryOptions.filterBy.minRate)

    if (gQueryOptions.sortBy.sortField) {
        queryParams.set('sortField', gQueryOptions.sortBy.sortField)
        queryParams.set('sortDir', gQueryOptions.sortBy.sortDir)
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}