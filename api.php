<?php
require_once realpath(dirname(__FILE__) . '/autoload.php');
require_once realpath(dirname(__FILE__) . '/config.php');

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
foreach ($events->getItems() as $event) { 
	$eventName = $event->summary;
	$eventDateStr = $event->start->dateTime;
	
	echo $eventDateStr.'  '.$eventName.'<br>';
}
?>