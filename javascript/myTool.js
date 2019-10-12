/*
	封装ajax

	参数形式：
	type：string，请求数据的方式（get/post）
	url：string
	data：string，key1=value1&key2=value2。传送的数据
	success:function,请求数据成功时的回调函数
*/

function ajax(type,url,data,success){
	//创建ajax对象
	var xhr = new XMLHttpRequest();

	//设置请求行
	//如果是get并且有数据
	if(type=='get'&&data){
		url += '?';
		url += data;
		data = null;//这样最后直接send(data)即可
	}

	xhr.open(type,url);

	//设置请求头
	//如果是post并且有数据
	if(type=='post'&&data){
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	}
	
	//设置回调函数
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			success(xhr.responseText);
		}
	}
	//发送请求
	xhr.send(data);

}