var screen=document.getElementById("screen");
var btn=document.getElementsByClassName("btn");
var ul=document.getElementsByTagName("ul")[0];//这里为什么要加[0]不了解
//添加
function create(lr){
    if(!/^\d+$/g.test(screen.value)){//判断输入的是不是数字
        alert("请输入数字");
        return false;//这里啥用我也不清楚，因为没这个也能正常运行（已知，结束if循环）
    }
        var newnode=document.createElement("li");
        newnode.innerHTML=screen.value.trim();
        if(lr==1){
        ul.insertBefore(newnode,ul.firstChild);
    }else{
        ul.appendChild(newnode);
    }
        //screen.value=null;//这里表示每写完一次就清除一次
}
//删除
function remove(lr){
    if(ul.hasChildNodes()){
        if(lr==1){
        alert("删除:"+ul.firstChild.innerHTML);
        ul.removeChild(ul.firstChild);
       }else if(lr==2){
        alert("删除:"+ul.lastChild.innerHTML);
        ul.removeChild(ul.lastChild);
       }
    } else{
        alert("队列为空");
    }
}
btn[0].onclick=function(){
    create(1);
}
btn[1].onclick=function(){
    create(2);
}

btn[2].onclick=function(){
    remove(1);
}
btn[3].onclick=function(){
    remove(2);
}
ul.onclick=function () {//这一段是为了删除点击的块
    var li = ul.getElementsByTagName('li');
    for (var i=0;i<li.length;i++) {
        li[i].del = i;
        li[i].onclick = function () {
            ul.removeChild(ul.childNodes[this.del]);//不明白这里的this是怎么确定值的(已知，this指向按钮)
        }
    }
}

