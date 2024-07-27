<?php

$sever = "localhost";
$username = "root";
$password = "";
$dbname = "register";

$con = mysqli_connect($sever,$username,$password,$dbname);

if(!$con){
    echo "not connected";
}

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "INSERT INTO `login`(`id`, `username`, `email`, `password`) VALUES ('[value-1]','$username','$email','$password')";

$result = mysqli_query($con, $sql);

if($result)
{
    echo "<script type='text/javascript'> alert('Successfully register')</script>";
    echo "data submitted";
    header("location: task2.html");
}

else{
    echo "<script type='text/javascript'> alert('Please enter valid information')</script>";
    echo "failed...";
}

?>
