<?php
//header('Access-Control-Allow-Origin: *');

//$file = 'data/bData.txt';
$file = $_POST['filePath'];

// The new person to add to the file
$data = $_POST['data'];

// Write the contents to the file, 
// using the LOCK_EX flag to prevent anyone else writing to the file at the same time
file_put_contents($file, $data);
?>