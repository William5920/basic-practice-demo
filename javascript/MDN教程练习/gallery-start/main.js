var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for(var i=1;i<=5;i++){


  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic' + i + '.jpg');
  thumbBar.appendChild(newImage);
  
  newImage.onclick = function(e) {
	displayedImage.setAttribute('src',e.target.getAttribute('src'));
}

  /*
  newImage.onclick = function() {
	displayedImage.setAttribute('src','images/pic' + i + '.jpg');//这种方法不可行，因为在事件处理函数应用之前整个循环就已经跑完了；这样做的话每次迭代 src 的值都会是最后一张图片。
}*/

}




/* Wiring up the Darken/Lighten button */

btn.onclick = function(){
	if(btn.getAttribute('class') === 'dark'){
		btn.setAttribute('class','Light');
		btn.textContent = 'Lighten';
		overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
	} else {
		btn.setAttribute('class','dark');
		btn.textContent = 'Darken';
		overlay.style.backgroundColor = 'rgba(0,0,0,0)';
	}
}

