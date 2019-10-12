

var myImage = document.querySelector('img');

myImage.onclick = function(){
	var mySrc = myImage.getAttribute('src');
	if(mySrc === '../images/FireFox Logo.png'){
		myImage.setAttribute('src','../images/FireFox Logo2.png')
	}
	else{
		myImage.setAttribute('src','../images/FireFox Logo.png')
	}
}


var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName(){
	var myName = prompt('请输入你的名字。');
	localStorage.setItem('名字',myName);
	myHeading.textContent = 'Mozilla很酷，'+ myName;
}

if(!localStorage.getItem('名字')){
	setUserName();
}
else {
	var storedName = localStorage.getItem('名字');
	myHeading.textContent = 'Mozilla很酷，'+ storedName;
}

myButton.onclick = function(){
	setUserName();
}