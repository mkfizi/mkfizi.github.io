window.onresize = checkWidth;

var innerBrowser = {
    height:  window.innerHeight,
    width: window.innerWidth
}

function trueHeightJS(){    
    innerBrowser.height = window.innerHeight;
    innerBrowser.width  = window.innerWidth;
    var setHeight       = innerBrowser.height;
    var elems           = document.getElementsByClassName("true-height")
    for(var i = 0; i < elems.length; i++) {
        elems[i].style.height = setHeight+"px";
    }
}

function checkWidth(){
    if(window.innerWidth != innerBrowser.width){
        trueHeightJS();
    }
}