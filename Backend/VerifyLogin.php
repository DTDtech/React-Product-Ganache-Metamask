<?php
session_start();
include 'DbConnect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['Username']) && isset($_POST['Password'])) {
        $username = $_POST['Username'];
        $password = $_POST['Password'];

        $sql = "SELECT * FROM login WHERE Username=?";
        $smst  = $con->prepare($sql);
        $smst -> bind_param("s", $username);
        $smst -> execute();
        $result = $smst -> get_result();

        $data = array();

        if (mysqli_num_rows($result)) {
            while ($row = mysqli_fetch_assoc($result)) {
                if (password_verify($password, $row['Password'])) {
                    $data[0] = "Login successful";   
                    $data[1] = $username;
                } else {
                    $data[0] = "Wrong password.";
                }
            }
        } 
        else {
            $data[0] = "Wrong username.";
        }

        echo json_encode($data);
    }
}

