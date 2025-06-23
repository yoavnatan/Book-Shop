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
                <td><span>Read</span><span>Update</span><span>Delete</span></td>
            </tr>`)
    elBooksTable.innerHTML = strHTML.join('')
}



