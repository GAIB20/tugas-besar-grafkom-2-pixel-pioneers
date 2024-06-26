import { PerspectiveCamera } from "../camera/PerspectiveCamera";
import { OrthographicCamera } from "../camera/OrthographicCamera";
import { Matrix4 } from "../math/Matrix4";
import { WebGL } from "../primitives/WebGL";
import { rpVertices, rpColors } from "../models/hollow/rectanglePipe";
import { ObliqueCamera } from "../camera/ObliqueCamera";
import { pyramid, pyramidColor } from "../models/hollow/pyramid";
import { Component } from "../primitives/Component";
import { Scene } from "../primitives/Scene";
import { BoxGeometry } from "../geometry/BoxGeometry";
import { BufferGeometry } from "../geometry/BufferGeometry";
import { BasicMaterial } from "../material/BasicMaterial";
import { Mesh } from "../primitives/Mesh";
import { Color } from "../primitives/Color";
import { Geometry } from "../geometry/Geometry";
import { PhongMaterial } from "../material/PhongMaterial";
import "../primitives/Deserialize";
// import minecraft from "../models/articulated/minecraft";
import fish from "../models/articulated/fish";
import { ArticulatedModel } from "../primitives/ArticulatedModel";
import { DirectionalLight } from "../light/DirectionalLight";

export function setupCanvasPartView(element, angleSlider, radiusSlider) {
  var canvas = document.querySelector("#partview-canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var angleXSlider = document.querySelector("#partview-camera-anglex-slider");
  var angleYSlider = document.querySelector("#partview-camera-angley-slider");
  var angleZSlider = document.querySelector("#partview-camera-anglez-slider");
  var angleXValue = document.querySelector("#partview-camera-anglex-value");
  var angleYValue = document.querySelector("#partview-camera-angley-value");
  var angleZValue = document.querySelector("#partview-camera-anglez-value");
  var obliqueValue = document.querySelector("#partview-camera-oblique-value");
  var obliqueSlider = document.querySelector("#partview-camera-oblique-slider");
  var radiusValue = document.querySelector("#partview-camera-radius-value");
  var radiusSlider = document.querySelector("#partview-camera-radius-slider");

  // Object inspector
  var angleObjXSlider = document.querySelector("#partview-object-anglex-slider");
  var angleObjYSlider = document.querySelector("#partview-object-angley-slider");
  var angleObjZSlider = document.querySelector("#partview-object-anglez-slider");
  var angleObjXValue = document.querySelector("#partview-object-anglex-value");
  var angleObjYValue = document.querySelector("#partview-object-angley-value");
  var angleObjZValue = document.querySelector("#partview-object-anglez-value");

  var scaleObjXSlider = document.querySelector("#partview-object-scalex-slider");
  var scaleObjYSlider = document.querySelector("#partview-object-scaley-slider");
  var scaleObjZSlider = document.querySelector("#partview-object-scalez-slider");
  var scaleObjXValue = document.querySelector("#partview-object-scalex-value");
  var scaleObjYValue = document.querySelector("#partview-object-scaley-value");
  var scaleObjZValue = document.querySelector("#partview-object-scalez-value");

  var translateObjXSlider = document.querySelector(
    "#partview-object-translatex-slider"
  );
  var translateObjYSlider = document.querySelector(
    "#partview-object-translatey-slider"
  );
  var translateObjZSlider = document.querySelector(
    "#partview-object-translatez-slider"
  );
  var translateObjXValue = document.querySelector(
    "#partview-object-translatex-value"
  );
  var translateObjYValue = document.querySelector(
    "#partview-object-translatey-value"
  );
  var translateObjZValue = document.querySelector(
    "#partview-object-translatez-value"
  );

  var angleContainer = document.querySelector("#partview-camera-angle");
  var obliqueContainer = document.querySelector(
    "#partview-camera-oblique-angle"
  );
  var radiusContainer = document.querySelector("#partview-camera-radius");
  var selectCamera = document.getElementById("partview-camera-dropdown");
  var resetViewButton = document.getElementById("reset-part-view");

  var cameras = [new PerspectiveCamera(gl, 60, 0, 200, 1, 2000)];
  var currentCameraIdx = 0;

  var webgl = new WebGL(gl);
  var currentCamera = setupCamera();

  var scene = new Scene();
  var geometry = new Geometry(pyramid, pyramidColor);
  var material = new PhongMaterial("Phong");
  var mesh = new Mesh(geometry, material);

  const model = ArticulatedModel.fromModel(fish);
  model.scale.mul(40);
  var comp = model

  // export default model
  globalThis.partviewApp = {
    model,
    currentCamera,
    webgl,
    scene,
    comp
  }
  
  const light = new DirectionalLight(new Color(1, 1, 1, 1), {}, mesh);
  scene.add(light);
  scene.add(mesh);

  // Object TRS section
  // Fungsi untuk mengubah derajat menjadi radian
  Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
  };

  var rotationSliders = {
    x: angleObjXSlider,
    y: angleObjYSlider,
    z: angleObjZSlider
  };

  var rotationValues = {
    x: angleObjXValue,
    y: angleObjYValue,
    z: angleObjZValue
  };

  Object.keys(rotationSliders).forEach(function (axis) {
    rotationSliders[axis].addEventListener("input", function (event) {
      var angle = parseFloat(event.target.value);
      var angleRadian = Math.radians(angle);
      rotationValues[axis].textContent = angle;
      partviewApp.comp.rotation[axis] = angleRadian;
      webgl.render(scene, currentCamera);
    });
  });

  var translationSliders = {
    x: translateObjXSlider,
    y: translateObjYSlider,
    z: translateObjZSlider
  };

  var translationValues = {
    x: translateObjXValue,
    y: translateObjYValue,
    z: translateObjZValue
  };

  Object.keys(translationSliders).forEach(function (axis) {
    translationSliders[axis].addEventListener("input", function (event) {
      var translation = parseFloat(event.target.value);
      translationValues[axis].textContent = translation;
      partviewApp.comp.position[axis] = translation;
      webgl.render(scene, currentCamera);
    });
  });

  var scaleSliders = {
    x: scaleObjXSlider,
    y: scaleObjYSlider,
    z: scaleObjZSlider
  };

  var scaleValues = {
    x: scaleObjXValue,
    y: scaleObjYValue,
    z: scaleObjZValue
  };

  Object.keys(scaleSliders).forEach(function (axis) {
    scaleSliders[axis].addEventListener("input", function (event) {
      var scale = parseFloat(event.target.value);
      scaleValues[axis].textContent = scale;
      partviewApp.comp.scale[axis] = scale * 40;
      webgl.render(scene, currentCamera);
    });
  });

  // Camera TRS section
  angleXSlider.addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg("X", event.target.value);
    angleXValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  angleXSlider.addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg("X", event.target.value);
    angleXValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  angleYSlider.addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg("Y", event.target.value);
    angleYValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  angleZSlider.addEventListener("input", function (event) {
    currentCamera.setCameraAngleDeg("Z", event.target.value);
    angleZValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  radiusSlider.addEventListener("input", function (event) {
    currentCamera.setCameraTranslate("Z", event.target.value);
    radiusValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  obliqueSlider.addEventListener("input", function (event) {
    currentCamera.setObliqueAngleDeg(event.target.value);
    obliqueValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  resetViewButton.addEventListener("click", function (event) {
    currentCamera.setCameraAngleDeg("X", 0);
    angleXValue.textContent = 0;
    angleXSlider.value = 0;

    currentCamera.setCameraAngleDeg("Y", 0);
    angleYValue.textContent = 0;
    angleYSlider.value = 0;

    currentCamera.setCameraAngleDeg("Z", 0);
    angleZValue.textContent = 0;
    angleZSlider.value = 0;

    currentCamera.setCameraTranslate("Z", 300);
    radiusValue.textContent = 300;
    radiusSlider.value = 300;

    if (currentCamera instanceof ObliqueCamera) {
      currentCamera.setObliqueAngleDeg(30);
      obliqueValue.textContent = 30;
      obliqueSlider.value = 30;
    }

    webgl.render(scene, currentCamera);
  });

  document
    .getElementById("part-view-add-camera")
    .addEventListener("click", function () {

      var option = document.createElement("option");
      option.text = "Camera " + (selectCamera.options.length + 1);
      option.value = selectCamera.options.length + 1;
      selectCamera.add(option);
      selectCamera.selectedIndex = selectCamera.options.length - 1;
      cameras.push(new PerspectiveCamera(gl, 60, 0, 200, 1, 2000));
      currentCameraIdx = selectCamera.options.length - 1;
      currentCamera = setupCamera();
      webgl.render(scene, currentCamera);
    });

  selectCamera.addEventListener("change", function () {
    currentCameraIdx = this.value - 1;
    currentCamera = setupCamera();
    webgl.render(scene, currentCamera);
  });

  document
    .getElementById("partview-camera-type-dropdown")
    .addEventListener("change", function () {
      if (this.value == 2) {
        cameras[currentCameraIdx] = new OrthographicCamera(
          gl,
          -10,
          10,
          -10,
          10,
          0.1,
          100
        );
      } else if (this.value == 1) {
        cameras[currentCameraIdx] = new ObliqueCamera(
          gl,
          -10,
          10,
          -10,
          10,
          0.1,
          100
        );
      } else if (this.value == 3) {
        cameras[currentCameraIdx] = new PerspectiveCamera(
          gl,
          60,
          0,
          200,
          1,
          2000
        );
      }
      currentCamera = setupCamera();
      webgl.render(scene, currentCamera);
    });

  webgl.render(scene, currentCamera);

  function setupCamera() {
    currentCamera = cameras[currentCameraIdx];
    var type = currentCamera.type;
    if (type == "PerspectiveCamera") {
      document.getElementById("partview-camera-type-dropdown").value = 3;
      obliqueContainer.style.display = 'none';
    } else if (type == "ObliqueCamera") {
      document.getElementById("partview-camera-type-dropdown").value = 1;
      obliqueContainer.style.display = 'flex';
      obliqueValue.textContent = Math.round(
        (currentCamera.theta * 180) / Math.PI
      );
      obliqueSlider.value = Math.round((currentCamera.theta * 180) / Math.PI);
    } else {
      document.getElementById("partview-camera-type-dropdown").value = 2;
      obliqueContainer.style.display = 'none';
    }

    radiusValue.textContent = Math.round(currentCamera.transform.translateZ);
    angleXValue.textContent = Math.round(currentCamera.transform.angleX);
    angleYValue.textContent = Math.round(currentCamera.transform.angleY);
    angleZValue.textContent = Math.round(currentCamera.transform.angleZ);
    radiusSlider.value = Math.round(currentCamera.transform.translateZ);
    angleXSlider.value = Math.round(currentCamera.transform.angleX);
    angleYSlider.value = Math.round(currentCamera.transform.angleY);
    angleZSlider.value = Math.round(currentCamera.transform.angleZ);
    return currentCamera;
  }
}
