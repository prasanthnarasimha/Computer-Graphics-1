var renderer,
    	scene,
    	camera,
        myCanvas = document.getElementById('myCanvas');
        
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas, 
    antialias: true
    });
    renderer.setClearColor(0x333333);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //SCENE
scene = new THREE.Scene();

//MATERIAL

var material = new THREE.MeshLambertMaterial();
var material2 = new THREE.MeshPhongMaterial();
var material3 = new THREE.MeshStandardMaterial();


//GEOMETRY

var geometry = new THREE.BoxGeometry(100, 100, 100, 10, 10, 10);
var geometry2 = new THREE.SphereGeometry(50, 20, 20);
var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);


var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -500;
mesh.position.x = -100;
mesh.position.y = -50;
scene.add(mesh);


var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.rotation.x = -90 * (Math.PI / 180);
mesh3.position.y = -100;
scene.add(mesh3);

 // directionallight
 var light = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
 light.target = mesh;
 scene.add(light);
 
 var directionalLightHelper = new THREE.DirectionalLightHelper(light, 100);
 scene.add(directionalLightHelper);


 renderer.shadowMap.enabled = true;
 renderer.shadowMap.type = THREE.PCFShadowMap;
 
 var light = new THREE.SpotLight(0xffffff, 4.0, 3000);
 light.position.y = 100;
 light.target = mesh;
 
 light.castShadow = true;
 light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 100, 1, 500, 1000 ) );
 light.shadow.bias = 0.0001;    
 light.shadow.mapSize.width = 2048 * 2;
 light.shadow.mapSize.height = 2048 * 2;
 scene.add(light);
 
 mesh.castShadow = true;
 mesh3.receiveShadow = true;

 //perspective camera
 camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

 render();


 var delta = 0;
 var speed = 0.01
 function render() {

 
     delta += speed;

     directionalLightHelper.update();


     
     camera.lookAt(light.position);
     camera.position.x = Math.sin(delta) * 2000;
     camera.position.z = Math.cos(delta) * 2000;


     

     renderer.render(scene, camera);
     // shadowMapViewer.render(renderer);

     requestAnimationFrame(render);
 }
