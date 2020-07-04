
// class Book {
//     constructor(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//     }
// }

// class UI {
//     // function menampilkan buku
//     static displayBooks() {

//         const books = Store.getBooks();

//         // mengisi nilai ke method addBooksToList()
//         books.forEach(satuanBuku => {
//             UI.addBooksToList(satuanBuku);
//         });

//     }

//     // Menampilkan pesan alert sesuai tindakan 
//     static pesan(pesan, className) {
//         const div = document.createElement('div');
//         const message = document.createTextNode(pesan)
//         div.appendChild(message);
//         const container = document.querySelector('.container');
//         const table = document.querySelector('.table');
//         container.insertBefore(div, table);
//         div.className = `alert alert-${className} text-center mt-3`;

//         setTimeout(() => {
//             document.querySelector('.alert').remove();
//         }, 2500);
//         div.className = `alert alert-${className} text-center mt-3`;
//     }

//     //menambahkan buku baru ke list buku
//     static addBooksToList(satuanBuku) {
//         const bookList = document.querySelector('#book-list');
//         const newRow = document.createElement('tr');

//         // mengisi nilai pada baris baru newRow
//         newRow.innerHTML = `
//             <td>${satuanBuku.title}</td>
//             <td>${satuanBuku.author}</td>
//             <td>${satuanBuku.isbn}</td>
//             <td><a class="btn btn-danger btn-sm delete" style="color:white">X</a></td>
//         `;

//         bookList.appendChild(newRow);
//     }

//     // menghapus buku dengan tombol delete
//     static deleteBook(pilih) {
//         if (pilih.classList.contains('delete')) {
//             UI.pesan('Buku berhasil dihapus', "success");
//             pilih.parentNode.parentNode.remove();
//         }
//     }
// }

// // untuk menghandle localStorage
// class Store {
//     static getBooks() {
//         let books;
//         if (localStorage.getItem('books') === null) {
//             books = [];
//         } else {
//             books = JSON.parse(localStorage.getItem('books'));
//         }
//         return books;
//     }

//     static addBook(book) {
//         let books = Store.getBooks();
//         books.push(book);

//         localStorage.setItem('books', JSON.stringify(books));
//     }

//     static removeBook(isbn) {
//         const books = Store.getBooks();

//         books.forEach((book, index) => {
//             if (book.isbn === isbn) {
//                 books.splice(index, 1);
//             }
//         });
//         localStorage.setItem('books', JSON.stringify(books));
//     }

//     static checkDuplicate(isbn) {
//         const books = Store.getBooks();
//         let truth = false;
//         books.forEach((book) => {
//             if (book.isbn === isbn) {
//                 if (!truth) {
//                     UI.pesan('Terdapat buku dengan ISBN yang sama', 'danger');
//                     truth = true;
//                 }
//             }
//         });
//         return truth;
//     }
// }


// // memasukkan nilai dari input user ke constructor Book
// document.querySelector('#book-form').addEventListener('submit', e => {
//     e.preventDefault();

//     const newTitle = document.querySelector('#title').value;
//     const newAuthor = document.querySelector('#author').value;
//     const newISBN = document.querySelector('#isbn').value;

//     // validasi input
//     if (newTitle == "" || newAuthor == "" || newISBN == "") {
//         UI.pesan('Harap isi semua field!', "danger");
//     } else {
//         if (!Store.checkDuplicate(newISBN)) {
//             // memanggil constructor dan memasukkan nilai
//             const newBook = new Book(newTitle, newAuthor, newISBN);
//             UI.addBooksToList(newBook);
//             Store.addBook(newBook);
//             document.querySelector('#book-form').reset();
//             UI.pesan('Buku berhasil dimasukkan', "success");
//         }
//     }

// })

// //event untuk menghapus buku
// document.querySelector('#book-list').addEventListener('click', e => {
//     UI.deleteBook(e.target);
//     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
// });

// //load untuk menampilkan list buku
// document.addEventListener('DOMContentLoaded', UI.displayBooks());

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('book') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('book'));
        }
        return books;
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('book', JSON.stringify(books));
    }

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
                UI.pesan('Buku berhasil dihapus', 'danger');
            }
        });
        localStorage.setItem('book', JSON.stringify(books));
    }

    static checkDuplicate(isbn) {
        let books = Store.getBooks();
        let truth = false;

        books.forEach(book => {
            if (book.isbn === isbn) {
                if (!truth) {
                    UI.pesan('Terdapat buku dengan ISBN yang sama', 'danger')
                    truth = true;
                }
            }
        });
        return truth;
    }

    static findBook(title) {
        let books = Store.getBooks();
        let truth = false;
        // document.querySelector('#book-findRow').innerHTML = "";

        books.filter(book => {
            if (book.title === title && truth == false) {
                UI.addBookToFind(book);
                UI.pesan('Buku ditemukan!', 'success');
                truth = true;
                document.querySelector('#book-find').value = '';
            }
        });
        if (!truth) {
            UI.pesan('Buku tidak ditemukan', 'danger');
        }
    }
}

class UI {
    static displayBooks() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete btn-sm">X</a></td>
        `;

        list.appendChild(row);
    }

    static displayFindBook() {
        let books = Store.getBooks();

        books.forEach(book => {
            UI.addBookToFind(book);
        });
    }

    static addBookToFind(book) {
        const list = document.querySelector('#book-findRow');
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete btn-sm">X</a></td>
        `;

        list.appendChild(row);
    }

    static removeBook(target) {
        if (target.classList.contains('delete')) {
            target.parentNode.parentNode.remove();
        }
    }

    static pesan(message, className) {
        const div = document.createElement('div');
        const text = document.createTextNode(message);

        div.appendChild(text);
        div.className = `alert alert-${className} text-center mt-3`;

        const container = document.querySelector('.container');
        const table = document.querySelector('.table');
        container.insertBefore(div, table);

        setTimeout(() => {
            div.remove();
        }, 2500);
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks());

document.querySelector('#book-list').addEventListener('click', e => {
    UI.removeBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
});

document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#book-list').style.display = '';

    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newISBN = document.querySelector('#isbn').value;

    if (newTitle === "" || newAuthor === "" || newISBN === "") {
        UI.pesan('Semua field harus terisi!', 'danger');
    } else if (!Store.checkDuplicate(newISBN)) {
        let newBook = new Book(newTitle, newAuthor, newISBN);
        Store.addBook(newBook);
        UI.addBookToList(newBook);
        UI.pesan('Buku berhasil dimasukkan!', 'success');
    }

});

document.querySelector('#btn-find').addEventListener('click', e => {
    e.preventDefault();
    const bookTitle = document.querySelector('#book-find').value;
    document.querySelector('#book-list').style.display = 'none';

    if (bookTitle === '') {
        UI.pesan('Tuliskan judul yang ingin dicari!', 'danger');
    } else {
        Store.findBook(bookTitle);
    }

});
