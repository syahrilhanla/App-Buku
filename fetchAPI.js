// Book app

// created by Syahril Hanla, July 6th 2020
// Copyright 2020

// last progress note: 
// 1. self refresh after submit not working
// 2. API for matching title has finished
// 3. codes a little bit maintained and organized

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
            .then(res => res.json());
    }

    static toPost = (url, data) => {
        return API.toFetch(url, 'POST', data)
            .then(res => res.text())
            .then(data => {
                console.log(data);
            })
    }

    static searchingMatches = (data, searchData) => {
        data.filter((result) => {
            if (result.title == searchData) {
                console.log('mantap yoa');
            }
        });
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


    // bug: still cannot refresh by itself after posting data
    static refreshDisplay = async () => {
        let tds = document.querySelectorAll('td');
        await tds.forEach(data => data.remove());
        await API.toGET('data.php')
            .then(data => {
                UI.displayData(data);
            });
    }
}

class Events {

    static submitEvent = () => {

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
                    .then(UI.refreshDisplay())
                    .then(UI.showAlert('Book successfully stored', 'success'))
                    .catch(error => console.log('terjadi error: ', error));
            }
        });
    }

    static deleteButton = () => {
        document.querySelector('tbody').addEventListener('click', e => {
            UI.deleteBook(e.target);
        });
    }

    static ContentLoaded = () => {
        document.addEventListener('DOMContentLoaded', API.toGET('data.php')
            .then(data => {
                UI.displayData(data);
            }));
    }

    static searchButton = () => {
        document.querySelector('#searchForm').addEventListener('submit', e => {
            e.preventDefault();

            const searchData = document.querySelector('#searchData').value;

            API.toGET('data.php')
                .then(data => {
                    API.searchingMatches(data, searchData);
                });

        });
    }

}

// running functions
Events.submitEvent();
Events.deleteButton();
Events.searchButton();
Events.ContentLoaded();



