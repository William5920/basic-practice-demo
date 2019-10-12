//setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//function to generate random number

function random(min,max){
	var num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

//小球的构造器函数
function Ball(x,y,velX,velY,color,size){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}

//给Ball()的原型加上draw()方法
Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.size,0,2 * Math.PI);
	ctx.fill();
}

//更新小球的数据
Ball.prototype.update = function(){
	//检测小球是否撞击到右边缘
	if((this.x + this.size) >= width){
		this.velX = -(this.velX);
	}
	//检测小球是否撞击到左边缘
	if((this.x - this.size) <= 0){
		this.velX = -(this.velX);
	}
	//检测小球是否撞击到上边缘
	if((this.y + this.size) >= height){
		this.velY = -(this.velY);
	}
	//检测小球是否撞击到下边缘
	if((this.y - this.size) <= 0){
		this.velY = -(this.velY);
	}
	//否则，每次更新后小球的当前位置为上次的位置加上各个方向的速度
	this.x += this.velX;
	this.y += this.velY;
}

//增加撞击侦察
Ball.prototype.collisionDetect = function(){
	for(var j = 0;j < balls.length; j++){
		if(!(this === balls[j])){
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if(distance < this.size + balls[j].size){
				balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
			}
		}
	}
}

//建立存储小球的数组
var balls = [];

//添加运动循环
function loop(){
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);

	while(balls.length < 25){
		//随机建立一个小球
		var ball = new Ball(
			random(0,width),
			random(0,height),
			random(-7,7),
			random(-7,7),
			'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
			random(10,20)
			);
		balls.push(ball);
	}

	for(var i=0;i<balls.length;i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}

	requestAnimationFrame(loop);
}

//让动画开始运行
loop();















