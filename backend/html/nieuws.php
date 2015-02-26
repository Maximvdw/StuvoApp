<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
header('Access-Control-Allow-Origin: *');  
 
require_once realpath(dirname(__FILE__) . '/../autoload.php');
require_once realpath(dirname(__FILE__) . '/../config.php');

$facebook = new Facebook(array(
  'appId'  => $config['facebookapi']['appid'],
  'secret' => $config['facebookapi']['secret'],
));

$pagePosts = $facebook->api($config['facebookapi']['stuvopage']. '/feed/');
echo json_encode($pagePosts);
?>