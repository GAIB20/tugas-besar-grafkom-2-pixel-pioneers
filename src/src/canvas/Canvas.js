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
import { ArticulatedModel } from "../primitives/ArticulatedModel";
import { Geometry } from "../geometry/Geometry";
import { PhongMaterial } from "../material/PhongMaterial";
import "../primitives/Deserialize";
// import minecraft from "../models/articulated/minecraft";
import fish from "../models/articulated/fish";

export function setupCanvas(element, angleSlider, radiusSlider) {
  var canvas = document.querySelector("#fullview-canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var angleXSlider = document.querySelector("#fullview-camera-anglex-slider");
  var angleYSlider = document.querySelector("#fullview-camera-angley-slider");
  var angleZSlider = document.querySelector("#fullview-camera-anglez-slider");
  var angleXValue = document.querySelector("#fullview-camera-anglex-value");
  var angleYValue = document.querySelector("#fullview-camera-angley-value");
  var angleZValue = document.querySelector("#fullview-camera-anglez-value");
  var translateXSlider = document.querySelector(
    "#fullview-camera-translatex-slider"
  );
  var translateYSlider = document.querySelector(
    "#fullview-camera-translatey-slider"
  );
  var translateZSlider = document.querySelector(
    "#fullview-camera-translatez-slider"
  );
  var translateXValue = document.querySelector(
    "#fullview-camera-translatex-value"
  );
  var translateYValue = document.querySelector(
    "#fullview-camera-translatey-value"
  );
  var translateZValue = document.querySelector(
    "#fullview-camera-translatez-value"
  );

  // Object inspector
  var angleObjXSlider = document.querySelector("#fullview-object-anglex-slider");
  var angleObjYSlider = document.querySelector("#fullview-object-angley-slider");
  var angleObjZSlider = document.querySelector("#fullview-object-anglez-slider");
  var angleObjXValue = document.querySelector("#fullview-object-anglex-value");
  var angleObjYValue = document.querySelector("#fullview-object-angley-value");
  var angleObjZValue = document.querySelector("#fullview-object-anglez-value");

  var scaleObjXSlider = document.querySelector("#fullview-object-scalex-slider");
  var scaleObjYSlider = document.querySelector("#fullview-object-scaley-slider");
  var scaleObjZSlider = document.querySelector("#fullview-object-scalez-slider");
  var scaleObjXValue = document.querySelector("#fullview-object-scalex-value");
  var scaleObjYValue = document.querySelector("#fullview-object-scaley-value");
  var scaleObjZValue = document.querySelector("#fullview-object-scalez-value");

  var translateObjXSlider = document.querySelector(
    "#fullview-object-translatex-slider"
  );
  var translateObjYSlider = document.querySelector(
    "#fullview-object-translatey-slider"
  );
  var translateObjZSlider = document.querySelector(
    "#fullview-object-translatez-slider"
  );
  var translateObjXValue = document.querySelector(
    "#fullview-object-translatex-value"
  );
  var translateObjYValue = document.querySelector(
    "#fullview-object-translatey-value"
  );
  var translateObjZValue = document.querySelector(
    "#fullview-object-translatez-value"
  );

  var angleContainer = document.querySelector("#fullview-camera-angle");
  var obliqueContainer = document.querySelector(
    "#fullview-camera-oblique-angle"
  );
  var radiusContainer = document.querySelector("#fullview-camera-radius");
  var translateContainer = document.querySelector("#fullview-camera-translate");
  var selectCamera = document.getElementById("fullview-camera-dropdown");

  var cameras = [new PerspectiveCamera(gl, 60, 0, 200, 1, 2000)];
  var currentCameraIdx = 0;

  var webgl = new WebGL(gl);
  var currentCamera = setupCamera();
  // var currentCamera = new OrthographicCamera(gl, -10, 10, -10, 10, 0.1, 100);
  // var currentCamera = new ObliqueCamera(gl, -10, 10, -10, 10, 0.1, 100);

  var scene = new Scene();
  var geometry = new Geometry(pyramid, pyramidColor);
  var material = new PhongMaterial("Phong");
  var mesh = new Mesh(geometry, material);

  const model = ArticulatedModel.fromModel(fish);
  model.scale.mul(40);

  globalThis.app = {
    model,
  };

  scene.add(model);

  // scene.remove(model); // Menghapus semua objek dari scene
  // app.model = model.children[0].children.find(child => child.name === "RTopHead");
  // app.model.scale.mul(100)
  // console.log("mod2", app.model)
  // scene.add(app.model); // Menambahkan RTopHead ke scene
  // webgl.render(scene, currentCamera); // Me-render ulang scene dengan kamera yang aktual

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
      app.model.rotation[axis] = angleRadian;
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
      app.model.position[axis] = translation;
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
      app.model.scale[axis] = scale * 40;
      webgl.render(scene, currentCamera);
    });
  });

  // Camera TRS section
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

  translateXSlider.addEventListener("input", function (event) {
    currentCamera.setCameraTranslate("X", event.target.value);
    translateXValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  translateYSlider.addEventListener("input", function (event) {
    currentCamera.setCameraTranslate("Y", event.target.value);
    translateYValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  translateZSlider.addEventListener("input", function (event) {
    currentCamera.setCameraTranslate("Z", event.target.value);
    translateZValue.textContent = event.target.value;
    webgl.render(scene, currentCamera);
  });

  radiusSlider.addEventListener("input", function (event) {
    currentCamera.radiusDeg = parseFloat(event.target.value);
    webgl.render(scene, currentCamera);
  });

  document
    .getElementById("full-view-add-camera")
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
    .getElementById("fullview-camera-type-dropdown")
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

  const fileInput = document.getElementById("file-input");
  const loadModelButton = document.getElementById("load-model");

  loadModelButton.addEventListener("click", function () {
    fileInput.click(); // Trigger file selection
  });

  // Load Model Button Event Listener
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      document.getElementById("fileNameDisplay").textContent = `${file.name}`;
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (event) {
        const jsonModel = JSON.parse(event.target.result);
        const read = window.DeserializePrimitive(jsonModel);
        scene = read;
        webgl.render(scene, currentCamera);
      };
    }
  });

  const saveModelButton = document.getElementById("save-model");
  saveModelButton.addEventListener("click", function () {
    const sceneJSON = scene.toJSON();
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(sceneJSON));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "scene.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

  // var orbitControl = new OrbitControl(currentCamera, canvas);

  function render() {
    // orbitControl.update();
    webgl.render(scene, currentCamera);
  }

  // canvas.addEventListener("mousemove", render);
  // canvas.addEventListener("mousedown", render);
  // canvas.addEventListener("mouseup", render);
  // canvas.addEventListener("wheel", render);

  webgl.render(scene, currentCamera);

  function setupCamera() {
    currentCamera = cameras[currentCameraIdx];
    var type = currentCamera.type;
    if (type == "PerspectiveCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 3;
      obliqueContainer.style.display = "none";
      radiusContainer.style.display = "none";
      translateContainer.style.display = "block";
      translateXValue.textContent = Math.round(
        currentCamera.transform.translateX
      );
      translateYValue.textContent = Math.round(
        currentCamera.transform.translateY
      );
      translateZValue.textContent = Math.round(
        currentCamera.transform.translateZ
      );
      translateXSlider.value = Math.round(currentCamera.transform.translateX);
      translateYSlider.value = Math.round(currentCamera.transform.translateY);
      translateZSlider.value = Math.round(currentCamera.transform.translateZ);
    } else if (type == "ObliqueCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 1;
      obliqueContainer.style.display = "block";
      radiusContainer.style.display = "block";
      translateContainer.style.display = "none";
    } else {
      document.getElementById("fullview-camera-type-dropdown").value = 2;
      obliqueContainer.style.display = "none";
      radiusContainer.style.display = "block";
      translateContainer.style.display = "none";
    }

    angleXValue.textContent = Math.round(currentCamera.transform.angleX);
    angleYValue.textContent = Math.round(currentCamera.transform.angleY);
    angleZValue.textContent = Math.round(currentCamera.transform.angleZ);
    angleXSlider.value = Math.round(currentCamera.transform.angleX);
    angleYSlider.value = Math.round(currentCamera.transform.angleY);
    angleZSlider.value = Math.round(currentCamera.transform.angleZ);

    return currentCamera;
  }
}
