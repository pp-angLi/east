var eventUtil = { //跨浏览器事件添加(IE8)以下
    addHandler:function (element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }
        else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }
        else{
            element['on' + type] = handler;
        }
    },
}

var someThing = (function () {
    var circleBox = document.getElementsByClassName('shop_circle_box'); // 单选圆的父元素
    var allCircle = document.getElementById('circle'); // 全选圆
    var flag = []; // 判定圆的状态
    var nodes = []; // 单选圆
    flag.length = circleBox.length;

    for(var i = 0; i < circleBox.length; i++){
        flag[i] = 1; // 将每个圆定义为未点亮
        var j = 0;
        while(circleBox[i].childNodes[j].innerHTML == undefined){ // 为点击父元素可选取单选圆做准备
            j++;
        }
        nodes[i] = circleBox[i].childNodes[j]; // 未点击父元素可选取单选圆做准备
    }
    flag[flag.length] = 1; // flag的最后一位定义为全选圆的判断值

    var select = function () { // 为 每个按钮提供 监听 -- 该方法暴露出去
        for(var i = 0; i < circleBox.length; i++){
            eventUtil.addHandler(circleBox[i], 'click', selectDo(nodes[i],i));
        }
        eventUtil.addHandler(allCircle, 'click', selectDo(allCircle, flag.length - 1));
    }

    function selectDo(Name,obj) { // 监听执行的方法 -- 为圆点亮/熄灭
        if(obj == flag.length - 1){ // 点亮所有圆
            return function () {
                if(flag[obj] == 1){
                    for(var i = 0; i < flag.length - 1; i++){
                        nodes[i].style.background = 'orange';
                        nodes[i].style.border = 'none';
                        flag[i] = 0;
                    }
                    Name.style.background = 'orange';
                    Name.style.border = 'none';
                    flag[obj] = 0;
                    select = null;
                    }
                    else{
                        for(var i = 0; i < flag.length - 1; i++){
                            nodes[i].style.background = '';
                            nodes[i].style.border = '';
                            flag[i] = 1;
                        }
                        Name.style.background = '';
                        Name.style.border = '';
                        flag[obj] = 1;
                        select = null;
                    }
            }
        }

        else{ // 点亮/熄灭 单个圆
            return function () {
                var f;  // 用来检测是否存在一个单个未被点亮
                if(flag[obj]){ // 点亮单个
                    Name.style.background = 'orange';
                    Name.style.border = 'none';
                    flag[obj] = 0;
                    select = null;
                    for(var i = 0; i < flag.length - 1; i++){  // 为f做判定
                        if(flag[i] != 0){
                            f = 0; // 存在
                        }
                        else{
                            f = 1; // 不存在
                        }
                    }
                    if(!f){ // 存在f的时候，全选键熄灭
                        allCircle.style.background = '';
                        allCircle.style.border = '';
                        flag[flag.length - 1] = 1;
                    }
                    else{ // 不存在f的时候，全选键亮
                        allCircle.style.background = 'orange';
                        allCircle.style.border = 'none';
                        flag[flag.length - 1] = 0;
                    }
                }
                else{ // 熄灭单个
                    Name.style.background = '';
                    Name.style.border = '';
                    flag[obj] = 1;
                    select = null;
                    if(flag[flag.length - 1] == 0){  // 如果当前是全选 则 全选键熄灭
                        allCircle.style.background = '';
                        allCircle.style.border = '';
                        flag[flag.length - 1] = 1;
                    }
                }
            }
        }
    }
    return {
        select:select
    }
})()

someThing.select();