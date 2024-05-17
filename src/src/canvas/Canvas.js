import { PerspectiveCamera } from "../camera/PerspectiveCamera";
import { OrthographicCamera } from "../camera/OrthographicCamera";
import { Matrix4 } from "../math/Matrix4";
import { WebGL } from "../primitives/WebGL";
import { rpVertices, rpColors } from "../models/hollow/rectanglePipe";
import { ObliqueCamera } from "../camera/ObliqueCamera";
import { pyramid, pyramidColor } from "../models/hollow/pyramid";
import { OrbitControl } from "../camera/OrbitControl";
import { Component } from "../primitives/Component";
import { Scene } from "../primitives/Scene";
import { BoxGeometry } from "../geometry/BoxGeometry";
import { BufferGeometry } from "../geometry/BufferGeometry";
import { BasicMaterial } from "../material/BasicMaterial";
import { Mesh } from "../primitives/Mesh";
import { Color } from "../primitives/Color";

export function setupCanvas(element, angleSlider, radiusSlider) {
  var canvas = element;
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var webgl = new WebGL(gl);
  var currentCamera = new PerspectiveCamera(gl, 60, 0, 200, 1, 2000);
  // var currentCamera = new OrthographicCamera(gl, -10, 10, -10, 10, 0.1, 100);
  // var currentCamera = new ObliqueCamera(gl, -10, 10, -10, 10, 0.1, 100);

  // Define default component
  var scene = new Scene();

  // Define geometry
  var geometry = new BoxGeometry(100, 100, 100);

  // Define material
  var material = new BasicMaterial(
    "Basic",
    new Color(1, 0, 0, 1),
    pyramidColor
  );

  // Define mesh
  var mesh = new Mesh(geometry, material);

  scene.add(mesh);

  angleSlider.addEventListener("input", function (event) {
    currentCamera.cameraAngleDeg = event.target.value;
    webgl.render(scene, currentCamera);
  });

  radiusSlider.addEventListener("input", function (event) {
    currentCamera.radiusDeg = parseFloat(event.target.value);
    webgl.render(scene, currentCamera);
  });

  var orbitControl = new OrbitControl(currentCamera, canvas);

  function render() {
    orbitControl.update();
    webgl.render(scene, currentCamera);
  }

  canvas.addEventListener("mousemove", render);
  canvas.addEventListener("mousedown", render);
  canvas.addEventListener("mouseup", render);
  canvas.addEventListener("wheel", render);

  render();
}
