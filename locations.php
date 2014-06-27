<?php




if(isset($_GET['i']))
    $i=  json_decode($_GET['i']);
else{
    $i=new stdClass();
}

$o=new stdClass();
if(isset($i->state_id)){
    for($c=0;$c<10;$c++){
        $temp=new stdClass();
        $temp->id=$c;
        $temp->name='city '.$c.' state '.$i->state_id;
        $o->locations[]=$temp;
    }
}
else if(isset($i->country_id)){
       for($c=0;$c<5;$c++){
        $temp=new stdClass();
        $temp->id=$c;
        $temp->name='state '.$c.' country '.$i->country_id;
        $o->locations[]=$temp;
    }
}
else{
        for($i=0;$i<3;$i++){
        $temp=new stdClass();
        $temp->id=$i;
        $temp->name='country_'.$i;
        $o->locations[]=$temp;
    }
}

echo json_encode($o);
?>
