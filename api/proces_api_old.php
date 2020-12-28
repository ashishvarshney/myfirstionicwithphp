<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");
include "config.php";
//echo "sfsdf";die;
 $postjson = json_decode(file_get_contents('php://input'),true);
 $today = date('y-m-d H:i:s');
 if($postjson['aksi'] == "proses_register"){
     $password = md5($postjson['password']);

     $insert = mysqli_query($mysqli, "INSERT INTO tbl_users SET id_user = '',
     your_name =  '$postjson[your_name]',
     gender =  '$postjson[gender]',
     date_of_birth =  '$postjson[date_of_birth]',
     email_address =  '$postjson[email_address]',
     password = '$password',
     created_at =  '$today',
     ");
     if($insert){
         $result = json_encode(array('success'=> true, 'msg'=>'Register Successfully'));
     }
     else{
        $result = json_encode(array('success'=> false, 'msg'=>'Registration Error'));
     }
     echo $result;
 }