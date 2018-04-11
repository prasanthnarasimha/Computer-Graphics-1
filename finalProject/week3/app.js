var camera, scene, renderer;
var mesh;
var rotaionX =  0.005;
var rotaionY = 0.01;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load( 'vertical_logo_with_tag.png' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    var divdoc = document.getElementById("cube");
    divdoc.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.x +=rotaionX;
    mesh.rotation.y +=rotaionY;
    renderer.render( scene, camera );
}

function changeRotX(){

}
function changeRotY(){

}


function disableAlldivs(){
    document.getElementById('cube').style.display = 'none';
    document.getElementById('light').style.display = 'none';
    
}

function showdiv(id){
    if(document.getElementById(id).style.display == 'block'){
        disableAlldivs();
    }
    else{
        disableAlldivs();
        document.getElementById(id).style.display = 'block';        
    }
    
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

// var sliderX = document.getElementById("sliderX");
// var sliderY = document.getElementById("sliderY");

// sliderX.oninput = function(){
//     rotaionX = sliderX.value

// }

// sliderY.oninput = function(){
//     rotaionY = sliderY.value
    
// }
disableAlldivs();

