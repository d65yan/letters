<?php
$i=new stdClass();
$o=new stdClass();
if($_GET['i']){
    $i=  json_decode($_GET['i']);

    
if(isset($i->id)){
 
}
else{
 
}

}
else if($_POST['i']){
    $i=  json_decode($_POST['i']);
    if(isset($i->param)){
        if(!strcmp($i->param,'gravatar')){
            $o->param='gravatar';
            $o->value='img/foto2.jpg';
        }
        else{
            $o->param=$i->param;
            $o->value=$i->value;
        }
        
         $o->success=1;
        
        
        
    }
    
}
else if($_POST['user_photo'])
{
    echo '<script>parent.user.SetPicture("img/foto1.jpg")</script>';
    exit;
}

sleep(2);
echo json_encode($o);
?>
