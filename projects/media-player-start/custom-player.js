var media = document.querySelector('video');
var controls = document.querySelector('.controls');

var play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var rwd = document.querySelector('.rwd');
var fwd = document.querySelector('.fwd');

var timerWrapper = document.querySelector('.timer');
var timer = document.querySelector('.timer span');
var timeBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = 'visible';

play.addEventListener('click',playPauseMedia);

function playPauseMedia() {
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);

	if(media.paused) {
		play.setAttribute('data-icon','u');
		media.play();
	} else {
		play.setAttribute('data-icon','p');
		media.pause();
	}
}

stop.addEventListener('click',stopMedia);
media.addEventListener('ended',stopMedia);

function stopMedia() {
	rwd.classList.remove('active');
	fwd.classList.remove('active');
	clearInterval(intervalRwd);
	clearInterval(intervalFwd);

	media.pause();
	media.currentTime = 0;
	play.setAttribute('data-icon','p');
}


rwd.addEventListener('click',mediaBackward);
fwd.addEventListener('click',mediaForward);

var intervalFwd;
var intervalRwd;

function mediaBackward() {
	clearInterval(intervalFwd);
	fwd.classList.remove('active');

	if(rwd.classList.contains('active')) {
		rwd.classList.remove('active');
		clearInterval(intervalRwd);
		media.play();
	} else {
		rwd.classList.add('active');
		media.pause();
		intervalRwd = setInterval(windBackward, 200);
	}
}

function mediaForward() {
	clearInterval(intervalRwd);
	rwd.classList.remove('active');

	if(fwd.classList.contains('active')) {
		fwd.classList.remove('active');
		clearInterval(intervalFwd);
		media.play();
	} else {
		fwd.classList.add('active');
		media.pause();
		intervalFwd = setInterval(windForward, 200);
	}
}



function windBackward() {
	if(media.currentTime <= 3) {
		//rwd.classList.remove('active');
		//clearInterval(intervalRwd);
		stopMedia();
	} else {
		media.currentTime -= 3;
	}
}

function windForward() {
	if(media.currentTime >= media.duration - 3) {
		//fwd.classList.remove('active');
		//clearInterval(intervalFwd);
		stopMedia();
	} else {
		media.currentTime += 3;
	}
}




media.addEventListener('timeupdate',setTime);

function setTime() {
	var hours = Math.floor(media.currentTime / 3600);
	var minutes = Math.floor(media.currentTime / 60);
	var seconds = Math.floor(media.currentTime - minutes * 60);

	var hourValue;
	var minuteValue;
	var secondValue;

	if(hours < 10) {
		hourValue = '0' + hours;
	} else {
		hourValue = hours;
	}

	if(minutes < 10) {
		minuteValue = '0' + minutes;
	} else {
		minuteValue = minutes;
	}

	if(seconds < 10) {
		secondValue = '0' + seconds;
	} else {
		secondValue = seconds;
	}

	var mediaTime = hourValue + ':' + minuteValue + ':' + secondValue;
	timer.textContent = mediaTime;

	var barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
	timeBar.style.width = barLength + 'px';
}

//--------------------------------------

var prgsBar = timerWrapper.getBoundingClientRect();


document.onclick = function(e) {
	
	var leftBorder = prgsBar.left + 210;
	var rightBorder = prgsBar.right + 210;
	var topBorder = prgsBar.top + 158;
	var bottomBorder = prgsBar.bottom + 158;
	

	var area = (leftBorder <= e.x) && (e.x <= rightBorder) && (topBorder <= e.y) && (e.y <= bottomBorder);
	if(area) {
		media.currentTime = (e.x - leftBorder) / prgsBar.width * media.duration;
	} 

	//console.log(e);
	//console.log(area);
	//console.log(e.x) + ',' + console.log(e.y)
}



//console.log(prgsBar);








