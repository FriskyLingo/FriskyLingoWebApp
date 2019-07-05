function vincode_form_submit(form, error_block, loader_block, vincode_res_container, result_block, button, user_lang){
				
	myform=document.getElementById(form);
	
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			document.getElementById(button).disabled=false;
			document.getElementById(loader_block).style.display='none';
			if(req.responseJS.error_text!=""){
				document.getElementById(error_block).style.display='block';
				document.getElementById(error_block).innerHTML='<br />'+req.responseJS.error_text+'<br />';
			} else {
				document.getElementById(error_block).style.display='none';
				document.getElementById(vincode_res_container).style.display='block';
				document.getElementById('vincode_attempts_num').innerHTML=req.responseJS.vincode_attempts_num;
				document.getElementById(result_block).innerHTML=req.responseText;
				myform.elements['mvalue'].value="";
				reloadCaptcha();
			};
        }
    }
	document.getElementById(button).disabled=true;
	document.getElementById(loader_block).style.display='block';
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/vincode/get_info.php', true);
    // Send whole form data to backend.
    req.send( { 'vc_lang':user_lang, 'mvalue':myform.elements['mvalue'].value, 'vincode':myform.elements['vincode'].value} ); 
}
