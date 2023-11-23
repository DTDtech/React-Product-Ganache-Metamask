<?php
session_start();
include 'DbConnect.php';

header('Access-Control-Allow-Origin: http://localhost:3000');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['RecipeTitle']) && isset($_POST['User'])) {
        $title = $_POST['RecipeTitle'];
        $user = $_POST['User'];

        $sql = "UPDATE login SET Owned_recipe = CONCAT(Owned_recipe, '/', ?) WHERE Username = ?";
        $smst  = $con->prepare($sql);
        $smst -> bind_param("ss", $title, $user);
        $smst -> execute();

        $sql = "SELECT Owned_recipe FROM login WHERE Username = ?";
        $smst  = $con->prepare($sql);
        $smst -> bind_param("s", $user);
        $smst -> execute();
        $result = $smst -> get_result();

        if (mysqli_num_rows($result) == 1) {
            while ($row = mysqli_fetch_assoc($result)) {
                $purchased_Recipes = explode( '/', $row['Owned_recipe']);
                array_shift($purchased_Recipes);
                echo json_encode($purchased_Recipes);
            }
        } 
        else {
            echo json_encode("Server error");
        }
    }
    else {
        echo json_encode("You need to log in to purchase items.");
    }
    
}