<?php

$conn = mysqli_connect('localhost', 'root', '', 'bookapp');

$isbn = $_GET['isbn'];
echo 'isbn is '. $isbn;

mysqli_query($conn, "DELETE FROM booklist WHERE booklist.isbn = '$isbn'");
?>
