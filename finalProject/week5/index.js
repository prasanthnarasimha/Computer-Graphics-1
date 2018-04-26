
var camera, 
    scene, 
    renderer, 
    controls, 
    container,
    rotationPoint; 

var characterSize = 50;
var outlineSize = characterSize * 0.05;

var objects = [];

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
// var textureLoader = new THREE.TextureLoader();

var movements = [];
var playerSpeed = 5;


init();
animate(); 




function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xccddff );
  scene.fog = new THREE.Fog( 0xccddff, 500, 2000 );
  
  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );
  
  var hemisphereLight = new THREE.HemisphereLight( 0xdddddd, 0x000000, 0.5 );
  scene.add( hemisphereLight );
  
  rotationPoint = new THREE.Object3D();
  rotationPoint.position.set( 0, 0, 0 );
  scene.add( rotationPoint );
  
  createCharacter();
  createFloor();
  createTree(300, 300);
  createTree(800, -300);
  createTree(-300, 800);
  createTree(-800, -800);
  
  camera = new THREE.PerspectiveCamera(
    50, 
    window.innerWidth / window.innerHeight, 
    1, 
    20000 
  );
  camera.position.z = -300;
  camera.position.y = 200;
  box.add( camera );
  
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  
  var element = renderer.domElement;
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( element );
  
  controls = new THREE.OrbitControls( camera, element );
  controls.enablePan = true;
  controls.enableZoom = true; 
  controls.maxDistance = 1000;
  controls.minDistance = 60;
  controls.target.copy( new THREE.Vector3( 0, characterSize/2, 0 ) );
  
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};




function onDocumentMouseDown( event ) {
  event.preventDefault();

  if ( event.which == 3 ) {
    stopMovement();
    
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
      movements.push(intersects[ 0 ].point);
    }
  }
}

function move( location, destination, speed = playerSpeed ) {
	  var moveDistance = speed;

    var posX = location.position.x;
    var posZ = location.position.z;
    var newPosX = destination.x;
    var newPosZ = destination.z;

    var multiplierX = 1;
    var multiplierZ = 1;
    
    var diffX = Math.abs( posX - newPosX );
    var diffZ = Math.abs( posZ - newPosZ );
    var distance = Math.sqrt( diffX * diffX + diffZ * diffZ );
    
    if (posX > newPosX) {
      multiplierX = -1;
    }

    if (posZ > newPosZ) {
      multiplierZ = -1;
    }

    location.position.x = location.position.x + ( moveDistance * ( diffX / distance )) * multiplierX;
    location.position.z = location.position.z + ( moveDistance * ( diffZ / distance )) * multiplierZ;

    if (( Math.floor( location.position.x ) <= Math.floor( newPosX ) + 15 && 
          Math.floor( location.position.x ) >= Math.floor( newPosX ) - 15 ) &&
        ( Math.floor( location.position.z ) <= Math.floor( newPosZ ) + 15 && 
          Math.floor( location.position.z ) >= Math.floor( newPosZ ) - 15 )) {
      location.position.x = Math.floor( location.position.x );
      location.position.z = Math.floor( location.position.z );
      
      stopMovement();
      
    }
}




function stopMovement() {
  movements = [];
}




function update() {
  camera.updateProjectionMatrix();
}



function render() {
  renderer.render( scene, camera );
  

  if ( camera.position.y < 10 ) {
    camera.position.y = 10;
  }
  

  if ( movements.length > 0 ) {    
    move( rotationPoint, movements[ 0 ] );
  }
}




function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}




function createCharacter() {


  var texture = new THREE.TextureLoader().load( 'vertical_logo_with_tag.png' );
  var geometry = new THREE.BoxBufferGeometry( characterSize, characterSize, characterSize );
  
  var material = new THREE.MeshBasicMaterial( { map: texture } );

  // var geometry = new THREE.BoxBufferGeometry( characterSize, characterSize, characterSize );
  // var material = new THREE.MeshPhongMaterial({ color: 'red' });
  box = new THREE.Mesh( geometry, material );
  box.position.y = characterSize/2;
  rotationPoint.add( box );
  

  var outline_geo = new THREE.BoxGeometry( characterSize + outlineSize, characterSize + outlineSize, characterSize + outlineSize );
  var outline_mat = new THREE.MeshBasicMaterial({ color : 0x0000000, side: THREE.BackSide });
  outline = new THREE.Mesh( outline_geo, outline_mat );
  box.add( outline );
}



function createFloor() {
  var texture = new THREE.TextureLoader().load( 'grass.jpg' );
  var geometry = new THREE.PlaneBufferGeometry( 100000, 100000 );
  var material = new THREE.MeshToonMaterial( {map: texture} );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -1 * Math.PI/2;
  plane.position.y = 0;
  scene.add( plane );
  objects.push( plane );
}




function createTree( posX, posZ ) {

  var randomScale = ( Math.random() * 3 ) + 0.8;
  var randomRotateY = Math.PI/( Math.floor(( Math.random() * 32) + 1 ));
  

  var geometry = new THREE.CylinderGeometry( characterSize/3.5, characterSize/2.5, characterSize * 1.3, 8 );
  var material = new THREE.MeshToonMaterial( {color: 0x221609} );
  var trunk = new THREE.Mesh( geometry, material );
  trunk.position.set(posX, ((characterSize * 1.3 * randomScale)/2), posZ);
  trunk.scale.x = trunk.scale.y = trunk.scale.z = randomScale;
  scene.add( trunk );


  var outline_geo = new THREE.CylinderGeometry( characterSize/3.5 + outlineSize, characterSize/2.5 + outlineSize, characterSize * 1.3 + outlineSize, 8 );
  var outline_mat = new THREE.MeshBasicMaterial({
    color : 0x0000000,
    side: THREE.BackSide
  });
  var outlineTrunk = new THREE.Mesh( outline_geo, outline_mat );
  trunk.add( outlineTrunk );
  
  var geometry = new THREE.DodecahedronGeometry( characterSize );
  var material = new THREE.MeshToonMaterial({ color: 'green' });
  var treeTop = new THREE.Mesh( geometry, material );
    treeTop.position.set( posX, ((characterSize * 1.3 * randomScale)/2) + characterSize * randomScale, posZ );
  treeTop.scale.x = treeTop.scale.y = treeTop.scale.z = randomScale;
  treeTop.rotation.y = randomRotateY;
  scene.add( treeTop );
  

  var outline_geo = new THREE.DodecahedronGeometry(characterSize + outlineSize);
  var outline_mat = new THREE.MeshBasicMaterial({
    color : 0x0000000, 
    side: THREE.BackSide
  });
  var outlineTreeTop = new THREE.Mesh(outline_geo, outline_mat);
  treeTop.add( outlineTreeTop );
}