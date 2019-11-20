console.log($);
//画出背景表格
(function createtable(){
    var bg=document.getElementById("background");
    var bg_tr=[];
    for(var i=0;i<11;i++){
        bg_tr[i]=document.createElement("tr");//创建11行tr
        bg.appendChild(bg_tr[i]);
        var bg_td=[];
        for(var j=0;j<11;j++){
            bg_td[j]=document.createElement("td");//一行创建11个td
            if(i===0&&j>0){
                bg_td[j].innerHTML=j;//标注列数
            }
            else if(i>0&&j===0){
                bg_td[j].innerHTML=i;//标注行数
            }
            bg_tr[i].appendChild(bg_td[j]);
        }
    }
})();
var square=document.getElementById("square");
var Int=document.getElementById("int");
var Run=document.getElementById("run");
var Go=document.getElementById("go");
var Left=document.getElementById("left");
var Right=document.getElementById("right");
var Bac=document.getElementById("bac");
var pos = {
    X: 6,	// X坐标 1-10
    Y: 6,	// Y坐标 1-10
    face: 0	// 方向表示   0: 上, 1: 右, 2: 下, 3: 左;
}
// window.onclick=function(){
   
    Run.onclick=function(){
        var value=Int.value;//value的值必须在这里面才能及时更新
        move(value);
    }
    Go.onclick=function(){
        move("GO");
    }
    Left.onclick=function(){
        move("TUN LEF");
    }
    Right.onclick=function(){
        move("TUN RIG");
    }
    Bac.onclick=function(){
        move("TUN BAC");
    }
// }
//移动方式设置
function go(){
    var face=pos.face;
    face= face % 4 + (face % 4 < 0 ? 4 : 0);	// 对face值进行过滤,计算face的方向具体为0:0+0=0(上);1:1+0=1(右);2:2+0=2(下);3:3+0=3(左)
                                                //-1:-1+4=3(左);4:0+0=0(上);因为face的值都要经过这里，所以此处对face的值进行了处理,在其他地方就不用了处理了
    if(face === 0 && pos.Y > 1) {//左上为原点(0,0)，为各种在表格边缘的移动情况做限制
        pos.Y--;	// square上移
    }
    else if(face=== 1 && pos.X < 10) {
        pos.X++;	// square右移
    }
    else if(face === 2 && pos.Y < 10) {
        pos.Y++;	// square下移
    }
    else if(face === 3 && pos.X > 1) {
        pos.X--;	// square左移
    }
    else {
        return false;
    }
}
//方向改变(左)
function left(){
    pos.face--;
}
//方向改变(右)
function right(){
    pos.face++;
}
//设置具体变化，对pos对象中的值给出具体设定
function draw(){
    // square.style.top=pos.Y*50+"px";
    // square.style.left=pos.X*50+"px";
    // square.style.transform=square.style.webkitTransform = square.style.msTransform = "rotate("+(pos.face*90)+"deg)";//兼容性处理
    $('#square').css({'top':pos.Y*50+"px",
                     'left':pos.X*50+"px",
                     'transform:rotate':pos.face*90+'deg'//这。。。还能这么玩儿啊。。
                    });
}
// 主函数,因为要照顾输入框，所以把按钮和输入框一起处理封装在一个函数中实现
function move(value) {
    if(value == "GO") {
        go();
    }
    else if(value == "TUN LEF") {
        left();
    }
    else if(value == "TUN RIG") {
        right();
    }
    else if(value == "TUN BAC") {
        right();
        right();	// 执行两次向右转
    }
    else {
        alert("正确的指令提示：\nGO：前进一格\nTUN LEF：向左转\nTUN RIG：向右转\nTUN BAC：向后转");
    }
    draw();
}