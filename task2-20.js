function addHandler(element,type,handler){   //绑定事件,兼容浏览器差异
    if(element.addEventListener){      // IE9以下不兼容(dom2)
        element.addEventListener(type,handler,false)
    }else if(element.attachEvent){     //IE独有
        element.attachEvent('on' + type ,handler)
    }else{
        element['on'+type] = handler;    //一个元素只能绑定一个处理程序(dom0)
    }
}
function $(id){
    return document.getElementById(id);
}
var Name=$("name");
var Password=$("password");
var Passcheck=$("passcheck");
var Email=$("email");
var Phone=$("phone");
var Style1=$("style1");
var Style2=$("style2");
var Table=$("table");
var Btn=document.getElementById('btn');
//工厂
// function Inputword(label,type,validator,rules,success,fail){
//     this.name=label;
//     this.type=type;
//     this.validator=validator;
//     this.rules=rules;
//     this.success=success;
//     this.fail=fail;
// }
// //实例创建
// var nameint=new Inputword("name","text",)

function input(str,bool){
    if(bool){
    str+="<span>"+str+"</span><input type='text' class='input1'><br><p></p>";
    }
    else{
    str+="<span>"+str+"</span><input type='password' class='input1'><br><p></p>";
    }
}

var inputname=['名称','密码','确认','邮箱','手机'];

// var inputarr=[input(inputname(0),true),input(inputname(1),false),input(inputname(2),true),input(inputname(3),true),input(inputname(4),true)];
// alert(inputarr);
// window.onload=function(){
           
Btn.onclick=function btntable(){
    // alert("123");
    var tablearr=[Name,Password,Passcheck,Email,Phone];
    var arr=[],str='';
    for(var i=0;i<tablearr.length;i++){
        if(tablearr[i].checked){
            str+=arr.push(inputarr[i]);
        }
    }
   
if(Style2.checked){
    str=str.replace(/class='input1'/g,"class='input2'");
}
str+='<input type="button">';
Table.innerHTML=str;
}
// }