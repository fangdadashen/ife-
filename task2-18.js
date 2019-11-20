function addHandler(element,type,handler){   //绑定事件,兼容浏览器差异
    if(element.addEventListener){      // IE9以下不兼容(dom2)
        element.addEventListener(type,handler,false)
    }else if(element.attachEvent){     //IE独有
        element.attachEvent('on' + type ,handler)
    }else{
        element['on'+type] = handler;    //一个元素只能绑定一个处理程序(dom0)
    }
}
var Btn=document.getElementById("btn");
var Name=document.getElementById("name");
var Password=document.getElementById("password");
var Passcheck=document.getElementById("passcheck");
var Email=document.getElementById("email");
var Phone=document.getElementById("phone");
var p=document.getElementsByTagName("p");
window.onload=function(){
    //获得焦点时给出条件提示
    addHandler(Name,"focus",function(){
        p[0].innerHTML="必填，长度为4-16个字符";
        p[0].style.color="gray";
    })
    addHandler(Password,"focus",function(){
        p[1].innerHTML="6-16位数字和字母";
        p[1].style.color="gray";
    })
    addHandler(Passcheck,"focus",function(){
        p[2].innerHTML="重复输入密码";
        p[2].style.color="gray";
    })
    addHandler(Email,"focus",function(){
        p[3].innerHTML="example@hh.com";
        p[3].style.color="gray";
    })
    addHandler(Phone,"focus",function(){
        p[4].innerHTML="请输入11位手机号码";
        p[4].style.color="gray";
    })
    //失去焦点时判断格式
    addHandler(Name,"blur",function(){
        var value=Name.value;
        var len=value.split("").length;//把value的每一个字符分为数组中的一个元素
        if(value==""){
            p[0].innerHTML="输入不能为空哦";
            Inputstyle(p[0],Name,false);
        }
        else if(len<4||len>16){
            p[0].innerHTML="请输入正确的字符数";
            Inputstyle(p[0],Name,false);
        }
        else{
            p[0].innerHTML="名称可用";
            Inputstyle(p[0],Name,true);
        }
    })
    addHandler(Password,"blur",function(){
        var value=Password.value;
        if(value==""){
            p[1].innerHTML="输入不能为空哦";
            Inputstyle(p[1],Password,false);
        }
        else if(value.match(/^[A-Za-z0-9]{6,16}$/)){
            p[1].innerHTML="格式正确";
            Inputstyle(p[1],Password,true);
        }
        else{
            p[1].innerHTML="请输入6-16位数且只能是数字和字母";
            Inputstyle(p[1],Password,false);
        }
    })
    addHandler(Passcheck,"blur",function(){
        var value=Passcheck.value;
        if(value==""){
            p[2].innerHTML="输入不能为空哦";
            Inputstyle(p[2],Passcheck,false);
        }
        else if(Passcheck.value===Password.value){
            p[2].innerHTML="确认成功";
            Inputstyle(p[2],Passcheck,true);
        }
        else{
            p[2].innerHTML="两次密码输入不同哦";
            p[2].style.color="red";
            Passcheck.style.border="2px solid red";
            Inputstyle(p[2],Passcheck,false);
        }
    })
    addHandler(Email,"blur",function(){
        var value=Email.value;
        if(value==""){
            p[3].innerHTML="输入不能为空哦";
            Inputstyle(p[3],Email,false);
        }
        else if(value.match(/^([\w\-\.]+)@([\w\-]+)\.([a-zA-Z]{2,4})$/)){
            p[3].innerHTML="邮箱可用";
            Inputstyle(p[3],Email,true);
        }
        else{
            p[3].innerHTML="请输入正确格式";
            Inputstyle(p[3],Email,false);
        }
    })
    addHandler(Phone,"blur",function(){
        var value=Phone.value;
        if(value==""){
            p[4].innerHTML="输入不能为空哦";
            Inputstyle(p[4],Phone,false);
        }
        else if(value.match(/^\d{11}$/)){
            p[4].innerHTML="号码正确";
            Inputstyle(p[4],Phone,true);
        }
        else{
            p[4].innerHTML="请输入正确格式";
            Inputstyle(p[4],Phone,false);
        }
    })
    //button验证
    addHandler(Btn,"click",function(){
        if(Name.style.borderColor=="green"&&Password.style.borderColor=="green"&&Passcheck.style.borderColor=="green"&&Email.style.borderColor=="green"&&Email.style.borderColor=="green"){
              
            alert("验证通过");
        }
        else{
            alert("提交失败，请检查输入");
        }
    })
}
function Inputstyle(btn,input,bool){
    if(bool){
        btn.style.color="green";
        input.style.border="2px solid green";
    }
    else{
        btn.style.color="red";
        input.style.border="2px solid red";
    }
}