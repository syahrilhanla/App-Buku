<?php

// create connection
$conn = mysqli_connect('localhost', 'root', '', 'bookapp');

$title = $_POST['title'];
$isbn = $_POST['isbn']; 
$author = $_POST['author'];

$sql = "INSERT INTO booklist(title, author, isbn) VALUES ('$title', '$author', '$isbn')";

$query = mysqli_query($conn, $sql);
print_r($_POST);
if ($query) {
    echo 'response is '. $title;
}



