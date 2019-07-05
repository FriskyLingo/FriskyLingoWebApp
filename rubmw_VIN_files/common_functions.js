function intercom_form_submit(item_id, id, sender_id, receiver_id, user_lang){
	myform=document.getElementById(item_id);
	
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.error_text!=""){
				document.getElementById(item_id+"_status").innerHTML='<br/>'+req.responseJS.error_text+'<br/>';
			} else {
				try {
					if(req.responseJS.add_to_list!=''){
						if(req.responseJS.items_num==1){
							// Это первый комментарий - убираем фразу "нет комментариев"
							document.getElementById(item_id+"_list").innerHTML='';
						};
						document.getElementById(item_id+"_list").innerHTML=document.getElementById(item_id+"_list").innerHTML+req.responseJS.add_to_list;
						var target = document.getElementById("bottom");
						target.parentNode.scrollTop = target.offsetTop;
					};
				} catch(e) {
					window.location.reload();
				}
			
				document.getElementById(item_id+"_status").innerHTML=req.responseJS.result_message;
				try{
					CKEDITOR.instances[id+'_text'].setData('');
					myform.elements['text'].value="";
				} catch(e) { 
					// обработчика пока нет 
				}
			}
        }
    }
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/intercom/add.php', true);
    // Send whole form data to backend.
	
    req.send( { 'lang':user_lang, 'sender_id': sender_id, 'receiver_id': receiver_id, 'form': myform} ); 
}

function intercom_del(item_id, loading_msg){
	if (!confirm(loading_msg)) return false;
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			removeElementById("intercom_"+item_id);
        }
    }
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/intercom/del.php', true);
    // Send whole form data to backend.
    req.send( { 'id': item_id } ); 
}

function removeElementById(nodeId) {  
	document.getElementById(nodeId).parentNode.removeChild(document.getElementById(nodeId));
}  
