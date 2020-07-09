<?php

// fetching data from database and connect it to fetchAPI.js

$conn = mysqli_connect('localhost', 'root', '', 'bookapp');

$query = 'SELECT * FROM booklist';

$result = mysqli_query($conn, $query);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);

exit(json_encode($data));


