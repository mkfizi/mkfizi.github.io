trueHeightJS();
resize();

window.onresize = resize;

function resize(){
    var h = window.innerHeight;
    var w = window.innerWidth;
    console.log(h+ " "+ w);
    document.getElementById("height").innerHTML = h +"px";
    document.getElementById("width").innerHTML = w +"px";
}

var color = "hsl(" + 360 * Math.random() + ',' +
                                                        (25 + 70 * Math.random()) + '%,' + 
                                                        (85 + 10 * Math.random()) + '%)';
document.getElementById("home").style.backgroundColor = color;
document.getElementById("svg").style.color  = color;                                                       