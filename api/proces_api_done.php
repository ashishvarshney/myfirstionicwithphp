<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");
include 'conn.php';
 $postjson = json_decode(file_get_contents('php://input'),true);
 

if($postjson['aksi'] == "proses_register"){
     $password = md5($postjson['password']);
	 $your_name = $postjson['your_name'];
	 $gender = $postjson['gender'];
	 $date_of_birth = $postjson['date_of_birth'];
	 $email_address = $postjson['email_address'];
	 $today = date('y-m-d H:i:s');
	$insert = $connect->query("INSERT INTO tbl_users (your_name,gender,date_of_birth,email_address,password,created_at) VALUES ('".$your_name."','".$gender."','".$date_of_birth."','".$email_address."','".$password."','".$today."')");

     
     if($insert){
         $result = json_encode(array('success'=> true, 'msg'=>'Register Successfully'));
     }
     else{
        $result = json_encode(array('success'=> false, 'msg'=>'Register Failed'));
     }
     echo $result;
 }


?>