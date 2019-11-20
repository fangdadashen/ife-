var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var star=new Image();
var spaceship1=new Image();
var spaceship2=new Image();
var spaceship3=new Image();
var spaceship4=new Image();
star.src="C:/Users/Administrator/Desktop/前端代码练习/images/星球.png";
spaceship1.src="C:/Users/Administrator/Desktop/前端代码练习/images/萌版-外星人飞船.png";
star.onload=function(){
    function draw(){
        bstar();
        ship1();
        ship2();
        ship3();
        ship4();
        requestAnimationFrame(draw);
        }
        draw();
}

function bstar(){
    ctx.clearRect(0,0,650,650);
    //背景
    ctx.fillRect(0,0,650,650);
    //星球
    ctx.drawImage(star,r-50,r-50,100,100);
    ctx.save();
}
function ship1(){
    //轨道1
    ctx.translate(width/2,width/2);
    ctx.beginPath();
    ctx.strokeStyle="rgba(255,255,0,0.5)";
    ctx.arc(0,0,100,0,2*Math.PI);
    ctx.stroke();
    ctx.save();
    //飞船一号
    var time=new Date();
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds());
    ctx.translate(100,0);
    ctx.drawImage(spaceship1,-20,-20,40,40);
}
function ship2(){
    //轨道2
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle="rgba(255,255,0,0.5)";
    ctx.arc(0,0,150,0,2*Math.PI);
    ctx.stroke();
    ctx.save();
    //飞船2号
    var time=new Date();
    ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds());
    ctx.translate(150,0);
    ctx.drawImage(spaceship1,-20,-20,40,40);
}
function ship3(){
    //轨道3
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle="rgba(255,255,0,0.5)";
    ctx.arc(0,0,200,0,2*Math.PI);
    ctx.stroke();
    ctx.save();
    //飞船3号
    var time=new Date();
    ctx.rotate(2*Math.PI/60*time.getSeconds()+ 2 * Math.PI / 60000 * time.getMilliseconds());
    ctx.translate(200,0);
    ctx.drawImage(spaceship1,-20,-20,40,40);
}
function ship4(){
    //轨道4
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle="rgba(255,255,0,0.5)";
    ctx.arc(0,0,250,0,2*Math.PI);
    ctx.stroke();
    // ctx.save();
    //飞船4号
    var time=new Date();
    ctx.rotate(2*Math.PI/60*time.getSeconds()+ 2 * Math.PI / 60000 * time.getMilliseconds());
    ctx.translate(250,0);
    ctx.drawImage(spaceship1,-20,-20,40,40);
    ctx.restore();
}


