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

export function setupCanvas(element, angleSlider, radiusSlider) {
  var canvas = element;
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var webgl = new WebGL(gl);
  webgl.setupScene(vertices, colors);

  var currentCamera = new PerspectiveCamera(gl, 60, 0, 200, 1, 2000);
  // var currentCamera = new OrthographicCamera(gl, -10, 10, -10, 10, 0.1, 100);
  // var currentCamera = new ObliqueCamera(gl, -10, 10, -10, 10, 0.1, 100);
  webgl.render(currentCamera);

  angleSlider.addEventListener("input", function (event) {
    currentCamera.cameraAngleDeg = event.target.value;
    webgl.render(currentCamera);
  });

  radiusSlider.addEventListener("input", function (event) {
    currentCamera.radiusDeg = parseFloat(event.target.value);
    webgl.render(currentCamera);
  });
}
