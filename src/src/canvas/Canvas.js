import { PerspectiveCamera } from "../camera/PerspectiveCamera";
import { OrthographicCamera } from "../camera/OrthographicCamera";
import { Matrix4 } from "../math/Matrix4";
import {
  vertices,
  colors,
  verticesCube,
  colorsCube,
  verticesData,
} from "./testdata";
import { WebGL } from "../primitives/WebGL";
import { rpVertices, rpColors } from "./rectanglePipe";
import { ObliqueCamera } from "../camera/ObliqueCamera";
import { pyramid, pyramidColor } from "./pyramid";
import { OrbitControl } from "../camera/OrbitControl";
import { Component } from "../primitives/Component";
import { Scene } from "../primitives/Scene";
import { BoxGeometry } from "../geometry/BoxGeometry";
import { BufferGeometry } from "../geometry/BufferGeometry";
import { BasicMaterial } from "../material/BasicMaterial";
import { Mesh } from "../primitives/Mesh";
import { Color } from "../primitives/Color";

export function setupCanvas(element, angleSlider, radiusSlider) {
  var canvas = document.querySelector("#fullview-canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var cameras = [new PerspectiveCamera(gl, 60, 0, 200, 1, 2000)]
  var currentCameraIdx = 0;

  var webgl = new WebGL(gl);
  var currentCamera = new PerspectiveCamera(gl, 60, 0, 200, 1, 2000);
  // var currentCamera = new OrthographicCamera(gl, -10, 10, -10, 10, 0.1, 100);
  // var currentCamera = new ObliqueCamera(gl, -10, 10, -10, 10, 0.1, 100);

  // Define default component
  var scene = new Scene();

  // Define geometry
  var geometry = new BoxGeometry(100, 100, 100);

  // Define material
  var material = new BasicMaterial("Basic", new Color(1, 0, 0, 1));

  // Define mesh
  var mesh = new Mesh(geometry, material);

  scene.add(mesh);

  webgl.render(scene, currentCamera);

  document.querySelector("#fullview-camera-anglex-slider").addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg('X', event.target.value);
    console.log('x', event.target.value);
    webgl.render(scene, currentCamera);
  });

  document.querySelector("#fullview-camera-angley-slider").addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg('Y', event.target.value);
    webgl.render(scene, currentCamera);
  });

  document.querySelector("#fullview-camera-anglez-slider").addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg('Z', event.target.value);
    console.log('z', event.target.value);
    webgl.render(scene, currentCamera);
  });

  radiusSlider.addEventListener("input", function (event) {
    currentCamera.radiusDeg = parseFloat(event.target.value);
    webgl.render(scene, currentCamera);
  });

  document.getElementById("full-view-add-camera").addEventListener("click", function() {
    var select = document.getElementById("fullview-camera-dropdown");
    var option = document.createElement("option");
    option.text = "Camera " + (select.options.length + 1);
    option.value = select.options.length + 1;
    select.add(option);
    select.selectedIndex = select.options.length - 1;
    cameras.push(new PerspectiveCamera(gl, 60, 0, 200, 1, 2000))
    currentCameraIdx = select.options.length - 1;
    currentCamera = cameras[currentCameraIdx];
    document.getElementById("fullview-camera-type-dropdown").value = 3;
    console.log(currentCamera);
    console.log(cameras);
    webgl.render(scene, currentCamera);
  });

  document.getElementById("fullview-camera-dropdown").addEventListener("change", function() {
    currentCameraIdx = this.value-1;
    currentCamera = cameras[currentCameraIdx];
    var type = currentCamera.type
    if (type == "PerspectiveCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 3;
    } else if (type == "ObliqueCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 1;
    } else {
      document.getElementById("fullview-camera-type-dropdown").value = 2;
    }
    webgl.render(scene, currentCamera);
  });

  document.getElementById("fullview-camera-type-dropdown").addEventListener("change", function() {
    if (this.value == 2) {
      cameras[currentCameraIdx] = new OrthographicCamera(gl, -10, 10, -10, 10, 0.1, 100);
    } else if (this.value == 1) {
      cameras[currentCameraIdx] = new ObliqueCamera(gl, -10, 10, -10, 10, 0.1, 100);;
    } else if (this.value == 3) {
      cameras[currentCameraIdx] = new PerspectiveCamera(gl, 60, 0, 200, 1, 2000);
    }
    currentCamera = cameras[currentCameraIdx];
    webgl.render(scene, currentCamera);
  });

  var orbitControl = new OrbitControl(currentCamera, canvas, webgl);
}
