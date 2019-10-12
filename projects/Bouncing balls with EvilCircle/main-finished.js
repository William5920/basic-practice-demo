// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var p = document.querySelector('p');//用于存放Balls count

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


//define Shape constructor

function Shape(x,y,velX,velY,exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

//-----------------------------------------EvilCircle------------------------------------

// define EvilCircle constructor
function EvilCircle(x,y,exists){
  Shape.call(this,x,y,exists);
  this.color = 'white';
  this.size = 30;
  this.velX = 20;
  this.velY = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// define EvilCircle draw method

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

// define EvilCircle checkBounds method

EvilCircle.prototype.checkBounds = function(){
  if(this.x + this.size >= width){
    this.x -= this,size;
  }
  if(this.x - this.size <= 0){
    this.x += this.size;
  }
  if(this.y + this.size >= height){
    this.y -= this.size;
  }
  if(this.y - this.size <= 0){
    this.y += this.size;
  }
}

// define EvilCircle setControls method

EvilCircle.prototype.setControls = function(){
  var _this = this;
  window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  };
};

// define EvilCircle collisionDetect method

EvilCircle.prototype.collisionDetect = function(){
  for(var i=0;i<balls.length;i++){
    if(balls[i].exists === 'true'){
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt( dx * dx + dy * dy);

      if(distance < this.size + balls[i].size){
        balls[i].exists = 'false';
        //balls[i].color = 'black';
        updateCount();
        
      }
    }
  }
}



//----------------------------------------Ball-----------------------------
// define Ball constructor

function Ball(x, y, velX, velY, exists,color, size) {
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;


// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

//---------------------------------------loop-----------------------------

// define array to store balls

var balls = [];
var count = 25;
var evilCircle1 = new EvilCircle(800,500,'true');
evilCircle1.setControls();





// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 25) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      'true',
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    balls.push(ball);
  }

  
  p.textContent = 'Balls count:' + count;
  

  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists === 'true')//此处可以实现碰撞之后小球消失，因为下一次loop时该小球不会被画出来
      {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();//检测小球之减是否相撞
      }
  }

  evilCircle1.draw();
  evilCircle1.checkBounds();
  evilCircle1.collisionDetect();//检测小球与恶魔圈之间是否相撞



  requestAnimationFrame(loop);
}



//-------------------


loop();


//-------------------------------------



function updateCount(){

  count = 0;

  for(var i=0;i<balls.length;i++){
    if(balls[i].exists === 'true'){
      count++;
    }
  }

  return count;

}



