<?php
session_start();
require "DbConnect.php";

header('Access-Control-Allow-Origin: http://localhost:3000');

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

$data_array = array();

if ( isset($_POST['user']) && isset($_POST['item']) ) {
    $user = $_POST['user'];
    $purchased = $_POST['item'];

    $sql = "SELECT ID, Title, Course, Description, Chef, Price, Image FROM nft";

    if ($result = mysqli_query($con, $sql)) {
        while ($row = mysqli_fetch_assoc($result)) {
            if ($purchased == "") {
                $data_array[] = $row;
            }
            elseif (!str_contains($purchased, $row['Title'])) {
                $data_array[] = $row;
            }
        }
    }
}
elseif ( ! ( isset($_POST['user']) && isset($_POST['item']) ) ) {
    $sql = "SELECT ID, Title, Course, Description, Chef, Price, Image FROM nft";
    if ($result = mysqli_query($con, $sql)) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data_array[] = $row;
        }
    }
}

echo json_encode($data_array);
