window.onload = (function () {
    if(isPc()){
        var box1 = document.getElementById('car_box1');
        box1.style.top = 5 + '%';
    }
    comp();
})
// console.log(isPc());
function isPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    return flag
}
function getStyle(obj,attr){//用来获取样式的方法
    if(obj.currentStyle){//IE用currentStyle。
            return obj.currentStyle[attr];
    }
    else{//firefox用getComputedStyle来获取样式。
        return getComputedStyle(obj,false)[attr];
    }
}
function comp(){
    var Body = document.body;
    var middleShop = document.getElementsByClassName('shop_box');
    var length = 0;
    for(var i = 0; i < middleShop.length; i++){
        length += parseFloat(getStyle(middleShop[i], 'height'));
    }
    if(parseFloat(getStyle(Body, 'height')) <= length){
        Body.style.overflow = 'auto';
    }
}




