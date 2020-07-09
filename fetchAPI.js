// Book app

// created by Syahril Hanla, July 6th 2020
// Copyright 2020


// burger menu event

let condition = false;
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

class API {
    static toFetch = (url, method, data) => {
        return fetch(url, {
            method: method,
            body: data
        })
    }

    static toGET = (url) => {
        return API.toFetch(url)
            .then(res => res.json())
            .then(data => {
                UI.displayData(data);
            });
    }

    static toPost = (url, data) => {
        return API.toFetch(url, 'POST', data)
            .then(res => res.text())
            .then(data => {
                console.log(data);
            })
    }
}

class UI {
    static displayData = (data) => {
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
                href = 'delete.php?isbn=${info.isbn}'
                >X
                </a>
            </td>
            `;
            table.appendChild(tr);
            console.log(info.isbn);
            // to delete with php script
            // href = 'delete.php?isbn=${info.isbn}'
        });
    }

    static deleteBook = (target) => {
        if (target.classList.contains('delete')) {
            target.parentNode.parentNode.remove();
            UI.showAlert('Book successfully deleted', 'success');
        }
    }

    static checkInput = (title, author, isbn) => {
        if (title === "" || author === "" || isbn === "") {
            UI.showAlert('Field cannot be empty!', 'danger');
            return true;
        }
    }

    static showAlert = (message, className) => {
        const alerting = document.querySelector('#alert-message');
        alerting.style.visibility = 'visible';

        if (className) {
            alerting.className = `alert-${className} alert mt-2 text-center`;
        }
        let messageText = message;
        document.querySelector('#alert-message').textContent = messageText;

        setTimeout(() => {
            alerting.style.visibility = 'hidden';
        }, 3000);
    }

    static refreshDisplay = async () => {
        let tds = document.querySelectorAll('td');
        await tds.forEach(data => data.remove());
        API.toGET('data.php');

    }
}

// submit event
document.querySelector('#formData').addEventListener('submit', e => {
    e.preventDefault();

    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newISBN = document.querySelector('#isbn').value;

    // if not empty it will do the operation
    if (!UI.checkInput(newTitle, newAuthor, newISBN)) {
        let form = document.querySelector('#formData');
        const data = new URLSearchParams();

        for (const p of new FormData(form)) {
            data.append(p[0], p[1]);
        }
        API.toPost('insertData.php', data)
            .then(UI.refreshDisplay());
        UI.showAlert('Book successfully stored', 'success');
    }

});


document.querySelector('tbody').addEventListener('click', e => {
    UI.deleteBook(e.target);
});

document.addEventListener('DOMContentLoaded', API.toGET('data.php'));
