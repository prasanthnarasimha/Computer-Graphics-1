
var camera, scene, renderer,
bulbLight, bulbMat, hemiLight,
object, loader, stats;
var ballMat, cubeMat, floorMat;


var bulbLuminousPowers = {
    "110000 lm (1000W)": 110000,
    "3500 lm (300W)": 3500,
    "1700 lm (100W)": 1700,
    "800 lm (60W)": 800,
    "400 lm (40W)": 400,
    "180 lm (25W)": 180,
    "20 lm (4W)": 20,
    "Off": 0
};







var clock = new THREE.Clock();

var textureLoader = new THREE.TextureLoader();











var hemiLuminousIrradiances = {
    "0.0001 lx (Moonless Night)": 0.0001,
    "0.002 lx (Night Airglow)": 0.002,
    "0.5 lx (Full Moon)": 0.5,
    "3.4 lx (City Twilight)": 3.4,
    "50 lx (Living Room)": 50,
    "100 lx (Very Overcast)": 100,
    "350 lx (Office Room)": 350,
    "400 lx (Sunrise/Sunset)": 400,
    "1000 lx (Overcast)": 1000,
    "18000 lx (Daylight)": 18000,
    "50000 lx (Direct Sun)": 50000
};

var params = {
    shadows: true,
    exposure: 0.88,
    bulbPower: Object.keys( bulbLuminousPowers )[ 3 ],
    hemiIrradiance: Object.keys( hemiLuminousIrradiances )[0]
};




var pos = {x:0, y:0, z:0};

init();
animate();

function init() {

    // var container = document.getElementById( 'container' );

    // stats = new Stats();
    // container.appendChild( stats.dom );


    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = -4;
    camera.position.z = 4;
    camera.position.y = 2;

    scene = new THREE.Scene();

    var bulbGeometry = new THREE.SphereBufferGeometry( 0.02, 16, 8 );
    bulbLight = new THREE.PointLight( 0xffee88, 1, 100, 2 );

    bulbMat = new THREE.MeshStandardMaterial( {
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0x000000
    });
    bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
    bulbLight.position.set( 0, 2, 0 );
    bulbLight.castShadow = true;
    scene.add( bulbLight );

    hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0.02 );
    scene.add( hemiLight );

    floorMat = new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 0.0005
    });
    
    textureLoader.load( "grass.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        floorMat.map = map;
        floorMat.needsUpdate = true;
    } );
    textureLoader.load( "grass.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;
    } );
    textureLoader.load( "grass.jpg", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 10, 24 );
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    } );

    cubeMat = new THREE.MeshStandardMaterial( {
        roughness: 0.7,
        color: 0xffffff,
        bumpScale: 0.002,
        metalness: 0.2
    });
    textureLoader.load( "vertical_logo_with_tag.png", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 1, 1 );
        cubeMat.map = map;
        cubeMat.needsUpdate = true;
    } );
    textureLoader.load( "vertical_logo_with_tag.png", function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 1, 1 );
        cubeMat.bumpMap = map;
        cubeMat.needsUpdate = true;
    } );

    ballMat = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
        roughness: 0.5,
        metalness: 1.0
    });
    textureLoader.load( "moon.jpg", function( map ) {
    	map.anisotropy = 4;
    	ballMat.map = map;
    	ballMat.needsUpdate = true;
    } );
    // textureLoader.load( "moon_1024.jpg", function( map ) {
    // 	map.anisotropy = 4;
    // 	ballMat.metalnessMap = map;
    // 	ballMat.needsUpdate = true;
    // } );

    var floorGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
    var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    scene.add( floorMesh );

    var ballGeometry = new THREE.SphereBufferGeometry( 0.5, 32, 32 );
    var ballMesh = new THREE.Mesh( ballGeometry, ballMat );
    ballMesh.position.set( 1, 0.5, 1 );
    ballMesh.rotation.y = Math.PI;
    ballMesh.castShadow = true;
    scene.add( ballMesh );

    var boxGeometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5 );
    var boxMesh = new THREE.Mesh( boxGeometry, cubeMat );
    boxMesh.position.set( -0.5, 0.25, -1 );
    boxMesh.castShadow = true;
    scene.add( boxMesh );

    var boxMesh2 = new THREE.Mesh( boxGeometry, cubeMat );
    boxMesh2.position.set( 0, 0.25, -5 );
    boxMesh2.castShadow = true;
    scene.add( boxMesh2 );

    var boxMesh3 = new THREE.Mesh( boxGeometry, cubeMat );
    boxMesh3.position.set( 7, 0.25, 0 );
    boxMesh3.castShadow = true;
    scene.add( boxMesh3 );


    renderer = new THREE.WebGLRenderer();
    renderer.physicallyCorrectLights = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );


    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );


    // var gui = new dat.GUI();

    // gui.add( params, 'hemiIrradiance', Object.keys( hemiLuminousIrradiances ) );
    // gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
    // gui.add( params, 'exposure', 0, 1 );
    // gui.add( params, 'shadows' );
    // gui.open();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

var previousShadowMap = false;

function render() {

    renderer.toneMappingExposure = Math.pow( params.exposure, 5.0 ); // to allow for very bright scenes.
    renderer.shadowMap.enabled = params.shadows;
    bulbLight.castShadow = params.shadows;
    if( params.shadows !== previousShadowMap ) {
        ballMat.needsUpdate = true;
        cubeMat.needsUpdate = true;
        floorMat.needsUpdate = true;
        previousShadowMap = params.shadows;
    }
    bulbLight.power = bulbLuminousPowers[ params.bulbPower ];
    bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow( 0.02, 2.0 ); // convert from intensity to irradiance at bulb surface

    hemiLight.intensity = hemiLuminousIrradiances[ params.hemiIrradiance ];
    var time = Date.now() * (0.0015 *2);
    var delta = clock.getDelta();

    
    // bulbLight.position.y = Math.cos( time ) * 0.75 + 1.25;
bulbLight.position.x = Math.cos( time ) * 0.75 + 2.25;

    // bulbLight.position.set(pos.x, pos.y, pos.z);

    renderer.render( scene, camera );

    // stats.update();

}

function changetexture(name){

    textureLoader.load( name+".jpg", function( map ) {
    	map.anisotropy = 4;
    	ballMat.map = map;
    	ballMat.needsUpdate = true;
    } );
}



document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

                // Use event.pageX / event.pageY here

                var vector = new THREE.Vector3();

        vector.set(
            ( event.pageX / window.innerWidth ) * 2 - 1,
            - ( event.pageY / window.innerHeight ) * 2 + 1,
            0.5 );

        vector.unproject( camera );

        var dir = vector.sub( camera.position ).normalize();

        var distance = - camera.position.z / dir.z;

        pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
 
        
    }
