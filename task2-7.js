function addHandler(element,type,handler){   //绑定事件,兼容浏览器差异
    if(element.addEventListener){      // IE9以下不兼容(dom2)
        element.addEventListener(type,handler,false)
    }else if(element.attachEvent){     //IE独有
        element.attachEvent('on' + type ,handler)
    }else{
        element['on'+type] = handler;    //一个元素只能绑定一个处理程序(dom0)
    }
}
var sort=document.getElementById("sort");
var btn=document.getElementsByClassName("btn");
var array=[];
// var dom={
    function creatediv(el,value){
        el=document.createElement("div");
        el.style.height=value*4+"px";//这里value*4主要是为了ui视觉上的好看
        return el;
    }
    function leftin(value){
       var div=creatediv(div,value);
       if(array.length<=60){//进行判断，不能超过60个
       array.unshift(value);//数组用来进行条件判断
       sort.insertBefore(div,sort.firstChild);//这里是展示实际UI变化
       }
    else{
       alert("太多了，不能再加了");
       }  
    }
    function rightin(value){
        var div=creatediv(div,value);
        if(array.length<=60){
        array.push(value);
        sort.appendChild(div);
        }
    else{
        alert("太多了，不能再加了");
        }
    }
    function leftout(){
        if(sort.firstChild!=null){//先判断是否有能删除的值
            array.shift();
            sort.removeChild(sort.firstChild);
        }
        else{
            alert("已经没有数据可以删除了哦")
        }
    }
    function rightout(){
        if(sort.lastChild!=null){
            array.pop();
            sort.removeChild(sort.lastChild);
        }
        else{
            alert("已经没有数据可以删除了哦")
        }
    }
    function randdiv(){//随机
        sort.innerHTML=null;
        array.length=0;//随机之前先清空之前的值
        for(var i=0;i<=60;i++){
            leftin(parseInt(Math.random()*91+10));//这里利用了前面的leftin或者rightin进行插入
        }
    }
    function BubbleSort(el) {//冒泡排序，这里模仿了for循环
		var len = array.length,
			div = el,
			i = 0,
			j = 0,
			temp,
			clear = null;
		clear = setInterval(run,15);//每隔15毫秒执行一次run函数

		function run() {
			if(i < len ){
				if(j < len - i -1) {
					if(array[j] > array[j+1]) {
						temp = array[j];//这三行表示数据的交换
						array[j] = array[j+1];
						array[j+1] = temp;
                        div[j].style.height = array[j] * 4 + 'px';//这里体现实际的ui表现
						div[j+1].style.height = array[j+1] * 4 + 'px';
					}
					j++;
					return; 
				} else {
					j = 0;
				}
				i++;
			} else {
				clearInterval(clear);//结束循环
			}

		}
	} 
// }
btn[0].onclick=function(){
    var value=parseInt(document.getElementById("screen").value);//在这里用了parseint来消除小数，不然下面的判断可能会出错
    if(/^[1-9][0-9]$|100/.test(value)){
        leftin(value);//这里的value对应着screen输入框输入的值，然后把这个值传入function leftin函数的value参数
    }
    else{
        alert("请输入10-100的数字");
    }
}
btn[1].onclick=function(){
    var value=parseInt(document.getElementById("screen").value);
    if(/^[1-9][0-9]$|100/.test(value)){
        rightin(value);
    }
    else{
        alert("请输入10-100的数字");
    }
}
btn[2].onclick=leftout;
btn[3].onclick=rightout;
btn[4].onclick=randdiv;
btn[5].onclick = function() {
    var div = document.getElementById('sort').getElementsByTagName('div');
    BubbleSort(div);
}
sort.onmouseover=function () {//这一段是为了删除点击的块
    var div = sort.getElementsByTagName('div');
    for (var i=0;i<div.length;i++) {
        div[i].del = i;
        div[i].onclick = function () {
            sort.removeChild(sort.childNodes[this.del]);//不明白这里的this是怎么确定值的(已知，this指向按钮)
        }
    }
}