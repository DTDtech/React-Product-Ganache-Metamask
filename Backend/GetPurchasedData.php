<?php
session_start();
include 'DbConnect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['user'])) {
        $user = $_POST['user'];

        $sql = "SELECT Owned_recipe FROM login WHERE Username = ?";
        $smst  = $con->prepare($sql);
        $smst->bind_param("s", $user);
        $smst->execute();
        $result = $smst->get_result();

        $data_array = array();
        
        if (mysqli_num_rows($result) == 1) {
            while ($row = mysqli_fetch_assoc($result)) {
                $data_array[0] = $row['Owned_recipe'];
            }

            $sql = "SELECT * FROM nft";

            $result = mysqli_query($con, $sql);

            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $data_array[] = $row; 
                }
                echo json_encode($data_array);
            }

        } else {
            echo json_encode("Server error");
        }
    } else {
        echo json_encode("You need to log in to view purchased items.");
    }
}
