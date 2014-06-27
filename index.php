<?php 
$user=new stdClass();
$user->f_name='Dayan';
$user->l_name='Moreno';
$user->uname='dmoreno';
$user->email='d65yan@gmail.com';
$user->phone='3052977790';
$user->page_size=25;
$user->picture='img/nopic.jpg';
$user->id=50;

$location=new stdClass();
$location->id=4;
$location->string='Tampa';

$page=isset($_POST["pn"])?intval($_POST["pn"]):(isset($_GET["pn"])?$_GET["pn"]:0);
$cmsg=isset($_POST["cmsg"])?intval($_POST["cmsg"]):(isset($_GET["cmsg"])?$_GET["cmsg"]:-1);


$s=new stdClass();
$s->name='Squares sheet';
$s->thumb='styles/images/thumbs/squares_sheet.png';
$s->image='styles/images/fullnotes/squares_sheet.png';
$s->id=45;
$styles[]=$s;

$s=new stdClass();
$s->name='no pic';
$s->thumb='img/nopic.jpg';
$s->image='img/nopic.jpg';
$s->id=76;
$styles[]=$s;


?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link rel="stylesheet" type="text/css" href="css/prompt.css"/>
        <style>
            @import "css/jquery.maxlength.css";
            
            #WUATP{
                position:absolute;
                left:50%;
                width:960px;
                margin-left:-480px;
                height:auto;
                
            }
            
            .rotate{
                width:175px;
                height:59px;
                top:10px;
                position:absolute;
                background-position: center center;
                background-repeat: no-repeat;
                
            }
            
            #move_left{
                left:10px;
                background-image: url('img/arrow_prev.png');
            }
           
            #move_right{
                right:10px;
                background-image: url('img/arrow_next.png');
            }
           
            #wall_content{
                position:relative;
                height:960px;
            }
            
            .note{
                background-color:white;
                width:80px;
                height:65px;
                position: relative;
                margin:40px;
                font-size: 12px;
                color:black;
                padding:5px;
                padding-top:20px;
                text-align:center;
                
                -moz-box-shadow: 6px 6px 10px 1px #333;
                -webkit-box-shadow:6px 6px 10px 1px #333;
                box-shadow:6px 6px 10px 1px #333;
                
                cursor:pointer;
            }
            
            .note .replies_number{
                background-color:red;
                color:white;
                position: absolute;
                right:5px;
                top:-5px;
                font-size: 11px;
                padding:3px;
                padding-top:10px;
                font-style:bold;
                
            }
            
            #wall_content>div{
                position:absolute;
            }
           
            #notes_content{
                width:960px;
            }
           
            #notes_content table{
                margin-left:55px;
                margin-top:75px;
                  
            }
            
            .overall{
                position:absolute;
                top:0px;
                background-color:black;
                opacity: .4;
                width:100%;
                height:100%;
                -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
                filter: alpha(opacity=40);
            } 
            
            .user_dialog{
                margin-left:-200px;
                width:400px;
                background-color:black;
                color:white;
            }
            
            .message_dialog{
               
                margin-left:-300px;
                width:600px;
                background-color:white; 
                
            }
            
            .dialog{
                 position:absolute;
                left:50%;
                top:200px;
                
            }
            
            #process_dialog{
                height:50px;
                width:200px;
                background-color:white;
                font-weight: bold;
                top:50%;
                margin-top:-25px;
                margin-left:-100px;
            }
            
            #dialog #dialog_close{
                top:-10px;
                right:-10px;
                width:20px;
                height:20px;
                position:absolute;
                background-image:url("img/close_dialgo_button.png");
                background-position: center center;
                background-repeat: no-repeat;
                cursor:pointer;
            }
            
            #dialog #dialog_content{
                margin:40px;
            }
            .message_dialog #dialog_content td{
                vertical-align: top;
            }
            
           
            .message_dialog #dialog_content td img{
                width:80px;
                height:80px;
                margin-left:10px;
            }
            
            .message_dialog #dialog_content .message_title{
                font-weight: bold;
                font-size: 12px;
                margin-bottom:10px;
            }
            
            #all_replies{
                height:145px;
                overflow:hidden;
                position:relative;
                
            }
            
            .reply_wrapper{
                height:120px;
                border-bottom-style: solid;
                border-bottom-width: thin;
                
            }
            
            .action_link{
                color:blue;
                size:13px;
                margin-left:5px;
                margin-top:5px;
                cursor:pointer;
            }
            
            .expand_list{
                text-align:right;
            }
            
            .expand_list span{
                color:blue;
                cursor:pointer;
            }
            
            #message_reply_button{
                padding-left:20px;
                padding-right:20px;
                padding-top:5px;
                padding-bottom:5px;
                background-color:#3232ac;
                color:white;
                margin-left:50px;
                margin-right:50px;
                cursor:pointer;
            }
           
            #message_report_button{
                padding-left:20px;
                padding-right:20px;
                padding-top:5px;
                padding-bottom:5px;
                background-color:#b80404;
                color:white;
                cursor: pointer;              
            }            
            
            /*.scrolla-y {
                position:absolute;
                right:0px;
                width:10px;
                background:#000;
                border-radius:3px;
                box-sizing:border-box;
                border:1px solid #fff;
            }*/
            
            #new_reply_wrapper textarea{
                width:100%;
                height:100px;
            }
            .buttons_list{
                margin: 0;
                padding:0;
                list-style: none;
                margin-left:10px;
            }
            
            ul.buttons_list li{
                margin: 0;
                padding:0;
                margin-bottom:5px;
                padding:5px;
                color:white;
                cursor:pointer;
                text-align:center;
            }
            
            #cancel_reply_button{
                background-color:#b80404;
                cursor:pointer;
            }
            
            #clear_reply_button{
                background-color:#3232ac;
                cursor:pointer;
            }
            
            #send_reply_button{
                background-color:#2b9114;
                cursor:pointer;
            }
            
            .message_checkboxes{
                margin-top:5px;
            }
            
            .message_checkboxes input[type=checkbox]{
                margin-left:30px;
            }
            
            #new_reply_wrapper{
                background-color:#cfcfcf;
            }
            
            .parent_menu{
                position:relative;
            }
            
            .sub_menu{
                display:none;
                padding:0px;
                margin:0px;
                position:absolute;
                margin-top:0px;
                z-index: 3000;
                cursor:pointer;
            }
            
            .parent_menu:hover .sub_menu, .parent_menu:active .sub_menu{
                display:block;
            }
            .sub_menu:hover{
                display:block;
            }
            
            .location_selector{
                width:100px;
            }
            
            .locations_table tr td:first-child{
                text-align:right;
            }
            
            #new_message_content{
                height:200px;
                padding:10px;
                padding-top:10px;
                width:240px
            }
            
            #new_message_content textarea{
                height:100px;
                background-color: transparent;
                width:200px;
                margin-left:30px;
            }
            
            #new_message_content input[type=text]{
                background-color: transparent;
                width:200px;
            }
            
            ul.styles_list{
                margin:0;
                margin-left:5px;
                list-style: none;
                padding-left:10px;
            }
            
            ul.styles_list li{
                padding:0px;
                margin:0px;
            }
            
            .new_message_buttons_list li{
                display:inline;
                margin-left:15px !important;
                margin-right:15px !important;
                padding-left:20px !important;
                padding-right:20px !important; 
            }
            
            .buttons_list.horizontal{
                margin-top:30px;
                margin-left:200px;
            }
            
            #new_message_div{
                position:absolute;
                top:60px;
                left:450px;
                width:112px;
                height:144px;
                background-image: url("img/new_message.png");
                background-repeat:no-repeat;
                background-position: top center;
                cursor:pointer;
           }
           
           #new_message_div:hover{
               background-position: bottom center;
           }
           
        </style>
        
        <script type="text/javascript" src="js/json2.js"></script>   
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script type="text/javascript" src="js/cube/lib/Animation/Cube.js"></script>
        <script type="text/javascript" src="js/prompt.js"></script>
        <script type="text/javascript" src="js/sha1.js"></script>
        <script type="text/javascript" src="js/api.js"></script>
        <script type="text/javascript" src="js/classes.js"></script>
        <script type="text/javascript" src="js/post_office.js"></script>
        <script type="text/javascript" src="js/jquery.maxlength.min.js"></script>
            <script>
                var cube_list = [
                    "img/wall0.png",
                    "img/wall0.png",
                    "img/wall0.png",
                    "img/wall0.png",
                ];
                
                var styles=<?php echo json_encode($styles);?>;
                
                
                var styles_html='';
                
                for(var i=0;i<styles.length;i++){
                    var tImg= styles[i].image;
                    var tThu= styles[i].thumb;
                    styles[i].image=new Image();
                    styles[i].image.src=tImg;
                    
                    styles[i].thumb=new Image();
                    styles[i].thumb.src=tThu;
                    var state=i==0?'checked="true"':'';
                    styles_html+='<li><label><input  type="radio" value="'+i+'" '+state+' name="style_select" class="style_selector">'+styles[i].name+'<label></li>';
                }
                
                var postoffice=null;
                var user=null;
                var loc=<?php echo json_encode($location)?>;
                $(document).ready(function(){
                    var cube = new Animation.Cube("brick_wall",cube_list);
                    cube.rotateSeconds = 5;
                    
                     user= new User(<?php echo json_encode($user)?>);
                     postoffice=new PostOffice();
                     postoffice.GetMessages(user.page_size,<?php echo $page?>*1);
                    
                    
                    cube.onInterval=function(e){
                        cube.finish();
                        postoffice.animating=0;
                        if(postoffice.loading==0)
                            postoffice.DrawMessages();
                };
                     $('.rotate').click(function(e){
                         postoffice.ClearWall();
                         postoffice.animating=1;
                         
                         var inc=(e.target.id=='move_left')?-1:1;
                         
                         postoffice.GetMessages(user.page_size,inc);
                         var direction=e.target.id=='move_right'
                         try{
                         cube.clockWise=direction;
                         cube.rotate();
                         }
                         catch(ex){
                             postoffice.animating=0;
                         }
                     });
                 
                    $('#country_select').change("postoffice.GetStates(this.value)");
                    
                    
                        postoffice.locDialogHtml='<table style="width:100%;" class="locations_table">\
                        <tr>\
                            <td>\
                            Country</td><td>\
                                <select class="location_selector" id="country_select">\
                                   <option  value="1">country 1</option>\
                                   <option  value="2" selected="selected">country 2</option>\
                                   <option  value="3">country 3</option>\
                                   <option  value="4">country 4</option>\
                                </select>\
                            </td>\
                            <td rowspan="3">\
                               Lorem ipsum ad his scripta blandit partiendo, eum fastidii accumsan euripidis in, eum liber hendrerit an.\
                            </td>\
                         </tr>\
                         <tr>\
                            <td>\
                            State</td><td>\
                                <select class="location_selector" id="state_select">\
                                    <option  value="1">state 1</option>\
                                    <option  value="2">state 2</option>\
                                    <option  value="3">state 3</option>\
                                    <option  value="4">state 4</option>\
                                    <option  value="5" selected="selected">state 5</option>\
                                    <option  value="6">state 6</option>\
                                    <option  value="7">state 7</option>\
                                    <option  value="8">state 8</option>\
                                </select>\
                            </td>\
                            </tr>\
                        <tr>\
                        <td>\
                            City</td><td>\
                                <select class="location_selector" id="city_select" name="city_select">\
                                    <option  value="1">city 1</option>\
                                    <option  value="2">city 2</option>\
                                    <option  value="3">city 3</option>\
                                    <option  value="4">city 4</option>\
                                    <option  value="5" selected="selected">city 5</option>\
                                    <option  value="6">city 6</option>\
                                    <option  value="7">city 7</option>\
                                    <option  value="8">city 8</option>\
                                </select>\
                            </td>\
                        </tr>\
                     </table>';
         
                 <?php if(intval($cmsg)>0):?>
                 postoffice.cmsg=new Message({id:<?php echo $cmsg;?>,type:"message"});
                 postoffice.cmsg.GetDetails();
            <?php endif;?>
                });
                
                var processDialog={
                    opened:false,
                    show:function(){
                        var overall=$('#process_overall')[0]; 
                        $(overall).css('display','block'); 
                        var dialog=$('#process_dialog')[0]; 
                        $(dialog).css('display','block');
                        this.opened=true;
                    },
                    hide:function(){
                       
                        var overall=$('#process_overall')[0]; 
                        $(overall).css('display','none'); 
                        var dialog=$('#process_dialog')[0]; 
                        $(dialog).css('display','none');
                        this.opened=false;
                    }
                }
            </script>
    </head>
    <body>
        
        <div id="WUATP">
            <div id="new_message_div" onclick="postoffice.CreateMessage();" style="z-index:3000"></div>
            <div id="wall_header">
                <table>
                    <tr>
                        <td class="header_user_location">
                            <h2>Hello <?php echo $user->f_name; ?></h2><br/>
                            <h2>You are looking at the <span id="location_span"><?php echo $location->string;?></span> wall</h2>
                        </td>
                        <td class="header_user_profile" style="vertical-align:top">
                            <span class="parent_menu">
                                Profile
                                <ul class="sub_menu">
                                    <li onclick="user.Load();">Edit Info</li>
                                    <li onclick="user.ResetPassword();">Reset password</li>
                                    <li onclick="">Logout</li>
                                </ul>
                            </span>
                        </td>
                        <td class="header_user_settings" style="vertical-align:top">
                            <span onclick="postoffice.PresentLocations();">
                               Settings
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="wall_content">
                <div id="wall" style="z-index:1000">
                    <img id="brick_wall" src="img/wall0.png" width="960" height="960"><br/>
                </div>
                <div id="notes" style="z-index:1001">
                    <div class="rotate"  id="move_left" style="z-index:1004"></div>
                    <div class="rotate"  id="move_right" style="z-index:1004"></div>
                    <div id="notes_content"></div>
                </div>
            </div>
            <div id="wall_footer">
            </div>
            <div id="overall" style="display:none;z-index: 2000" class="overall"></div>
            <div style="z-index:2001; display: none" class="dialog" id="dialog">
                <div id="dialog_close" onclick="var overall=$('#overall')[0]; $(overall).css('display','none'); var dialog=$('#dialog')[0]; $(dialog).css('display','none');"></div>
                <div id="dialog_content"></div>
            </div>
            <div id="overall" style="display:none;z-index: 2000" class="overall"></div>
            <div style="z-index:2001; display: none" class="dialog" id="dialog">
                <div id="dialog_close" onclick="var overall=$('#overall')[0]; $(overall).css('display','none'); var dialog=$('#dialog')[0]; $(dialog).css('display','none');"></div>
                <div id="dialog_content"></div>
            </div>
            <div id="process_overall" style="display:none;z-index: 3000" class="overall"></div>
            <div style="z-index:3001; display: none"  id="process_dialog" class="dialog">
                <table><tr><td><img src="img/loading.gif"></td><td> please wait</td></tr></table>
            </div>
        </div>
        <?php
        // put your code here
        ?>
    </body>
</html>
