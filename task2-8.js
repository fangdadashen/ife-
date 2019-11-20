var screen=document.getElementById("screen");
var btn=document.getElementsByClassName("btn");
var ul=document.getElementsByTagName("ul")[0];//这里为什么要加[0]不了解(i konw)
var chaxun=document.getElementById("chaxun");
var array=[];
function getvalue(str){
    return str.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");//这里是把输入的值在删去数字·字母和中文之外的东西后所保留的数组（这里因为用了两次所以单独拿出来了，不拿出来也行）
}
function create(lf){
    if(screen.value){//判断是不是输入了值
        //    var scrvalue=screen.value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5a]+/g," ").split(" ");
            var scrvalue=getvalue(screen.value);//得到筛选之后值
            for(var i=scrvalue.length-1;i>=0;i--){//对筛选之后的数组进行遍历
           //for(var i=0;i<=scrvalue.length,i++){
               array.unshift(scrvalue[i]);//每一个值添加到数组中去
               var newnode=document.createElement("li");
               newnode.innerHTML=scrvalue[i];//这里是重点，把每一个值都单个的输入，这样就会把数组中每一个值都各自占一个位置，而不会把数组中所有值都放在一个块中
               if(lf==1){
               ul.insertBefore(newnode,ul.firstChild);
            }else{
                ul.appendChild(newnode);
            }
           }
       }else{
           alert("输入不能为空");
       }
}
btn[0].onclick=function(){
    create(1);
}
btn[1].onclick=function(){
    create(2);
}
btn[2].onclick=function(){
    if(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
    else{
        alert("队列为空");
    }
}
btn[3].onclick=function(){
    if(ul.hasChildNodes()){
        ul.removeChild(ul.lastChild);
    }
    else{
        alert("队列为空");
    }
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
btn[4].onclick=function(){//实现查询功能
    var value=chaxun.value;
    ul.innerHTML=array.map(function(item){//这里不明白为什么是ul
        if(value){
            item=item.replace(new RegExp(value,"g"),"<span class='sel'>"+value+"</span>");//这里用了regexp()把所有的输入的值进行查找然后替换
        }
        return  "<li>"+item+"</li>";//把替换好的值放入原来的数组中
    }).join(" ");//这里如果不加join(" ")的话，数组之间会是逗号，这里用空格代替了逗号
}
btn[5].onclick=function(){//重置功能，就是把ui的块全部删除就行
    array=[];
    ul.innerHTML="";
}

