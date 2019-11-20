function addEventHandler(ele, event, hanlder) {//事件兼容不同浏览器
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
var preOrder=document.getElementById("preorder");
var posttrl=document.getElementById("postorder");
var widtrl=document.getElementById("widetraversal");
var searchInt=document.getElementById("search-text");
var searchBtn=document.getElementById("search-btn");//莫名其妙的bug
var delBtn=document.getElementById("del-btn");
var newInt=document.getElementById("insert-int");
var newBtn=document.getElementById("insert-btn");
var timer=null;
var traverse=[];//存放遍历结果
var search=[];//存放搜索结果
// var widearr=[];

window.onload=function(){
    var root=document.getElementById("root");
    addEventHandler(preOrder,"click",function(){
        clear();//初始/清除
        deepTraversal(root);//深度优先遍历
        changeColor(traverse,2);//颜色变化
    })
    addEventHandler(widtrl,"click",function(){
        clear();
        wideTraversal(root);
        changeColor(traverse,2);
    })
    addEventHandler(posttrl,"click",function(){
        clear();
        postOrder(root);
        changeColor(traverse,2);
    })
    addEventHandler(searchBtn,"click",function(){
        var content=searchInt.value;//传入参数，判断输入值和div的值是否相等
        // alert(content=="");
        if(content==""){
            alert("请填写搜索内容哦");
        }
        else{
            clear();
            searchTree(root,content);
            if(tag==false){//查询成功，搜到了
                changeColor(search,1);
            }
                else{//未找到该查询结果
                    changeColor(search,3);
                }
            }
    })
    //点击div变颜色
    //就是选中要点击的大区域（div），然后遍历所有div，为点击到的div添加点击事件
    var selectDiv;//记录选中的div
    var div=document.getElementsByTagName("div");
    for(var i=0;i<div.length;i++){
        div[i].onclick=function(e){
            clear();
            this.style.backgroundColor="#fef9d1";
            e.stopPropagation();//阻止事件冒泡,不是很懂，但没有这个的话就只会停在最外层的div
            selectDiv=this;//记录了此次点击的div
        }
    }
    //删除点击的div
    //直接找到点击节点的父元素，然后用romenveChild()删除就行，就是selectDiv数据要共通
    addEventHandler(delBtn,"click",function(){
        if(selectDiv==undefined){
            alert("请选择要删除的点");
        }
        else{
            var parent=selectDiv.parentNode;
            parent.removeChild(selectDiv);
        }
    })
    //把输入内容变成点击节点下新的div
    addEventHandler(newBtn,"click",function(){
        var content=newInt.value;//获取输入内容
        if(content==""){
            alert("请输入新增节点的内容");
        }
        else if(selectDiv==undefined){
            alert("请选择要操作的节点");
        }
        else{
            var newDiv = document.createElement('div');
            newDiv.innerHTML = content;
            newDiv.className = 'level-';//给新的div设置class="";
            selectDiv.appendChild(newDiv);
        }
    })    
}


//初始样式
function clear(){
    traverse=[];//清空队列
    search=[];
    // widearr=[];
    tag=true;//对应后面的搜索，true表示还没搜到
    clearInterval(timer);//清除定时器
    var divs=document.getElementsByTagName("div");//所有div变成白色
    for(var i=0;i<divs.length;i++){
        divs[i].style.backgroundColor="#fff";
    }
}
 
//深度优先遍历，这里和前序一样
function deepTraversal(node){
    // traverse=[];//这里不能再加定义一次
    if(node!==null){
        traverse.push(node);//这里node参数第一个一般是根节点，推入数组第一个，后面再遍历根节点的所有子节点自主完成深度优先遍历
        var childrens=node.children;
        for(var i=0;i<childrens.length;i++){
            deepTraversal(childrens[i]);
        }
        return traverse;//最后返回数组，即按深度优先顺序排列的数组了~
    }
}

//广度优先遍历,按理说这个也行，但不知为啥实现不了(woc！！！，低级错误，已解决)
// function wideTraversal(node){
//     var i=0;
//     if(node){
//         traverse.push(node);
//         wideTraversal(node.nextElementSibling);
//         node=traverse[i+1];
//         wideTraversal(node.firstElementChild);
//     }
//     return traverse;
// }
//太感动了，这个可以！！！
function wideTraversal(selectNode) {
	// var traverse = [];
	if (selectNode != null) {
		var queue = [];
		queue.unshift(selectNode);//输入根节点
		while (queue.length != 0) {
			var item = queue.shift();
			traverse.push(item);
			var children = item.children;
			for (var i = 0; i < children.length; i++)
				queue.push(children[i]);
		}
	}
    return traverse;
}
//后序遍历
function postOrder(node){
    if(!(node==null)){
        var childrens=node.children;
        for(var i=0;i<childrens.length;i++){
            postOrder(childrens[i]);
        }
        traverse.push(node);
    }
}
//颜色变化
//searchOrtraverse:1-search,2-traverse,3-search no result
function changeColor(result,searchOrtraverse){
    var i=0;
    result[i].style.backgroundColor="blue";//最外面的根节点的变化
    timer=setInterval(function(){
        i++;
        if(i<result.length){//用蓝色和白色前后遍历二叉树，因为背景也是白色的，整个过程会给人一种只有蓝色流过的感觉
            result[i].style.backgroundColor="blue";
            result[i-1].style.backgroundColor="#fff";
        }
        else if(searchOrtraverse===1){//这里分为了三种情况，1.搜到了2.继续3.到结束为止也没有搜到
            clearInterval(timer);
            result[result.length-1].style.backgroundColor="pink";//这里只有搜到了才会有特殊颜色，其他的都是用白色消去了颜色
        }
        else if(searchOrtraverse===2){
            clearInterval(timer);
            result[result.length-1].style.backgroundColor="#fff";
        }
        else if(searchOrtraverse===3){
            clearInterval(timer);
            result[result.length-1].style.backgroundColor="#fff";
            alert("没查询到该搜索内容");
        }
    },500)
}
//搜索树
var tag = true; //标记是否搜索到，搜索到为false，不知为何tag不能放进function searchTree中
function searchTree(tree, content) {
    // var equal=(tree.innerHTML.trim()==content);
    var equal = (tree.innerHTML.split('<')[0].replace(/(^\s+)|(\s+$)/g, "") === content);//这样在有多个相同的搜索项时可以停在第一个搜到的地方，
                                                                                         //不然就会自动停在相同项的最后一个上
    if (!equal && tag) {//输入值！=div的值时，不断循环（可选择不同循环方式），直到找到相同值或者循环到终点为止
        search.push(tree);//这里用了深度遍历
        for (var i = 0; i < tree.children.length; i++) {
            searchTree(tree.children[i], content);
        }
    } else if (equal) {//输入值=div值时，终止循环，把搜到的值输入数组中，结束
        search.push(tree);
        tag = false;
        return;
    }
}
