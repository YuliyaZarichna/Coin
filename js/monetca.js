// three.js variables
var mesh, mesh2, camera, scene, renderer;
var maxRotation = 2 * Math.PI;

// Default click handler for our three.js objects
function objectClickHandler() {
    window.open('http://www.pericror.com/', '_blank');
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    //var texture = new THREE.TextureLoader().load('http://www.pericror.com/wp-content/uploads/2018/04/pericrorLogoBox.png');
    /*     var material = new THREE.MeshBasicMaterial({
            map: texture
        }); */
    var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })

    var objectSize = 100;

    // Create a cube
    var boxGeometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
    mesh = new THREE.Mesh(boxGeometry, material);
    mesh.position.set(objectSize * -2, 0, 0);
    mesh.callback = objectClickHandler;

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(objectSize / 2, 32, 32);
    mesh2 = new THREE.Mesh(sphereGeometry, material);
    mesh2.position.set(0, 0, 0);
    mesh2.callback = objectClickHandler;


    scene.add(mesh);
    scene.add(mesh2);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    var container = document.getElementById('canvasContainer');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.y = (mesh.rotation.y + 0.005) % maxRotation;
    mesh2.rotation.y = (mesh2.rotation.y + 0.005) % maxRotation;

    renderer.render(scene, camera);
}

window.onload = function () {
    init();
    animate();

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // See https://stackoverflow.com/questions/12800150/catch-the-click-event-on-a-specific-mesh-in-the-renderer
    // Handle all clicks to determine of a three.js object was clicked and trigger its callback
    function onDocumentMouseDown(event) {
        event.preventDefault();

        /*  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
         mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1; */

        raycaster.setFromCamera(mouse, camera);

        meshObjects = [mesh, mesh2]; // three.js objects with click handlers we are interested in

        var intersects = raycaster.intersectObjects(meshObjects);

        if (intersects.length > 0) {
            intersects[0].object.callback();
        }

    }

    // Using the same logic as above, determine if we are currently mousing over a three.js object,
    // and adjust the animation to provide visual feedback accordingly
    function onDocumentMouseMove(event) {
        event.preventDefault();

        /* mouse.z = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1; */

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects([mesh, mesh2]);
        var canvas = document.body.getElementsByTagName('canvas')[0];

        if (intersects.length > 0) {
            // intersects[0].object.rotation.x += .005;
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }

    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
};


/*var loader = new THREE.GLTFLoader();
          console.log("gltf");
          loader.load('textures/ball.gltf', function (gltf) {
              scene.add(gltf.scene);
          }, undefined, function (error) {
              console.error(error);
          }); */

/* var pointLightLeft = new THREE.PointLight(0x77aa88, 1);
pointLightLeft.position.set(-2, -1, 10);
scene.add(pointLightLeft); */

/*  var pointLightRight = new THREE.PointLight(0xff8833, 1);
 pointLightRight.position.set(2, -1, 2);
 scene.add(pointLightRight); */

/*  var whitePointLight = new THREE.PointLight(0xffffff, 0.3);
 whitePointLight.position.set(0, 2, 1);
 scene.add(whitePointLight); */

/*  var pointLight = new THREE.PointLight(0xffffff, 1, 500);
 pointLight.position.set(20, 0, 25);
 scene.add(pointLight); */
/* var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light); */

/* var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 0);
light.castShadow = true;
scene.add(light); */

/* var dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.z = 2;
scene.add(dirLight); */


/* var texture = new THREE.TextureLoader().load('textures/omo.png');
           var material = new THREE.MeshLambertMaterial({
               map: texture,
           }); */


/*   var coinMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff8833, side: THREE.DoubleSide, vertexColors: THREE.VertexColors }),
      new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide, vertexColors: THREE.VertexColors }),
      new THREE.MeshBasicMaterial({ color: 0xeeeeee, side: THREE.DoubleSide, vertexColors: THREE.VertexColors }),
  ] */


       /* var loader = new THREE.TextureLoader();
            loader.load([
                'textures/omo.png',
                'textures/projectsFlipped.png'
            ],

                function (texture) {
                    var material = new THREE.MeshBasicMaterial({
                        map: texture
                    });
                },
                // onProgress callback currently not supported
                undefined,

                // onError callback
                function (err) {
                    console.error('An error happened.');
                }
            ) */