function functrans(value, id1, id2) {
    document.getElementById(id1).value = value;
    var x = value;
    var y = "translate(" + x + "px,0px)";
    document.getElementById(id2).style.transform = y;
}

function funcrot(value, id1, id2) {
    var i = value + " deg";
    document.getElementById(id1).value = i;
    var x = value;
    var y = "rotate(" + x + "deg)";
    document.getElementById(id2).style.transform = y;
}

function funcscale(value, id1, id2) {
    document.getElementById(id1).value = value;
    var x = value;
    var y = "scale(" + x + "," + x + ")";
    document.getElementById(id2).style.transform = y;
}

function funcshear(value, id1, id2) {
    var i = value + " deg";
    document.getElementById(id1).value = i;
    var x = value;
    var y = "skewX(" + x + "deg)";
    document.getElementById(id2).style.transform = y;
}





function startup() {
    colorWell = document.querySelector("#colorWell");
    colorWell.value = defaultColor;
    colorWell.addEventListener("input", updateFirst, false);
    colorWell.addEventListener("change", updateAll, false);
    colorWell.select();
}

function updateFirst(event) {

    document.body.style.backgroundColor = event.target.value;



}

function updateAll(event) {
    document.body.style.backgroundColor = event.target.value;

}


var colorWell;
var defaultColor = "#f5f5dc";

window.addEventListener("load", startup, false);

