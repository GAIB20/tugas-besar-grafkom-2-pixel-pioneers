import { PerspectiveCamera } from "../camera/PerspectiveCamera";
import { Matrix4 } from "../math/matrix4";
// import { vertices, colors, verticesCube, colorsCube, verticesData } from "./testdata";
import { vertices, colors } from "./rectanglePipe";
import { WebGL } from "../primitives/webgl";

export function setupCanvas(element, angleSlider, radiusSlider) {
    var canvas = element;
    var gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }
  
    var webgl = new WebGL(gl);
    webgl.setupScene(vertices, colors);
    
    var currentCamera = new PerspectiveCamera(gl, 60, 0, 200, 1, 2000);  
    webgl.render(currentCamera);
  
    angleSlider.addEventListener('input', function(event) {
      currentCamera.cameraAngleDeg = event.target.value;
      webgl.render(currentCamera);
    });

    radiusSlider.addEventListener('input', function(event) {
      const newRadius = parseFloat(event.target.value);
      currentCamera.radius = newRadius;
      webgl.render(currentCamera);
    });
}


