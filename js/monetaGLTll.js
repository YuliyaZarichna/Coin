var loader = new THREE.GLTFLoader();
console.log("gltf");
loader.load('textures/ball.gltf', function (gltf) {

    scene.add(gltf.scene);

}, undefined, function (error) {

    console.error(error);

});