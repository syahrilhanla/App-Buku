class Data {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
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

const toFetch = (url, method, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'content-type': 'application/json' } : {}
    })
        .then(res => res.json());
}


const toGET = (url) => {
    return toFetch(url)
        .then(data => {
            displayData(data);
        });
}

// const toPost = (url)

function displayData(data) {
    const table = document.querySelector('#nomnom');

    data.forEach(info => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${info.title}</td>
            <td>${info.author}</td>
            <td>${info.isbn}</td>
            `;
        table.appendChild(tr);
        console.log(info.author)
    });

}

// // const displayData = (haha) => {
//     const table = document.querySelector('#nomnom');
//     const tr = document.createElement('tr');
//     // console.log(data);

//     const info = toGET('users.json');
//     info.then(data => {
//         tr.innerHTML = `
//     <td>${data.title}</td>
//     <td>${data.author}</td>
//     <td>${data.isbn}</td>
//     `;
//         table.appendChild(tr);

//     })
// }

document.querySelector('#formData').addEventListener('submit', e => {
    e.preventDefault();

    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newISBN = document.querySelector('#isbn').value;

    if (newTitle === "" || newAuthor === "" || newISBN === "") {
        alert('dataKosong');
        fetch('users.json')
            .then(res => res.json()).then(data => console.log(data))
    } else {
        const newBook = new Data(newTitle, newAuthor, newISBN);
        toGET('users.json');
        document.querySelector('#formData').reset();
    }
})
