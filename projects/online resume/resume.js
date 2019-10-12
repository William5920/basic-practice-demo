var my_resume = document.querySelector('#my-resume');

my_resume.onclick = function() {
	var name = prompt('Welcome to my resume! What is your name?');
	alert('Hello ' + name + ', nice to see you!');
}

var now = new Date();
var hour = now.getHours();
console.log(hour);
if(hour > 6 && hour <= 12) {
	alert('Good morning!');
} else if( hour > 12 && hour < 18) {
	alert('Good afternoon!');
} else {
	alert('Good evening!');
}