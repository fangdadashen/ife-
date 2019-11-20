/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input").value.trim();
    var value=document.getElementById("aqi-value-input").value.trim();//找到城市名称和空气指数的输入值并除去字符串两端空白字符
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {///u4e00-/u9FA5表示汉字，A-Za-z表示字母大小写，整个表示找出城市名中汉字或字母的正则表达式
        alert("城市名必须为中英文字符！");
        return;//在此处应该是表示结束的意思
    }
    if (!value.match(/^\d+$/)) {//表示找出空气指数中数字的正则表达式
        alert("空气质量指数必须为整数！");
        return;
    }
    aqiData[city]=value;//在这里相当于aqiData.city=value(就是赋了一个value变量值),给aqiData对象增加了一名名为vaule的值的属性，
                        //在此时，value代表的是城市空气指数数据，也就是时此时的aqiData[city]就是城市的空气指数值
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table=document.getElementById("aqi-table");
    table.innerHTML="";//这里是把table的值清除,在这里的作用是在插入时把之前的数据，不然会把之前的复制一遍再加上新的输入一起输出
    for(var city in aqiData){//for-in循环和for差不多，就是把aqiData循环完
        if(table.children.length===0){//当表格长度为一时的表头,比起childNode，更建议使用children哦
            table.innerHTML="<td>城市</td><td>空气质量</td><td>操作</td>";
        }
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = city;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerHTML = aqiData[city];
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.innerHTML = "<button class='del-btn'>删除</button>";
        tr.appendChild(td3);
        table.appendChild(tr);//这里如果不插入的话，就无限清除table的数据，没法输出
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */

    function delBtnHandle(target) {
        // do sth.
        var tr = target.parentElement.parentElement;
        var strCity = tr.children[0].innerHTML;//这一段也不太懂
        delete aqiData[strCity];
        renderAqiList();
    }
    
    function init() {
    
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        document.getElementById("add-btn").onclick = addBtnHandle;
    
        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table = document.getElementById("aqi-table");
        // var arrBtnDel = table.getElementsByClassName("del-btn");
    
        table.addEventListener("click", function(e) {
            if (e.target && e.target.nodeName === "BUTTON") {
                delBtnHandle(e.target);
            }//这一段不理解，完全不懂
        })
}

init();