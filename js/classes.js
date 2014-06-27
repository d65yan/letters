var templates={
    message:{
        container:'<div class="message_wrapper">\
                    <div style="border-bottom-style:solid; border-bottom-width:thin;">\
                        <table><tr><td style="width:90%"><div class="message_title">_TITLE_</div>\
                        <div class="message_content">_MESSAGE_</div></td><td><img src="_USER_PICTURE_" BORDER="0"></td></tr></table>\
                        <span>Posted at :_CREATED_AT_</span><span id="message_reply_button">Reply</span><span id="message_report_button" onclick="postoffice.cmsg.Report();">Report</span>\
                        <br/><br/>\
                    </div>\
                    <div id="new_reply_wrapper" style="display:none">\
                        <table style="width:100%"><tr><td style="width:80%"><textarea id="message_-1_message" ></textarea></td>\
                        <td >\
                            <ul class="buttons_list message_reply_buttons_list">\
                                <li id="cancel_reply_button">Cancel</li>\
                                <li id="clear_reply_button">Clear</li>\
                                <li id="send_reply_button">Post</li>\
                           </ul>\
                        </td></tr></table>\
                        <input type="hidden" id="message_-1_private_msg" value="0">\
                        <span class="message_checkboxes"><label for="private_msg_check"><input type="checkbox" value="private_msg" id="private_msg_check">Private</label></span>\
                    </div>\
                    <div  id="all_replies">\
                        <div class="first_reply">_REPLYSTR_0_</div>\
                        <div class="expand_list" style="_REPLYSTYLE_"><span id="expand_list_link">See all</span></div>\
                        <div class="replies" style="display:none">_REPLIESTR_</div>\
                        </div>\
                    </div>',
        list:'',
        new_message:'<div id="new_message_wrapper">\
                        <table style="width:100%"><tr><td style="width:240px">\
                        <div id="new_message_content">\
                        <label>Title: <input type="text" id="message_-1_title" value="_TITLE_"></label><br/>\
                        Message:<br/>\
                        <textarea id="message_-1_message" >_MESSAGE_</textarea><br/>\
                        <input type="hidden" id="message_-1_anonymous_msg" value="0">\
                        <span class="message_checkboxes"><label><input type="checkbox" value="anonymous_msg" id="anon_msg_check">Anonymous</label></span>\
                       </div> </td>\
                        <td rowspan="2" style="vertical-align:top">\
                            <ul class="styles_list">\
                            Select a style\
                                _STYLES_\
                            </ul>\
                            <input type="hidden" id="message_-1_style_id" value="_STYLE_ID_">\
                        </td>\
                        <td style="vertical-align:top">\
                        On the wall:<br/>\
                        <img stye="width:90px; height:90px" id="wall_preview_image">\
                        </td>\
                        </tr>\
                        </table>\
                        <ul class="horizontal buttons_list new_message_buttons_list">\
                                <li id="cancel_reply_button">Cancel</li>\
                                <li id="clear_reply_button">Clear</li>\
                                <li id="send_reply_button">Post</li>\
                         </ul>\
                    </div>'
    },
    reply:{
        list:'<div class="reply_wrapper">\
            <table><tr><td style="width:90%"><p>_MESSAGE_</p></td><td><img src="_USER_PICTURE_"></td></tr></table>\
        <span idx="_IDX_" class="action_link reply_report_link" onclick="postoffice.cmsg.ReportReply(_IDX_);">Report</span>\
            </div>'
    },
    user:{
        container:'<div id="user_wrapper">\
            <table>\
                <tr>\
                    <td>\
                        <img style="width:100px;height:100px" id="user_pic" src="_PICTURE_">\
                        <div style="width:0px; height:0px; visibility:hidden" >\
                            <form target="target_image" action="users.php" method="post" id="user_image_form">\
                                <input type="file" name="user_photo"id="user_photo" onchange="$(\'#user_image_form\').submit();">\
                                <iframe id="target_image" name="target_image">\
                                </iframe>\
                            </form>\
                        </div>\
                    </td>\
                    <td>\
                        <ul>\
                            <li id="user_dialog_image_upload_button" onclick="$(\'#user_photo\').click();">Upload picture</li>\
                            <li id="user_dialog_use_gravatar_button" onclick="user.RequestGravatar();">Use Gravatar</li>\
                        </ul>\
                        <input type="hidden" id="user__ID__picture" value="_PICTURE_"/>\
                    </td>\
                </tr>\
                <tr>\
                    <td>First Name</td>\
                    <td><input id="user__ID__f_name" class="user_details_input" value="_F_NAME_"></td>\
                </tr>\
                <tr>\
                    <td>Last Name</td>\
                    <td><input id="user__ID__l_name" class="user_details_input" value="_L_NAME_"></td>\
                </tr>\
            </table>\
            <div style="margin-top:30px;"><span style="margin-left:160px; background-color:green; padding:5px; padding-left:10px; padding-right:10px;" onclick="user.UpdateFromUI(function(){user.dialog.Hide();})">Save</span><span onclick="user.dialog.Hide()" style="padding:5px; padding-left:10px; padding-right:10px; margin-left:50px; background-color:green">Cancel</span></div>\
        </div>'
        
    }
};

function Generic(a)
{
	if(a){
		for(var i in a){
			if(!$.isFunction(a[i]) && !$.isArray(a[i]) && !$.isPlainObject(a[i]))
				this[i]=a[i];
			else if(!$.isFunction(a[i]) && $.isArray(a[i]) || $.isPlainObject(a[i]))
				this[i]=$.extend({},a[i]);
		}
	}
}

Generic.prototype.api=new Api();

Generic.prototype.GetProps=function()
{
	var obj={};
	for(var i in this){
		if(this[i]==null ||(!$.isFunction(this[i]) && ($.type(this[i])!='object')  && !$.isArray(this[i])))
		{
			var val='';
			if(this[i]!=null)
				val=this[i];
			obj[i]=val;
		}
	}
	return obj;
}

Generic.prototype.toStr=function(templateStr)
{
	templateStr=templateStr||'';
	var obj=this.GetProps();
        delete obj.id;
        delete obj.type;
	for(var i in obj){
            if(this[i]!=null && i!='reason'){
		var reg=new RegExp('_'+i.toUpperCase()+'_','g');
                var sel_reg=new RegExp('_SEL_OPT_'+i.toUpperCase()+'_'+this[i]+'_','g');
		templateStr=templateStr.replace(sel_reg,'selected="selected"').replace(reg,(this[i]!=null)?this[i]:'');
            }
	}
        templateStr=templateStr.replace(/_ID_/g,this.id).replace(/_TYPE_/g,this.type);
	return templateStr;
}

Generic.prototype.UpdateFromUI=function(func,scope)
{
  
    
	var obj=this.GetProps();
	for(var i in obj)
	{
		var elemId=this.type+'_'+this.id+'_'+i;
		value='';

		if($('#'+elemId)[0])
			value=$('#'+elemId)[0].value	
		else
			value=this[i];

		if(this[i]!=value){
                    if(!processDialog.opened)
                        processDialog.show();
    
                    if(!this.updateCounts)
                        this.updateCounts=0;
    
                    this.updateCounts++;
                    this.Update(i,value.toString().replace(/<br _moz_editor_bogus_node="TRUE" \/>/g,''),func,scope);
                }

	}


}

Generic.prototype.Update=function(param,value,func,scope,extras)
{
	this.api.Update(param,value,func,scope,this,extras);
}

Generic.prototype.Create=function(func,scope,param1)
{
	this.api.Create(this,func,scope,param1);
}

Generic.prototype.Erase=function(object,func,scope)
{
	this.api.Erase(object,func,scope);
}

Generic.prototype.Load=function(array,obj,func,widget,constraints)
{
	this.api.Load(array,obj,func,widget,constraints);
}

Generic.prototype.ImportFromUI=function()
{
	var obj=this.GetProps();
	for(var i in obj)
	{
		var elemId=this.type+'_'+this.id+'_'+i;
		value='';
		if($('#'+elemId)[0])
			value=$('#'+elemId).val()
		else
			value=this[i];

		this[i]=!$.isPlainObject(value)?value.toString().replace(/<br _moz_editor_bogus_node="TRUE" \/>/g,''):value;
	}


}

Generic.prototype.Set=function(prop,value)
{
	this[prop]=value;
}

Generic.prototype.GetElement=function(array,id)
{
	if(!this[array])
		return false;
	for(var i=0;i<this[array].length;i++)
	{
		if(id==this[array][i].id)
		{
			this[array][i].idx=i;
			return this[array][i];
		}
	}
	return -1;
}



function User(a)
{
    this.generic=Generic;
    this.generic(a);
    this.type="user";
	this.ResetPassword=function(password){
		            var statesdemo = {
            state0: {
		title: 'Name',
		html:'<label>New password <input type="password" name="new_pass" value=""></label><br/>\
                <label>Confirm password <input type="password" name="confirm_pass" value=""></label><br/>\n\
                <div style="color:red;display:none" id="failed_new_pass_cont"></div>',
		buttons: { 'Reset password': true,"Cancel":false },
		focus: 1,
		submit:function(e,v,m,f){ 
                    if(v){
                            f.new_pass=$.trim(f.new_pass);
                            f.confirm_pass=$.trim(f.confirm_pass);
                            if(f.new_pass=='' || f.confirm_pass==''){
                                $('#failed_new_pass_cont').html('The Password and its confirmation must be provided');
                                $('#failed_new_pass_cont').css('display','block');
                                e.preventDefault();
                            }
                            else if(f.new_pass!=f.confirm_pass){
                                $('#failed_new_pass_cont').html('The Password and its confirmation must match');
                                $('#failed_new_pass_cont').css('display','block');
                                e.preventDefault();
                            }
                            else{
                                user.Update('password',SHA1(f.new_pass),function(){
                                    $.prompt('Your password has been updated');
                                })
                            }
                    }
		}
            }
        };

        $.prompt(statesdemo);
	}  
        
        this.Load=function(){
            var str=this.toStr(templates.user.container)
            this.dialog.SetContent(str)
            this.dialog.Show();
        }
        
        this.SetPicture=function(img){
            var image=$('#user_pic')[0];
            if(image)
                $(image).attr('src',img);
            
            var iUrl=$('#user_'+this.id+'_picture');
            
            if(iUrl)
                $(iUrl).val(img);
        }
        
        this.RequestGravatar=function(){
            var statesdemo = {
            state0: {
		title: 'Name',
		html:'<label>Gravatar email <input type="text" name="gemail" value=""></label><br />',
		buttons: { 'Get Image': true,"Cancel":false },
		focus: 1,
		submit:function(e,v,m,f){ 
                    if(v){
			user.Update('gravatar',f.gemail,function(){
                            user.SetPicture(user.gravatar);
                            delete user.gravatar;
                        })
                    }
		}
            }
        };

        $.prompt(statesdemo);
        }
}
User.prototype=new Generic;
User.prototype.dialog=new Dialog('user_dialog');

function Message(a){
   this.generic=Generic;
    this.generic(a);
    this.type='message';
    this.GetDetails=function(){
        this.api.Specific(this,this.Load,'id');
    };
    
    this.Load=function(){
        
        
        this.replieStr='';
        this.replyStr_0='';
        this.replyStyle='display:none';
        if(this.replies && this.replies.length>0){
            this.replies[0].idx=0;
            this.replies[0]=new Reply(this.replies[0])
            this.replyStr_0=this.replies[0].toStr(templates.reply.list);
            for(var i=1;i<this.replies.length;i++){
                this.replyStyle='';
                this.replies[i].idx=i;
                this.replies[i]= new Reply(this.replies[i]);
                this.replieStr+=this.replies[i].toStr(templates.reply.list);
            }
        }
        var str=this.toStr(templates.message.container)
        this.dialog.SetContent(str)
        this.dialog.Show();
        $('#dialog').css('background-image','url("'+this.style_image+'")');
        $('#expand_list_link').click(function(e){
            $('.replies').css('display','block');
          $('#all_replies').css('overflow-y','auto');
          $('.expand_list').css('display','none');
          var alto=$('#all_replies').css('height').replace(/px/,'')*1;
          alto+=100;
          $('#all_replies').css('height',alto+'px');
        });
        
        
        $('#message_reply_button').click(function(e){
            $('#new_reply_wrapper').css('display','block');
          /*$('#all_replies').css('overflow-y','auto');
          $('.expand_list').css('display','none');
          var alto=$('#all_replies').css('height').replace(/px/,'')*1;
          alto+=100;
          $('#all_replies').css('height',alto+'px');*/
        });
        $('#cancel_reply_button').click(function(e){
            $('#new_reply_wrapper').css('display','none');
        });
        
        $('#clear_reply_button').click(function(e){
            $('#message_-1_message').val('');
            $('#message_-1_private_msg').attr('checked',false);
            $('#message_-1_anonymous_msg').attr('checked',false);
        });


        $('#send_reply_button').click(function(e){
            postoffice.cmsg.Reply();
        });


        $('.message_checkboxes input[type=checkbox]').click(function(e){
           var tId=$(this).attr('value'); 
               $('#message_-1_'+tId).val($(this).is(':checked')?"1":"0");
        });
        //cancel_reply
        $('#message_-1_message').maxlength({max: 144});
    }
    
    this.Report=function(){
        
        postoffice.reportMsg=this;
        var statesdemo = {
            state0: {
		title: 'Report',
		html:'You are about to report this message due to impropper content.<br/>Do you wish to proceed?',
		buttons: { 'Yes, Report it': true,"No, Its a mistake":false },
		focus: 1,
		submit:function(e,v,m,f){ 
                    if(v){
                         postoffice.reportMsg.Update('reported',1,function(obj,msg){$.prompt(msg.replace(/\\n/,'\n'));})   
                         delete postoffice.reportMsg;
                    }
		}
            }
        };

        $.prompt(statesdemo);
        
    };
    
    this.Reply=function(){
        var msg=new Message({id:-1,message:'',parent_id:this.id,private_msg:false,anonymous_msg:false});
           msg.ImportFromUI();
           msg.Create(function(){
            postoffice.cmsg.dialog.Hide();   
           });
    };
    
    this.DrawReplys=function(){
        
    };
    
    this.AddReply=function(msg){
        
    };
    
    this.GetReplys=function(){
        
    };
    
    this.ReportReply=function(idx){
        this.replies[idx].Report();
    }
    
    this.CreateNew=function(){
       this.styles=styles_html;
       this.dialog.SetContent(this.toStr(templates.message.new_message));
       this.dialog.Show();
       delete this.styles; 
       $('#new_message_content').css('background-image','url("'+styles[0].image.src+'")');
       $('#wall_preview_image').attr('src',styles[0].thumb.src);
       
       $('.message_checkboxes input[type=checkbox]').click(function(e){
           var tId=$(this).attr('value'); 
               $('#message_-1_'+tId).val($(this).is(':checked')?"1":"0");
        });
       
       $('.style_selector').click(function(e){
           var idx=$(this).val();
           $('#message_-1_style_id').val(styles[idx].id);
           $('#new_message_content').css('background-image','url("'+styles[idx].image.src+'")');
           $('#wall_preview_image').attr('src',styles[idx].thumb.src);
       });
       
       $('#cancel_reply_button').click(function(e){
            postoffice.cmsg.dialog.Hide();
        });
        
        $('#clear_reply_button').click(function(e){
            $('#message_-1_message').val('');
            $('#message_-1_title').val('');
            $('#anon_msg_check').attr('checked',false);
        });


        $('#send_reply_button').click(function(e){
            postoffice.cmsg.ImportFromUI();
            postoffice.cmsg.Create(function(){
                postoffice.cmsg.dialog.Hide();
                $.prompt('Your message has been sent');
                
            });
        });
    }
}

Message.prototype=new Generic;
Message.prototype.dialog=new Dialog('message_dialog');


function Reply(a){
      this.parent=Message;
    this.parent(a);
    this.type='reply';
}
Reply.prototype=new Message;

function Dialog(type){
    
    this.clase=type;
    this.Show=function(){
        $('#overall').css('display','block');
        var dialog=$('#dialog')[0];
        dialog.className='dialog '+this.clase;

        $(dialog).css('display','block');
        
    }
    
    this.Hide=function(){
       var overall=$('#overall')[0]; 
       $(overall).css('display','none'); 
       var dialog=$('#dialog')[0]; 
       $(dialog).css('display','none');
    }
    
    this.SetContent=function(str){
        var container=$('#dialog_content')[0];
        container.innerHTML=str;
    }
    
}