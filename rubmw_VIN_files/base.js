function MM_openBrWindow(theURL,winName,features) { 
  window.open(theURL,winName,features);
}

var timeToKeep = 1000*60*60*24*365;
var expires = new Date();
expires.setTime(expires.getTime() + timeToKeep); 

function setCookie(name, value, expires, path, domain, secure) {
  
  if(!path){ path='/'; };
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function deleteCookie(name, path, domain) {

  if(!path){ path='/'; };
  
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function FilterChange(group, section){
	
	if (group != '') {
		setCookie('filter_group', group);
	} else {
		deleteCookie('filter_group');
	};

	if (section != '') {
		setCookie('filter_section', section);
	} else {
		deleteCookie('filter_section');
	};

};

function update_car_order(sort_filed, sort_type){
	
	setCookie('car_sort_field', sort_filed);
	setCookie('car_sort_type', sort_type);

};

function update_advert_order(sort_filed, sort_type){
	
	setCookie('advert_sort_field', sort_filed);
	setCookie('advert_sort_type', sort_type);

};

function MakeAddDays(days_num, show_hours){
	// Возвращает дату, полученну путем прибавления к текущей дате указанное число дней
			
	// Получаем хэш даты 
	var DateHash=new Date();
	DateHash=DateHash/1000;
	DateHash+=days_num*24*60*60;
	DateValue=new Date(DateHash*1000);
	var Day=DateValue.getDate(); if(Day<10) {Day='0'+Day;};
	var Month=1+DateValue.getMonth(); if(Month<10) {Month='0'+Month;};
	var Year=DateValue.getYear(); 
	if (Year<1900) {Year+=1900;};
	var ReturnValue=Day+'.'+Month+'.'+Year
	if(show_hours==1){
		var Hours=DateValue.getHours(); if(Hours<10) {Hours='0'+Hours;};
		var Minutes=DateValue.getMinutes(); if(Minutes<10) {Minutes='0'+Minutes;};
		ReturnValue=ReturnValue+' '+Hours+':'+Minutes;
	};

return ReturnValue;
};

function friend_request(friend_id, lang, loading_msg){
	if (!confirm(loading_msg)) return false;
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.result_message!=""){
				alert(req.responseJS.result_message);
				if(req.responseJS.reload_page){
					location.reload(true);
				};
			};
        }
    }
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/users/friend_request.php', true);
    // Send whole form data to backend.
    req.send( { 'friend_id': friend_id, 'lang': lang } ); 
}

function unfriend_request(friend_id, lang, loading_msg){
	if (!confirm(loading_msg)) return false;
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.result_message!=""){
				alert(req.responseJS.result_message);
				if(req.responseJS.reload_page){
					location.reload(true);
				};
			};
        }
    }
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/users/unfriend_request.php', true);
    // Send whole form data to backend.
    req.send( { 'friend_id': friend_id, 'lang': lang } ); 
}

function user_rate(dir,id, loading_msg){
	obj_rate=document.getElementById("user_"+id+"_rating");
	var old_data=obj_rate.innerHTML
	obj_rate.innerHTML=loading_msg;
	
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.error==''){
				obj_rate.innerHTML=req.responseJS.resulthtml;
				if(document.getElementById("user-"+id+"-rates").style.display != 'none'){
					user_update_rates_details(id, loading_msg);
				};
			} else {
				obj_rate.innerHTML=old_data;
				alert(req.responseJS.error);
			};
        }
    }

    req.open(null, '/lib/users/rate.php', true);
    req.send( { 'user_id': id, 'dir': dir, 'lang': lang} ); 
}

function user_rates_details(id, loading_msg){
	obj_rate=document.getElementById("user-"+id+"-rates");
	
	if(obj_rate.style.display == 'none'){
		obj_rate.style.display='block';
		user_update_rates_details(id, loading_msg);
	} else {
		obj_rate.style.display='none';
	};
	
}

function user_update_rates_details(id, loading_msg){
	obj_rate=document.getElementById("user-"+id+"-rates");
	var old_data=obj_rate.innerHTML
	obj_rate.innerHTML=loading_msg;
	
	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.error==''){
				obj_rate.innerHTML=req.responseJS.resulthtml;
			} else {
				obj_rate.innerHTML=old_data;
				alert(req.responseJS.error);
			};
        }
    }

    req.open(null, '/lib/users/rate_log.php', true);
    req.send( { 'item_id': id, 'lang': lang} ); 

}

function set_bb_code(editor, code){
	CKEDITOR.instances[editor].insertHtml('[' + code + ']' + CKEDITOR.instances[editor].getSelection().getNative() + '[/' + code + ']');
}


$(function(){

	$('#intercom_new_messages').fancybox({
		'autoScale'     	: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'href'              : '/lib/intercom/constructor.php',
		'width'             : 950,
		'height'            : 715,
		'centerOnScroll'    : true,
		'type'				: 'iframe',
		'hideOnOverlayClick': false,
		onClosed	        : function() {
			update_intercom_unread_messages();
		}		
	});

    $(".intercom_send_message").click(function(){
        var user_id = $(this).attr('id').replace('intercom_user_', '');
		$('#intercom_user_'+user_id+'_link').fancybox({
			'autoScale'     	: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'href'              : '/lib/intercom/constructor.php?user='+user_id,
			'width'             : 950,
			'height'            : 715,
			'centerOnScroll'    : true,
			'type'				: 'iframe',
			'hideOnOverlayClick': false,
			onClosed	        : function() {
				update_intercom_unread_messages();
			}		
		});
		$('#intercom_user_'+user_id+'_link').click();
    }); 

})    

function update_intercom_unread_messages(){

	var req = new JsHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
			if(req.responseJS.num!=0){
				document.getElementById("intercom_new_messages_block").setAttribute('title', req.responseJS.hint);
				document.getElementById("intercom_new_messages_block").style.display='inline-block';
			} else {
				document.getElementById("intercom_new_messages_block").setAttribute('title', '');
				document.getElementById("intercom_new_messages_block").style.display='none';
			};
        }
    }
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/intercom/count.php', true);
    // Send whole form data to backend.
    req.send(); 

}
