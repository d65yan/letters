<?php

//session_start();
include_once('credentials.php');
header('contentType:application/json');
if(!is_null($o->errorno)){
	echo json_encode($o);
}

switch( $_SERVER['REQUEST_METHOD'])
{
	case 'GET':{
		$i=json_decode($_GET['i']);		
		if(!is_null($i->countryId))
			GetCities();
		else
			GetCountries();
		break;
	}
	case 'POST':{
		$i=json_decode($_POST['i']);
		if(intval($i->id)==-1)
		Create();
		else
		{
				Update();
		}
		
		break;
	}
	
	
	
}
echo json_encode($o);

function GetCountries()
{
    GLOBAL $i;
    GLOBAL $o;
    GLOBAL $mysqli;
    $tQuery='SELECT id,name FROM countries';
    
        if(isset($i->default)){
        $tQuery.=' WHERE id <> '.$i->default;
        $result=$mysqli->query('SELECT id,name FROM countries WHERE id='.$i->default);
        if($result->num_rows>0)
            $o->countries[]=$result->fetch_object();
    }
    
    $result=$mysqli->query($tQuery);
    while($country=$result->fetch_object()){
        $o->countries[]=$country;
    }
}

function GetCities()
{
    GLOBAL $i;
    GLOBAL $o;
    GLOBAL $mysqli;
    $tQuery='SELECT id,name FROM country_admin0 WHERE country_id='.$i->countryId;
    if(isset($i->default)){
        $tQuery.=' AND id <> '.$i->default;
        $result=$mysqli->query('SELECT id,name FROM country_admin0 WHERE id='.$i->default);
        if($result->num_rows>0)
            $o->cities[]=$result->fetch_object();
    }
    $result=$mysqli->query($tQuery);
    while($city=$result->fetch_object()){
        $o->cities[]=$city;
    }
}
?>
