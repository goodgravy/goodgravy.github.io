(function (global) {
  var document = global.document;
  var camera, scene, renderer;
  var effect, controls;
  var element, container;

  var clock = new THREE.Clock();

  init();
  animate();

  function init() {
    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    container = document.getElementById('example');
    container.appendChild(element);

    effect = new THREE.StereoEffect(renderer);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
    camera.position.set(0, -100, 200);
    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    controls.rotateUp(Math.PI / 4);
    controls.noPan = true;

    var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
    scene.add(light);

    var floor = createFloor();
    scene.add(floor);

    var tshirt = createTShirt();
    scene.add(tshirt);

    window.addEventListener('deviceorientation', setupOrientation(tshirt), true);

    window.addEventListener('resize', resize, false);
    setTimeout(resize, 1);
  }

  function setupOrientation (target) {
    return function(e) {
      if (!e.alpha) {
        return;
      }

      controls = new THREE.DeviceOrientationControls(target, true);
      controls.connect();
      controls.update();

      element.addEventListener('click', fullscreen, false);

      window.removeEventListener('deviceorientation', setOrientationControls, true);
    };
  }

  function resize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
  }

  function update(dt) {
    resize();

    camera.updateProjectionMatrix();

    controls.update(dt);
  }

  function render(dt) {
    // renderer.render(scene, camera);
    effect.render(scene, camera);
  }

  function animate(t) {
    requestAnimationFrame(animate);

    update(clock.getDelta());
    render(clock.getDelta());
  }

  function fullscreen() {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }

  function assignUVs ( geometry ){

    geometry.computeBoundingBox();

    var max     = geometry.boundingBox.max;
    var min     = geometry.boundingBox.min;

    var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);

    geometry.faceVertexUvs[0] = [];
    var faces = geometry.faces;

    for (i = 0; i < geometry.faces.length ; i++) {

      var v1 = geometry.vertices[faces[i].a];
      var v2 = geometry.vertices[faces[i].b];
      var v3 = geometry.vertices[faces[i].c];

      geometry.faceVertexUvs[0].push([
        new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),
        new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),
        new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )
      ]);

    }

    geometry.uvsNeedUpdate = true;

  }

  function createFloor () {
    var texture = THREE.ImageUtils.loadTexture(
      'img/vr-campaign/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50, 50);
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 20,
      shading: THREE.FlatShading,
      map: texture
    });

    var geometry = new THREE.PlaneGeometry(1000, 1000);

    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
  }

  function createTShirt() {

    var shirtTexture = new THREE.ImageUtils.loadTexture( 'img/vr-campaign/front.png' ),
    shirtMaterial = new THREE.MeshBasicMaterial( { map: shirtTexture, side: THREE.DoubleSide } ),
    shirtColour = new THREE.MeshBasicMaterial( { color: 0x40486A } );

    // MESH
    var points = [];

    points.push (new THREE.Vector2(15, 2));
    points.push (new THREE.Vector2(33, 81));
    points.push (new THREE.Vector2(2, 83));
    points.push (new THREE.Vector2(5, 88));
    points.push (new THREE.Vector2(25, 100));
    points.push (new THREE.Vector2(48, 94));
    points.push (new THREE.Vector2(67, 100));
    points.push (new THREE.Vector2(93, 94));
    points.push (new THREE.Vector2(98, 92));
    points.push (new THREE.Vector2(99, 90));
    points.push (new THREE.Vector2(66, 89));
    points.push (new THREE.Vector2(75, 0));

    var shape = new THREE.Shape( points );
    var extrusionSettings = {
      amount: 10, bevelThickness: 25, bevelSize: 30, bevelEnabled: true,
      material: 0, extrudeMaterial: 1
    };

    var geometry = new THREE.ExtrudeGeometry(shape, extrusionSettings);

    assignUVs(geometry);

    var materials = [shirtMaterial];
    if (document.location.hash.substr(1) === 'debug') {
      materials.push(new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true,
        transparent: true
      }));
    }
    mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
    mesh.position.set(-50, 20, 0);
    return mesh;
  }

})(window);

