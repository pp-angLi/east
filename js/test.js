window.onload = function (){
    makeSquare();
}

function getStyle(obj,attr){//用来获取样式的方法
    if(obj.currentStyle){//IE用currentStyle。
            return obj.currentStyle[attr];
    }
    else{//firefox用getComputedStyle来获取样式。
        return getComputedStyle(obj,false)[attr];
    }
}
var makeSquare = function () {
    var photoBox = document.getElementsByClassName('right_photo');
    var k = parseInt(getStyle(photoBox[0], 'width'));

    for(var i = 0; i < photoBox.length; i++){
        photoBox[i].style.height = k + 'px';
        console.log(i + ' ' + k);
    }
}