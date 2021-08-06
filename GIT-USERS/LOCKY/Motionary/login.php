<?php
session_start();

include 'connectSql.php';
//Logging in with Google accounts requires setting special identity, so this example shows how to do it.
require 'lib/openid.php'; 
require 'lib/user.lib.php';

header('Content-Type: text/html; charset=UTF-8');
try{
    # Change 'localhost' to your domain name.
    $openid = new LightOpenID($_SERVER['HTTP_HOST']);

    //Not already logged in
    if(!$openid->mode){
        //The google openid url
        $openid->identity = 'https://www.google.com/accounts/o8/id';
         
        //Get additional google account information about the user , name , email , country
        $openid->required = array('contact/email' , 'namePerson/first' , 'namePerson/last' , 'pref/language' , 'contact/country/home'); 
         
        //start discovery
        header('Location: ' . $openid->authUrl());
    }
    else if($openid->mode == 'cancel'){
        // echo 'User has canceled authentication!';
        //redirect back to login page ??
    }     
    //Echo login information by default
    else{
        if($openid->validate()){
            //User logged in
            $ip = (string)$_SERVER['REMOTE_ADDR'];

            $d = $openid->getAttributes();
             
            $first_name = $d['namePerson/first'];
            $last_name = $d['namePerson/last'];
            $email = $d['contact/email'];
            $language_code = $d['pref/language'];
            $country_code = $d['contact/country/home'];
             
            $data = array(
                'first_name' => $first_name ,
                'last_name' => $last_name ,
                'email' => $email ,
                'locale' => $country_code,
                'ip' => $ip
            );
            
            // foreach ($d as $key => $value) {
            //     echo $key.": ".$value."<br/>";
            //     # code...
            // }

            $_SESSION['login'] = true;
            $_SESSION['first'] = $first_name;
            $_SESSION['last'] = $last_name;
            $_SESSION['mail'] = $email;
            
            //store into database
            insertUser($data);

            header('Location: index.php');

        }
        else{
            echo "not login";
            //user is not logged in
        }
    }

}
catch(ErrorException $e){
    echo $e->getMessage();
}
?>



