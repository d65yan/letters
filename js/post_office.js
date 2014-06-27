

function PostOffice(){
    this.animating=0;
    this.loading=0;
    this.page_number=0;
    this.max_pages=0;
    this.api=new Api();
    

    
    this.DrawMessages=function(data){
        this.loading=0;
        if(data){
            this.max_pages=data.pages;
            this.page_number=data.page;
        }
            
        if(this.animating==1)
            return;
        var inside='<table border="0" cellpadding="0" cellspacing="0"><tr>';
        var letterTpl='<td><div class="note" idx="_IDX_" style="background-image:url(\'_STYLE_THUMB_\')"><div class="replies_number">_REPLIES_NUMBER_</div>_TITLE_</div></td>';
        for(var i=0;i<this.messages.length;i++){
            if(i%5==0 && i>=5 )
            inside+='</tr><tr>';
            inside+=this.messages[i].toStr(letterTpl);
            
            
        }
        inside+='</tr></table>';
        //document.getElementById('notes_content').innerHTML=inside;
        var div=$('#notes_content')[0];
        div.innerHTML=inside;
        $('.note').click(function(e){
            
            var idx=1*$(this).attr('idx');
            
            var sel=postoffice.messages[idx];
            postoffice.cmsg=new Message({id:sel.id,type:sel.type});
            postoffice.cmsg.GetDetails();
            
        });
        if(this.page_number==this.max_pages)
            $('#move_right').css('display','none');
        else
            $('#move_right').css('display','block');
        
        if(this.page_number==0)
            $('#move_left').css('display','none');
        else
            $('#move_left').css('display','block');
    }
    
    this.GetMessages=function(quantity,increment){
       
       var constraints={page_number:(this.page_number+increment),page_size:quantity,location:loc.id};
       this.loading=1;
        this.api.Load("messages",this,this.DrawMessages,constraints);
    }

    this.ClearWall=function(){
            $('#move_right').css('display','none');
            $('#move_left').css('display','none');
        var div=$('#notes_content')[0];
        div.innerHTML='';
    }
    
    this.GetCities=function(id){
        this.api.Load('locations',this,this.DrawCities,{state_id:id})
    }
    
      this.GetStates=function(id){
        this.api.Load('locations',this,this.DrawStates,{country_id:id})
    } 
    this.DrawCities=function(){
        $('#city_select').empty();
        for(var i=0;i<this.locations.length;i++){
            $('#city_select').append('<option value="'+this.locations[i].id+'">'+this.locations[i].name+'</option>');
        }
        
    }
    
        this.DrawStates=function(){
        $('#state_select').empty();
        for(var i=0;i<this.locations.length;i++){
           $('#state_select').append('<option value="'+this.locations[i].id+'">'+this.locations[i].name+'</option>');
        }
        this.GetCities(this.locations[0].id);
    }
    
      
      this.PresentLocations=function(){
        	            var statesdemo = {
            state0: {
		title: 'Name',
		html:postoffice.locDialogHtml,
		buttons: { 'Set location': true,"Cancel":false },
		focus: 1,
		submit:function(e,v,m,f){ 
                    if(v){
                        loc.string=$('#city_select').find("option:selected").text();
                        loc.id=$('#city_select').find("option:selected").val()
                        $('#location_span').html(loc.string);
                         postoffice.GetMessages(user.page_size,0);
                         postoffice.locDialogHtml=$('.jqimessage').html();
                    }
		}
                
            }
        };

        $.prompt(statesdemo).bind('promptloaded', function(e){
                    $('#country_select').change(function(e){
                       $('#country_select option[selected=selected]').removeAttr('selected');
                       $('#country_select').find("option:selected").attr('selected','selected');
                        postoffice.GetStates(this.value);
                    });
                    
                    $('#state_select').change(function(e){
                       $('#state_select option[selected=selected]').removeAttr('selected');
                       $('#state_select').find("option:selected").attr('selected','selected');
                        postoffice.GetCities(this.value);
                    });
                    
                    $('#city_select').change(function(e){
                       $('#city_select option[selected=selected]').removeAttr('selected');
                       $('#city_select').find("option:selected").attr('selected','selected');
                        
                    });

                    
        });
        
        
        
	}
        
        this.CreateMessage=function(){
                   this.cmsg= new Message({
                                        title:'Your message title',
                                        message:'Your message text here',
                                        anonymous_msg:0,
                                        style_id:styles[0].id,
                                        id:-1
                                    });
                                    
                   this.cmsg.CreateNew();                 
        }
}

