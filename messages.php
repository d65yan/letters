<?php
$i=new stdClass();
$o=new stdClass();
if($_GET['i']){
    $i=  json_decode($_GET['i']);

    
if(isset($i->id)){
    $o->message=new stdClass();
    $o->message->id=1;
    $o->message->replies_number=5;
    $o->message->user_id=6;
    $o->message->user_name='usuario_x';
    $o->message->user_picture='img/nopic.jpg';
    $o->message->private=0;
    $o->message->title='Title';
    $o->message->message='qasdsdadadasdf adsasdfasdfsdfasdfasdf adsfasdfascascascascasc scascsacascsac ascsacascs sdcascascascs ascsacacacdacd ascsacsacsacasc sacsacascsa';
    $o->message->created_at='fecha y hora';
    $o->message->style_image='styles/images/fullnotes/squares_sheet.png';
    for($count=0;$count<5;$count++){
        $temp=new stdClass();
        $temp->id=1;
        $temp->user_id=6+$count;
        $temp->user_name='usuario_'.$count;
        $temp->user_picture='img/nopic.jpg';
        $temp->private=0;
        $temp->title='Title for reply '.$count;
        $temp->message='This is a sample reply '.$count.' for development proposes';
        $o->message->replies[]=$temp;
    }
}
else{
       for($count=0;$count<$i->page_size;$count++){
           $temp=new stdClass();
            $temp->id=1;
            $temp->replies_number=5;
            $temp->style_thumb='styles/images/thumbs/squares_sheet.png';
            $temp->private=0;
            $temp->title='Title for message '.($i->page_number.$count);
            $temp->message='This is a sample message '.($i->page_number+$count).' for development proposes';
            $o->messages[]=$temp;
       }
       $o->pages=4;
       $o->page=$i->page_number;
}
}
else if($_POST['i']){
    $i=  json_decode($_POST['i']);
    if(intval($i->id==-1)){
        
        $o->id=5;
        
    }
    else if(intval($i->id)>0){
        $o->success=1;
        $o->msg='Your report has been filed, we\'ll review it as soon a possible.\nThank you for your help';
    }
}
sleep(1);
echo json_encode($o);
?>
