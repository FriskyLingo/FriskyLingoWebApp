<?php
header('Access-Control-Allow-Origin: *');

$file = 'freeonesProcessedData.txt';
// The new person to add to the file
$data = $_POST['data'];
// Write the contents to the file, 
// using the FILE_APPEND flag to append the content to the end of the file
// and the LOCK_EX flag to prevent anyone else writing to the file at the same time
file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
?>