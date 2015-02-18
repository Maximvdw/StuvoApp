<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
header('Access-Control-Allow-Origin: *');  
 
require_once realpath(dirname(__FILE__) . '/../autoload.php');
require_once realpath(dirname(__FILE__) . '/../config.php');

$client = new Google_Client();
$client->setApplicationName($config['googleapi']['name']);
$client->setDeveloperKey($config['googleapi']['key']);

$cal = new Google_Service_Calendar($client);
$params = array(
	'singleEvents' => true,
	'orderBy' => 'startTime',
	'timeMin' => date(DateTime::ATOM),
	
);
$events = $cal->events->listEvents($config['googleapi']['calendarid'], $params);

// Output array
$output = array();

$i = 0;
foreach ($events->getItems() as $event) {
	$eventName = $event->summary;
	$eventDateStr = date('d/m',strtotime($event->start->dateTime));

	$output['events'][$i]['name'] = $eventName;
	$output['events'][$i]['date'] = $eventDateStr;
	$i++;
}

echo json_encode($output);
?>