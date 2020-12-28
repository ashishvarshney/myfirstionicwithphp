<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");
include "conn.php";

 $postjson = json_decode(file_get_contents('php://input'),true);
 
 if($postjson['aksi'] == "proses_register"){
	 
	 
 $password = md5($postjson['password']);
	 $your_name = $postjson['your_name'];
	 $gender = $postjson['gender'];
	 $date_of_birth = $postjson['date_of_birth'];
	 $email_address = $postjson['email_address'];
	 $today = date('y-m-d H:i:s');
	 
	  $checkMail =  $connect->query("SELECT email_address FROM tbl_users WHERE email_address = '".$email_address."'");
	 $fetchData=$checkMail->fetch_assoc();
	 
	 if($fetchData['email_address'] == $email_address){
		 $result = json_encode(array('success'=> false, 'msg'=>'Email Already Register'));
	 }else {
     $insert = $connect->query("INSERT INTO tbl_users (your_name,gender,date_of_birth,email_address,password,created_at) VALUES ('".$your_name."','".$gender."','".$date_of_birth."','".$email_address."','".$password."','".$today."')");

     if($insert){
         $result = json_encode(array('success'=> true, 'msg'=>'Register Successfully'));
     }
     else{
        $result = json_encode(array('success'=> false, 'msg'=>'Registration Error'));
     }
 }
     echo $result;
 }else if($postjson['aksi'] == "proses_login"){
	  $email_address = $postjson['email_address'];
	 $password = md5($postjson['password']);
	 
	 $checkMail =  $connect->query("SELECT * FROM tbl_users WHERE email_address = '".$email_address."' AND password = '".$password."'");
	 $fetchData=$checkMail->fetch_assoc();
	 
	 $data = array(
		'id_user' => $fetchData['id_user'],
		'your_name' => $fetchData['your_name'],
		'gender' => $fetchData['gender'],
		'date_of_birth' => $fetchData['date_of_birth'],
		'email_address' => $fetchData['email_address']
	 );
	 
	 if($fetchData){
         $result = json_encode(array('success'=> true, 'result'=>$data));
     }
     else{
        $result = json_encode(array('success'=> false, 'msg'=>'Registration Error'));
     }
	 echo $result;
	 
 }else if($postjson['aksi'] == "load_users"){
	 
	 $data = array();
	  $start = $postjson['start'];
	 $limit = $postjson['limit'];
	 
	 $query =  $connect->query("SELECT * FROM tbl_users ORDER BY id_user DESC LIMIT $start,$limit");
	
	 
	 
	 while($fetchData = $query->fetch_array()){
		 $data[] = array(
		'id_user' => $fetchData['id_user'],
		'your_name' => $fetchData['your_name'],
		'gender' => $fetchData['gender'],
		'date_of_birth' => $fetchData['date_of_birth'],
		'email_address' => $fetchData['email_address']
		);
	 }
	 
	 
	 
	 if($query){
         $result = json_encode(array('success'=> true, 'result'=>$data));
     }
     else{
        $result = json_encode(array('success'=> false, 'msg'=>'Registration Error'));
     }
	 echo $result;
	 
 }else if($postjson['aksi'] == "del_users"){
	 
	
	  $id = $postjson['id'];
	 
	 $query =  $connect->query("DELETE FROM tbl_users Where id_user = $id");
	 
	
	 
	
	 
	 
	 
	 if($query){
         $result = json_encode(array('success'=> true));
     }
     else{
        $result = json_encode(array('success'=> false));
     }
	 echo $result;
	 
 }else if($postjson['aksi'] == "proses_crud"){
	 $password = $postjson['password'];
	 $id = $postjson['id'];
	 
	 $action = $postjson['action'];
	  $checkMail =  $connect->query("SELECT password FROM tbl_users WHERE id_user = $id");
	 $fetchData=$checkMail->fetch_assoc();
	 if($password == ''){
		 $password = $fetchData['password'];
		 }else{
		 $password = md5($postjson['password']);
	 }
	  $your_name = $postjson['your_name'];
	 $gender = $postjson['gender'];
	 $date_of_birth = $postjson['date_of_birth'];
	 $email_address = $postjson['email_address'];
	 $today = date('y-m-d H:i:s');
	 if($action == 'create'){
		 
	
	 
	  $checkMail =  $connect->query("SELECT email_address FROM tbl_users WHERE email_address = '".$email_address."'");
	 $fetchData=$checkMail->fetch_assoc();
	 
	 if($fetchData['email_address'] == $email_address){
		 $result = json_encode(array('success'=> false, 'msg'=>'Email Already Register'));
	 }else {
		$insert = $connect->query("INSERT INTO tbl_users (your_name,gender,date_of_birth,email_address,password,created_at) VALUES ('".$your_name."','".$gender."','".$date_of_birth."','".$email_address."','".$password."','".$today."')");

			 if($insert){
				 $result = json_encode(array('success'=> true, 'msg'=>'Create Successfully'));
			 }
			 else{
				$result = json_encode(array('success'=> false, 'msg'=>'Create Error'));
			 }
	 }
	 }else{
		 $update = $connect->query("UPDATE tbl_users SET your_name='".$your_name."',gender='".$gender."',date_of_birth='".$date_of_birth."',password='".$password."' WHERE id_user = $id");

			 if($update){
				 $result = json_encode(array('success'=> true, 'msg'=>'Update Successfully'));
			 }
			 else{
				$result = json_encode(array('success'=> false, 'msg'=>'Update Error'));
			 }
	 }
 
     echo $result;
 }