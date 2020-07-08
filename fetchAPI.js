// Book app

// created by Syahril Hanla, July 6th 2020
// Copyright 2020

class Data {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
let condition = false;

// burger menu event
const button = document.querySelector('#ok');
button.addEventListener('click', e => {
    const burger = document.querySelector('#navbarColor01');
    if (!condition) {
        burger.style.display = 'block';
        condition = true;
    } else {
        burger.style.display = 'none';
        condition = false;
    }
})
//////////////////////////////////////////

const toFetch = (url, method, data) => {
    return fetch(url, {
        method: method,
        body: data
    })
}


const toGET = (url) => {
    return toFetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data);
        });
}


const toPost = (url, data) => {
    return toFetch(url, 'POST', data)
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
}


function displayData(data) {
    const table = document.querySelector('#nomnom');
    table.style.display = '';

    data.forEach(info => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${info.title}</td>
            <td>${info.author}</td>
            <td>${info.isbn}</td>
            <td>
                <a class='btn btn-sm btn-danger delete text-white'
                    href='delete.php?isbn=${info.isbn}'
                >X
                </a>
            </td>
            `;
        table.appendChild(tr);
    });

}

document.querySelector('#formData').addEventListener('submit', e => {
    e.preventDefault();

    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newISBN = document.querySelector('#isbn').value;

    let form = document.querySelector('#formData');
    const data = new URLSearchParams();

    for (const p of new FormData(form)) {
        data.append(p[0], p[1]);
    }

    toPost('insertData.php', data);
});

function deleteBook(target) {
    if (target.classList.contains('delete')) {
        target.parentNode.parentNode.remove();
    }
}

document.querySelector('tbody').addEventListener('click', e => {
    deleteBook(e.target);
});

document.addEventListener('DOMContentLoaded', toGET('data.php'));
