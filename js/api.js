function Api(){	
        
        this.Create=function(srcObj,func,scpObj,param1)
	{
              if(!processDialog.opened)
                       processDialog.show();        
		var obj=srcObj.GetProps();
		obj.id=-1
		delete obj.updated_at;
		var api=obj.type+'s.php';
		delete obj.type;
		delete obj.idx;
                
                $.post(
                    api, 
                    {i:JSON.stringify(obj)},
                    function(data) {
                        if(processDialog.opened)
                            processDialog.hide();
				if(data.id)
				{
                                        for(var i in data)
					srcObj[i]=data[i];
					var scope=scpObj||srcObj;
					if(func)
						func.call(scope,srcObj,param1);
				}
				else
				{
					var item=srcObj.type.replace('_', ' ');
					item=item[0].toUpperCase()+item.substr(1);
                                        var msg=data.msg||'The '+item+' could not be created. Please verify other with same name or id doesn\'t already exists';
					$.prompt(msg);
                                }
				return;
                    },"json").error(
                        function(error){
                             if(processDialog.opened)
                                processDialog.hide();
				$.prompt('Server Side Error');
 			}
            
                    );
                        
                        //HideMessage();
                
	}

	this.Erase=function(srcObj,func,scpObj)
	{
                if(!processDialog.opened)
                       processDialog.show();              
		var obj=srcObj.GetProps();
		var api=obj.type+'s.php';
		delete obj.type;
		delete obj.idx;
                
                 $.post(
                    api, 
                    {i:JSON.stringify(obj)},
                    function(data) {
                           if(processDialog.opened)
                                processDialog.hide();
				if(data.success)
				{
					srcObj.id=data.id;
					var scope=scpObj||srcObj;
					if(func)
						func.call(scope,srcObj);
				}
				else
				{
					var item=srcObj.type.replace('_', ' ');
					item=item[0].toUpperCase()+item.substr(1);
					var msg='The '+item+' with id='+srcObj.id+' could not be deleted.';
					$.prompt(msg);
				}
				return;
                    },"json").error(
                        function(error){
                             if(main.processDialog.opened)
                                main.processDialog.hide();
				$.prompt('Server Side Error');
 			}
            
                    );
	}

	this.Load=function(array,obj,func,constraints,param1)
	{
               if(!processDialog.opened)
                      processDialog.show();
               if(!constraints)
                    constraints={};
		var api=array+'.php';
                var value=JSON.stringify(constraints);
                $.getJSON(api,{i:value},function(data){
                           if(processDialog.opened)
                              processDialog.hide();
				if(data[array])
				{
                                    
					var Class=array.charAt(0).toUpperCase()+array.substr(1,array.length-2);
					obj[array]=[];
					for(var i=0;i<data[array].length;i++)
					{
						data[array][i].idx=i;
                                                try{
                                                    data[array][i]=eval('new '+Class+'('+JSON.stringify(data[array][i])+');')
                                                }
                                                catch(e){}
                                                
						obj[array].push(data[array][i]);
					}
                                    

					if(func)
						func.call(obj,data);
				}
				else
				{
					var item=array.replace('_', ' ');
					item=item[0].toUpperCase()+item.substr(1);
					var msg='There was an error loading the list of '+array;
					$.prompt(msg);
				}
				return;
      			}).error(function(error){
                             if(main.processDialog.opened)
                                main.processDialog.hide();
				$.prompt('Server Side Error');
 			});
	}


	this.Specific=function(obj,func,selector,param1)
	{
               if(!processDialog.opened)
                    processDialog.show();

		var api=obj.type+'s.php';
                
                var value='{"'+selector+'":"'+obj[selector]+'"}';
                $.getJSON(api,{i:value},function(data){
                            if(processDialog.opened)
                                processDialog.hide();
				if(data[obj.type])
				{
                                        obj=$.extend(obj,data[obj.type]);
					/*var Class=obj.type.charAt(0).toUpperCase()+obj.type.substr(1,array.length-2);
                                        obj=eval('new '+Class+'('+JSON.stringify(data[array][i])+');');*/
					if(func)
						func.call(obj);
				}
				else
				{
					var item=array.replace('_', ' ');
					item=item[0].toUpperCase()+item.substr(1);
					var msg='There was an error loading the '+obj.type;
					$.prompt(msg);
				}
				return;
      			}).error(function(error){
                             if(main.processDialog.opened)
                                main.processDialog.hide();
				$.prompt('Server Side Error');
 			});
	}





	this.Update=function(param,value,func,scpObj,srcObj,extras)
	{
             if(!processDialog.opened)
                    processDialog.show();
            extras=extras?extras:'';
		var obj={param:param,value:value,id:srcObj.id,extras:extras}
		if(srcObj.table)
			obj.table=srcObj.table;
		var api=srcObj.type+'s.php';
                
                 $.post(
                    api, 
                    {i:JSON.stringify(obj)},
                    function(data) {
                       if(srcObj.updateCounts)
                                srcObj.updateCounts --;
                                
                             if(!srcObj.updateCounts)
                                processDialog.hide();
				if(data.success)
				{
                                    if(data.param && !$.isArray(data.param)){
                                        var param=data.param||param;
                                        var value=data.value||value;
                                        srcObj[param]=value;    
                                    }
                                    else if(data.param && $.isArray(data.param)){
                                        for(var i=0;i<data.param.length;i++){
                                            srcObj[data.param[i]]=data.value[i];
                                        }
                                    }
					if(srcObj.updated_at)
						srcObj.updated_at=data.updated_at;
					var scope=scpObj||srcObj;
					if(func)
                                            func.call(scope,srcObj,data.msg);
				}
				else
				{
                                  
                                     
					var item=srcObj.type.replace('_', ' ');
					item=item[0].toUpperCase()+item.substr(1);
					var msg=data.msg||'The property "'+data.param+'" could not be setted to "'+data.value+'" for the '+item+' with id='+srcObj.id;
					$.prompt(msg);
				}
				return;
                    },"json").error(
                        function(error){
                            if(srcObj.updateCounts)
                                    srcObj.updateCounts --;
                                
                                    if(!srcObj.updateCounts && main.processDialog.opened)
                                         main.processDialog.hide();
				$.prompt('Server Side Error');
 			}
            
                    );
                
                
                
		
	}
}