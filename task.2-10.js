function addEventHandler(ele, event, hanlder) {//兼容不同浏览器
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var btn = document.getElementsByTagName('input'),
	preBtn = btn[0],
	inBtn = btn[1],
	postBtn = btn[2],
	treeRoot = document.getElementsByClassName('contain')[0],
	array = [],
    timer = null;//这个不能删，删了就不能运行了
window.onload=function(){//这里用window.onload原因不知，因为没有也可以运行，这里可能是为了更兼容
    addEventHandler(preBtn,"click",function(){
        clear();
        preOrder(treeRoot);
        changeColor();
    });
    addEventHandler(inBtn,"click",function(){
        clear();
        inOrder(treeRoot);
        changeColor();
    });
    addEventHandler(postBtn,"click",function(){
        clear();
        postOrder(treeRoot);
        changeColor();
    });
}
//初始化样式
function clear(){
    array=[];
    clearInterval(timer);//这里因为右三种运行方式，所以在运行新方式时要停止老方式，但是第一个的时候如果timer没有定义就无法运行，所以在前面一开始定义了timer
    var divs = document.getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){//遍历每一个div，即把所有div变成白色
        divs[i].style.backgroundColor="#fff";
    }
}
//前序遍历
function preOrder(node){//这里我也不懂为什么就这样写就可以把所有的要求遍历的div都加入进去(已知，递归算法)
    if(!(node==null)){//这里神奇在下面三个是连着的，而不是孤立存在的，前一个运行的方向回往后一个的方向走 
        array.push(node);//根，就是最外面的大div
        preOrder(node.firstElementChild);//左子树，二叉树的所有左边的子数
        preOrder(node.lastElementChild);//右子树，二叉树所有右边的子树
        // alert(array);
    }
}
//中序遍历
function inOrder(node){
    if(!(node==null)){
        inOrder(node.firstElementChild);//左子树
		array.push(node);//根
        inOrder(node.lastElementChild);//右子树
       
    }
}
//后序遍历
function postOrder(node){
    if(!(node==null)){
        postOrder(node.firstElementChild);//左子树
		postOrder(node.lastElementChild);//右子树
		array.push(node);//根
    }
}
//颜色变化
function changeColor(){
    var i=0;
    array[i].style.backgroundColor="blue";//这里是把最外面的大框渲染为蓝色，如果不写就变不了
    timer=setInterval(function(){
        i++;
        if(i<array.length){//遍历数组的每一项，前一个变成蓝色，后一个变为白色，看起来就像是只有蓝色在动一样
            array[i-1].style.backgroundColor="#fff";
            array[i].style.backgroundColor="blue";
        }
        else{
            clearInterval(timer);//遍历完成，介绍循环，把最后一个变成白色，此时所有的div都变成白色，
            array[array.length-1].style.backgroundColor="#fff";
        }
    },500)//每500微秒运行一次，相当于for（）
}