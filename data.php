<?php

header('Content-Type: application/json');

$data = [
    'viewCount' => (time() %1000 ) * 3
];

echo json_encode($data);