function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
// var taginput=document.getElementById("tag-input");
// var tag=document.getElementById("tag");
// var hobbyinput=document.getElementById("hobby-input");
// var button=documnet.getElementById("hobby-button");
// var hobby=document.getElementById("hobby");
// function Creatlist(divlist){
//     this.queue=[];
//     this.render=function(){
//         var str="";
//         this.queue.forEach(function(e){
//             str+="<div>"+e+"</div>";
//         });
//         divlist.innerHTML=str;
//     }
// }
// Creatlist.prototype.rightpush=function(str){
//     this.queue.push(str);
//     this.render();
// }
// Creatlist.prototype.leftshift=function(str){
//     this.queue.shift(str);
//     this.render();
// }

// var tagobj = new CreatList(tag);
// var	hobbyobj = new CreatList(hobby);
// function splitinput(str){
//     var inputarray=str.trim().split(/[,，;；、。.\s\n]+/);
//     return inputarray;
// }
// function tagshow(){
//     if(/[,，;；/n/s]+/.test(taginput.value)||event.keyCode==13){//event.keyCode==13表示回车键enter
//             var data=splitinput(taginput.value);
//             var newtag=data[0];
//             if(tagobj.queue.indexOf(newtag)===-1){
//                 tagobj.rightpush(newtag);
//                 if(tagobj.queue.length>10){
//                     tagobj.leftshift();
//                 }
//             }
//             tagobj.render();
//             taginput.value="";
//     }
// }

// function showhobby() {
// 	var data = splitinput(hobbyinput.value);
// 	data.forEach(function (e) {
// 		if (hobbyobj.queue.indexOf(e) === -1) {
// 			hobbyobj.rightpush(e);
// 			if (hobbyobj.queue.length > 10) {
// 				hobbyobj.leftshift();
// 			}
// 		}
// 		hobbyobj.render();
// 		hobbyinput.value = "";
// 	});
// }
// addEventHandler(taginput,'keyup',showtag);
// addEventHandler(button,'click',showhobby);
var tagInput=document.getElementById("tag-input");
var tagList=document.getElementById("tag");
var hobbyInput=document.getElementById("hobby-input");
var hobbyBtn=documnet.getElementById("hobby-button");
var hobbyList=document.getElementById("hobby");
function CreatList(divList) {
	this.queue = [];
	this.render = function () {
		var str = "";
		this.queue.forEach(function (e) {
			str += '<div>' + e + '</div>';
		});
		divList.innerHTML = str;
	}
}
CreatList.prototype.rightPush = function(str) {
	this.queue.push(str);
	this.render();
};
CreatList.prototype.leftShift = function() {
	this.queue.shift();
	this.render();
};
//本来还想写个去重的方法，但是失败了……
//实例对象
var tagObj = new CreatList(tagList),
	hobbyObj = new CreatList(hobbyList);
//对输入内容分割成数组，考虑过能不能做成对象的方法，但是失败了……
function splitInput(str) {
	var inputArray = str.trim().split(/[,，;；、。.\s\n]+/);
	return inputArray;
}

function showTag() {
	if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
		var data = splitInput(tagInput.value),
			newTag = data[0];
		if (tagObj.queue.indexOf(newTag) === -1) {
			tagObj.rightPush(newTag);
			if (tagObj.queue.length > 10) {
				tagObj.leftShift();
			}
		}
		tagObj.render();
		tagInput.value = "";	
	}	
}

function showHobby() {
	var data = splitInput(hobbyInput.value);
	data.forEach(function (e) {
		if (hobbyObj.queue.indexOf(e) === -1) {
			hobbyObj.rightPush(e);
			if (hobbyObj.queue.length > 10) {
				hobbyObj.leftShift();
			}
		}
		hobbyObj.render();
		hobbyInput.value = "";
	});
}
addEventHandler(tagInput,'keyup',showTag);
addEventHandler(hobbyBtn,'click',showHobby);