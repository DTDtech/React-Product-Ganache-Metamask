<?php
session_start();
include 'DbConnect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['Username'];
    $password = $_POST['Password'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    if (isset($_POST['Username']) && isset($_POST['Password'])) {

        $sql = "SELECT * FROM login WHERE Username=?";
        $smst  = $con->prepare($sql);
        $smst -> bind_param("s", $username);
        $smst -> execute();
        $result = $smst -> get_result();

        $numrows = mysqli_num_rows($result);

        if ($numrows != 0) {
            echo json_encode("Username existed, please choose another username");
        }
        else {
            $sql = "INSERT INTO login (Username, Password) VALUES (?, ?)";
            $smst  = $con->prepare($sql);
            $smst -> bind_param("ss", $username, $hashed_password);
            $smst -> execute();

            if ($smst->affected_rows > 0) {
                echo json_encode("Register successfull");
            } else {
                echo json_encode("Server error");
            }
        } 
        
    }
}

?>