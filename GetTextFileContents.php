<?php
header('Access-Control-Allow-Origin: *');

$file = $_POST['filePath'];

$contents = file_get_contents($file, FILE_USE_INCLUDE_PATH);

echo $contents;
?>