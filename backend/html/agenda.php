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

$currentMonth = date('n');
$currentYear = date('Y');

$i = 0;
$monthStr = "Deze Maand";
foreach ($events->getItems() as $event) {
	// Laad event data
	$eventName = $event->summary;
	$eventTime = strtotime($event->start->dateTime);
	$eventDateStr = date('d/m',$eventTime);
	$eventMonth = date('n',$eventTime);
	$eventYear = date('Y',$eventTime);
	$eventId = $event->id;
	$eventDescription = $event->description == null ? "" : $event->description;
	
	if ($eventMonth == $currentMonth){
		$monthStr = "Deze Maand";
	}else{
		if ($eventYear == $currentYear)
			$monthStr = date('F',$eventTime);
		else
			$monthStr = date('F Y',$eventTime);
	}
	
	// Zet event data in array voor JSON output
	$output['events'][$monthStr][$i]['name'] = $eventName;
	$output['events'][$monthStr][$i]['date'] = $eventDateStr;	
	$output['events'][$monthStr][$i]['description'] = $eventDescription;	
	$output['events'][$monthStr][$i]['id'] = $eventId;	
	$i++;
}

echo json_encode($output);
?>