'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRate: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 },
}

var gBookToUpdateID = null
var gLayout = getLayout()
var gRateToUpdate = null
var gRateCount = 0

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
        <div class="rate">${getStars(book.rate)}</div>
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
    renderPages()
}


// function onResetRadioBtns() {
//     const elRadioBtns = document.querySelectorAll('.sort-dir')
//     const elSortField = document.querySelector('.sort-field')

// }

function renderTable(books) {
    const elBooksTable = document.querySelector('.table-container tbody')

    if (!books || books.length < 1) {
        elBooksTable.innerHTML = `<tr><td class="empty-table" colspan="4">No matching books were found</td></tr>`
        _renderstats()
        return
    }

    var strHTML = books.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>${getStars(book.rate)}</td>
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
    renderPages()


}
function getStars(rate) {
    var str = ''
    for (var i = 0; i < rate; i++) {
        str += '⭐️'
    }

    return str
}

function renderPages() {
    const pageIdx = document.querySelector('.pages span:nth-child(1)')
    const pageSum = document.querySelector('.pages span:nth-child(2)')
    pageIdx.innerText = gQueryOptions.page.idx
    pageSum.innerText = getLastPageIdx(gQueryOptions)
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
    // const newPrice = prompt('Insert a new price')
    // updatePrice(bookId, newPrice)
    // render()

    gBookToUpdateID = bookId
    const book = getBookById(bookId)
    const elUpdateModal = document.querySelector('.update-modal')
    elUpdateModal.querySelector('.book-rate-update-modal span').innerText = book.rate
    elUpdateModal.dataset.bookId = bookId

    elUpdateModal.showModal()
    // updateBook(bookId,newTitle,newPrice)


}

function onAddBook() {
    // const title = prompt('Insert a book title')
    // const price = +prompt('Insert a book price')
    // if (!title || !price || price < 0) return alert('please insert propper inputs')
    // addBook(title, price)
    // render()
    const elAddModal = document.querySelector('.update-modal')
    elAddModal.showModal()
}

function onAddBookByModal() {
    const elAddModal = document.querySelector('.update-modal')
    elAddModal.showModal()
}

function onSubmit() {
    const bookTitle = document.getElementById('booktitle').value
    const bookprice = document.getElementById('bookprice').value
    const imgUrl = document.getElementById('bookimage').value
    const rate = +document.querySelector('.book-rate-update-modal span').innerText

    if (!gBookToUpdateID) {
        addBook(bookTitle, bookprice, imgUrl)
    } else {
        updateBook(gBookToUpdateID, bookTitle, bookprice, imgUrl, rate)
        gBookToUpdateID = null
    }

    render()
    resetModal()

}

function resetModal() {
    document.getElementById('booktitle').value = ''
    document.getElementById('bookprice').value = ''
    document.getElementById('bookimage').value = ''


}

function onReadBook(bookId) {
    const elDetailsModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('.book-description')
    const elPrice = document.querySelector('.book-price span')
    const elTitle = document.querySelector('.book-title')
    const elImg = document.querySelector('.details-modal span')
    const elRate = document.querySelector('.book-rate span')

    const book = getBookById(bookId)

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

//TODO: look at the last CR
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
    if (!gBookToUpdateID) {
        const elBookModal = document.querySelector('.details-modal')
        const bookId = elBookModal.dataset.bookId
        const book = updateRating(bookId, +diff)

        elBookModal.querySelector('.book-rate span').innerText = book.rate
        return
    }

    const elUpdateModal = document.querySelector('.update-modal')
    const bookId = elUpdateModal.dataset.bookId
    const book = updateRating(bookId, +diff)
    elUpdateModal.querySelector('.book-rate-update-modal span').innerText = book.rate

}

function onUpdateRate(ev, diff) {
    ev.preventDefault()
    const elUpdateModal = document.querySelector('.update-modal')
    const bookId = elUpdateModal.dataset.bookId
    const book = getBookById(bookId)
    gRateToUpdate = book.rate
    gRateCount += diff
    elUpdateModal.querySelector('.book-rate-update-modal span').innerText = book.rate + gRateCount
}

function onCloseModal() {
    const elUpdateModal = document.querySelector('.update-modal')
    elUpdateModal.querySelector('.book-rate-update-modal span').innerText = gRateToUpdate
    gRateCount = 0
    render()
}


function onInputPrice(elPriceInput) {

    var price = +elPriceInput.value
    elPriceInput.value = price.toFixed(2)
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

    gQueryOptions.page.idx = 0

    render()

}

function onSetSortByHeader(elHeader, sortBy) {
    if (sortBy !== gQueryOptions.sortBy.sortField) gQueryOptions.sortBy.sortDir = null
    gQueryOptions.sortBy.sortField = sortBy

    const ths = document.querySelectorAll('th span')
    console.log(ths[0].innerText)
    for (var i = 0; i < ths.length; i++) {
        ths[i].innerText = ''
    }

    if (!gQueryOptions.sortBy.sortDir) gQueryOptions.sortBy.sortDir = 1
    else gQueryOptions.sortBy.sortDir *= -1


    if (gQueryOptions.sortBy.sortDir === 1) elHeader.querySelector('span').innerText = '+'
    else if (gQueryOptions.sortBy.sortDir === -1) elHeader.querySelector('span').innerText = '-'
    gQueryOptions.page.idx = 0

    render()
}

function onNextPage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions)
    if (gQueryOptions.page.idx === lastPageIdx) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }

    render()
}

function onPrevPage() {
    const firstPageIdx = 0
    const lastPageIdx = getLastPageIdx(gQueryOptions)
    if (gQueryOptions.page.idx === firstPageIdx) {
        gQueryOptions.page.idx = lastPageIdx
    } else {
        gQueryOptions.page.idx--
    }
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
    var sortDir = +gQueryOptions.sortBy.sortDir

    document.querySelector('.sort-by select').value = sortField || ''
    // if (!sortDir) sortDir = 1
    document.querySelector('#descending').checked = (sortDir === -1) ? true : false
    document.querySelector('#ascending').checked = (sortDir === 1) ? true : false

    document.querySelector(`.table-container .${sortField} span`).innerText = (sortDir === -1) ? '-' : '+'
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