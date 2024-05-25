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
import { ArticulatedModel } from "../primitives/ArticulatedModel";
import { Geometry } from "../geometry/Geometry";
import { PhongMaterial } from "../material/PhongMaterial";
import "../primitives/Deserialize";
import minecraft from "../models/articulated/minecraft";
import { bamboo, bambooColor } from "../models/hollow/bamboo"
import fish from "../models/articulated/fish";
import cat from "../models/articulated/cat";
import { DirectionalLight } from "../light/DirectionalLight";
import minecraftAnimation from "../models/animations/minecraftAnimation";
import {hollowCube, hollowCubeColor} from "../models/hollow/hollowCube"
import { OrbitControl } from "../camera/OrbitControl";
import { setupSceneGraph } from "../section/Board";

export function setupCanvas() {
  var canvas = document.querySelector("#fullview-canvas");
  var canvas2 = document.querySelector("#canvas-2");
  var gl = canvas.getContext("webgl");
  var gl2 = canvas2.getContext("webgl");
  if (!gl || !gl2) {
    return;
  }

  var angleXSlider = document.querySelector("#fullview-camera-anglex-slider");
  var angleYSlider = document.querySelector("#fullview-camera-angley-slider");
  var angleXSlider2 = document.querySelector("#camera-2-anglex-slider");
  var angleYSlider2 = document.querySelector("#camera-2-angley-slider");
 
  var angleXValue = document.querySelector("#fullview-camera-anglex-value");
  var angleYValue = document.querySelector("#fullview-camera-angley-value");
  var angleXValue2 = document.querySelector("#camera-2-anglex-value");
  var angleYValue2 = document.querySelector("#camera-2-angley-value");
  
  var obliqueValue = document.querySelector("#fullview-camera-oblique-value");
  var obliqueSlider = document.querySelector("#fullview-camera-oblique-slider");
  var obliqueValue2 = document.querySelector("#camera-2-oblique-value");
  var obliqueSlider2 = document.querySelector("#camera-2-oblique-slider");

  var radiusValue = document.querySelector("#fullview-camera-radius-value");
  var radiusSlider = document.querySelector("#fullview-camera-radius-slider");
  var radiusValue2 = document.querySelector("#camera-2-radius-value");
  var radiusSlider2 = document.querySelector("#camera-2-radius-slider");

  var addCameraButton1 = document.querySelector("#full-view-add-camera");
  var addCameraButton2 = document.querySelector("#add-camera-2");
  var cameraDropdown1 = document.getElementById("fullview-camera-type-dropdown")
  var cameraDropdown2 = document.getElementById("camera-2-type-dropdown")

  var resetViewButton = document.getElementById("reset-view");
  var resetViewButton2 = document.getElementById("reset-camera-2-view");
  var selectCamera = document.getElementById("fullview-camera-dropdown");
  var selectCamera2 = document.getElementById("camera-2-dropdown");

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

  var translateObjXSlider = document.querySelector("#fullview-object-translatex-slider");
  var translateObjYSlider = document.querySelector("#fullview-object-translatey-slider");
  var translateObjZSlider = document.querySelector("#fullview-object-translatez-slider");
  var translateObjXValue = document.querySelector("#fullview-object-translatex-value");
  var translateObjYValue = document.querySelector("#fullview-object-translatey-value");
  var translateObjZValue = document.querySelector("#fullview-object-translatez-value");

  // Whole Object Transformation
  var angleObjectXSlider = document.querySelector("#partview-object-anglex-slider");
  var angleObjectYSlider = document.querySelector("#partview-object-angley-slider");
  var angleObjectZSlider = document.querySelector("#partview-object-anglez-slider");
  var angleObjectXValue = document.querySelector("#partview-object-anglex-value");
  var angleObjectYValue = document.querySelector("#partview-object-angley-value");
  var angleObjectZValue = document.querySelector("#partview-object-anglez-value");

  var scaleXSlider = document.querySelector("#partview-object-scalex-slider");
  var scaleYSlider = document.querySelector("#partview-object-scaley-slider");
  var scaleZSlider = document.querySelector("#partview-object-scalez-slider");
  var scaleXValue = document.querySelector("#partview-object-scalex-value");
  var scaleYValue = document.querySelector("#partview-object-scaley-value");
  var scaleZValue = document.querySelector("#partview-object-scalez-value");

  var translateXSlider = document.querySelector("#partview-object-translatex-slider");
  var translateYSlider = document.querySelector("#partview-object-translatey-slider");
  var translateZSlider = document.querySelector("#partview-object-translatez-slider");
  var translateXValue = document.querySelector("#partview-object-translatex-value");
  var translateYValue = document.querySelector("#partview-object-translatey-value");
  var translateZValue = document.querySelector("#partview-object-translatez-value");

  var obliqueContainer = document.querySelector("#fullview-camera-oblique-angle");
  var obliqueContainer2 = document.querySelector("#camera-2-oblique-angle");
  

  var cameras = [new PerspectiveCamera(gl, 60, 0, 200, 1, 2000)];
  var cameras2 = [new PerspectiveCamera(gl2, 60, 0, 200, 1, 2000)];
  var currentCameraIdx = 0;
  var currentCamera2Idx = 0;

  var webgl = new WebGL(gl);
  var webgl2 = new WebGL(gl2);
  var currentCamera = setupCamera(1);
  var currentCamera2 = setupCamera(2);
  var animation = minecraftAnimation;
  let currentFrame = 1;

  var scene = new Scene();
  // var geometry = new Geometry(hollowCube, hollowCubeColor);
  // var material = new PhongMaterial("Phong")
  // var mesh = new Mesh(geometry, material);

  const model = ArticulatedModel.fromModel(minecraft);
  model.scale.mul(40);

  globalThis.app = {
    model,
    scene,
    currentCamera,
    currentCamera2,
    webgl,
    webgl2
  };

  const light = new DirectionalLight(new Color(1, 1, 1, 1), {}, model);
  app.scene.add(light);
  app.scene.add(model);

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

  const axisMapping = {
    x: 0,
    y: 1,
    z: 2
  };

  Object.keys(rotationSliders).forEach(function (axis) {
    rotationSliders[axis].addEventListener("input", function (event) {
      var angle = parseFloat(event.target.value);
      var angleRadian = Math.radians(angle);
      rotationValues[axis].textContent = angle;
      app.comp.rotation[axis] = angleRadian;
      if (!animation.frames[currentFrame - 1][app.comp.name].rotation) {
        animation.frames[currentFrame - 1][app.comp.name].rotation = [0, 0, 0];
      }
      animation.frames[currentFrame - 1][app.comp.name].rotation[axisMapping[axis]] = angleRadian;
      render();
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
      app.comp.position[axis] = translation;
      if (!animation.frames[currentFrame - 1][app.comp.name].position) {
        animation.frames[currentFrame - 1][app.comp.name].position = [0, 0, 0];
      }
      animation.frames[currentFrame - 1][app.comp.name].position[axisMapping[axis]] = translation;
      render();
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
      app.comp.scale[axis] = scale;
      if (!animation.frames[currentFrame - 1][app.comp.name].scale) {
        animation.frames[currentFrame - 1][app.comp.name].scale = [1, 1, 1];
      }
      animation.frames[currentFrame - 1][app.comp.name].scale[axisMapping[axis]] = scale;
      render();
    });
  });

  var rotationObjectSliders = {
    x: angleObjectXSlider,
    y: angleObjectYSlider,
    z: angleObjectZSlider
  };

  var rotationObjectValues = {
    x: angleObjectXValue,
    y: angleObjectYValue,
    z: angleObjectZValue
  };

  Object.keys(rotationObjectSliders).forEach(function (axis) {
    rotationObjectSliders[axis].addEventListener("input", function (event) {
      var angle = parseFloat(event.target.value);
      var angleRadian = Math.radians(angle);
      rotationObjectValues[axis].textContent = angle;
      app.model.children[0].rotation[axis] = angleRadian;
      if (!animation.frames[currentFrame - 1][app.model.children[0].name].rotation) {
        animation.frames[currentFrame - 1][app.model.children[0].name].rotation = [0, 0, 0];
      }
      animation.frames[currentFrame - 1][app.model.children[0].name].rotation[axisMapping[axis]] = angleRadian;
      render();
    });
  });

  var translationObjectSliders = {
    x: translateXSlider,
    y: translateYSlider,
    z: translateZSlider
  };

  var translationObjectValues = {
    x: translateXValue,
    y: translateYValue,
    z: translateZValue
  };

  Object.keys(translationObjectSliders).forEach(function (axis) {
    translationObjectSliders[axis].addEventListener("input", function (event) {
      var translation = parseFloat(event.target.value);
      translationObjectValues[axis].textContent = translation;
      app.model.children[0].position[axis] = translation;
      if (!animation.frames[currentFrame - 1][app.model.children[0].name].position) {
        animation.frames[currentFrame - 1][app.model.children[0].name].position = [0, 0, 0];
      }
      animation.frames[currentFrame - 1][app.model.children[0].name].position[axisMapping[axis]] = translation;
      console.log(animation.frames[currentFrame - 1]);
      render();
    });
  });

  var scaleObjectSliders = {
    x: scaleXSlider,
    y: scaleYSlider,
    z: scaleZSlider
  };

  var scaleObjectValues = {
    x: scaleXValue,
    y: scaleYValue,
    z: scaleZValue
  };

  Object.keys(scaleObjectSliders).forEach(function (axis) {
    scaleObjectSliders[axis].addEventListener("input", function (event) {
      var scale = parseFloat(event.target.value);
      scaleObjectValues[axis].textContent = scale;
      app.model.children[0].scale[axis] = scale;
      if (!animation.frames[currentFrame - 1][app.model.children[0].name].scale) {
        animation.frames[currentFrame - 1][app.model.children[0].name].scale = [1, 1, 1];
      }
      animation.frames[currentFrame - 1][app.model.children[0].name].scale[axisMapping[axis]] = scale;
      render();
    });
  });

  var orbitControl1 = new OrbitControl(webgl, canvas, app.currentCamera, scene, angleXSlider, angleYSlider, angleXValue, angleYValue, obliqueSlider, obliqueValue, radiusSlider, radiusValue, resetViewButton);
  var orbitControl2 = new OrbitControl(webgl2, canvas2, app.currentCamera2, scene, angleXSlider2, angleYSlider2, angleXValue2, angleYValue2, obliqueSlider2, obliqueValue2, radiusSlider2, radiusValue2, resetViewButton2);


  addCameraButton1
    .addEventListener("click", function () {
      var option = document.createElement("option");
      option.text = "Camera " + (selectCamera.options.length + 1);
      option.value = selectCamera.options.length + 1;
      selectCamera.add(option);
      selectCamera.selectedIndex = selectCamera.options.length - 1;
      cameras.push(new PerspectiveCamera(gl, 60, 0, 200, 1, 2000));
      currentCameraIdx = selectCamera.options.length - 1;
      app.currentCamera = setupCamera(1);
      orbitControl1.changeCamera(app.currentCamera);
      render();
    });

  addCameraButton2
    .addEventListener("click", function () {
      console.log("MASUKK");
      var option = document.createElement("option");
      option.text = "Camera " + (selectCamera2.options.length + 1);
      option.value = selectCamera2.options.length + 1;
      selectCamera2.add(option);
      selectCamera2.selectedIndex = selectCamera2.options.length - 1;
      cameras2.push(new PerspectiveCamera(gl, 60, 0, 200, 1, 2000));
      currentCamera2Idx = selectCamera2.options.length - 1;
      app.currentCamera2 = setupCamera(2);
      orbitControl2.changeCamera(app.currentCamera2);
      webgl2.render(app.scene, app.currentCamera2);
    });

  selectCamera.addEventListener("change", function () {
    currentCameraIdx = this.value - 1;
    app.currentCamera = setupCamera(1);
    orbitControl1.changeCamera(app.currentCamera);
    render();
  });

  selectCamera2.addEventListener("change", function () {
    currentCamera2Idx = this.value - 1;
    app.currentCamera2 = setupCamera(2);
    orbitControl2.changeCamera(app.currentCamera2);
    render();
  });

  cameraDropdown1
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
      app.currentCamera = setupCamera(1);
      orbitControl1.changeCamera(app.currentCamera);
      render();
    });

    cameraDropdown2
    .addEventListener("change", function () {
      if (this.value == 2) {
        cameras2[currentCamera2Idx] = new OrthographicCamera(
          gl2,
          -10,
          10,
          -10,
          10,
          0.1,
          100
        );
      } else if (this.value == 1) {
        cameras2[currentCamera2Idx] = new ObliqueCamera(
          gl2,
          -10,
          10,
          -10,
          10,
          0.1,
          100
        );
      } else if (this.value == 3) {
        cameras2[currentCamera2Idx] = new PerspectiveCamera(
          gl2,
          60,
          0,
          200,
          1,
          2000
        );
      }
      app.currentCamera2 = setupCamera(2);
      orbitControl2.changeCamera(app.currentCamera2);
      webgl2.render(app.scene, app.currentCamera2);
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
        app.scene = read;
        for (let child of app.scene.children) {
          if (child.type == "ArticulatedModel") {
            app.model = child;
            break;
          }
        }
        render()
        setupSceneGraph();
      };
    }
  });

  const saveModelButton = document.getElementById("save-model");
  saveModelButton.addEventListener("click", function () {
    const sceneJSON = app.scene.toJSON();
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
  
  function render() {
    app.webgl.render(app.scene, app.currentCamera);
    app.webgl2.render(app.scene, app.currentCamera2);
  }
  
  render();

  function setupCamera(mode) {
    var currentCameraToSet = mode == 1 ? currentCamera : currentCamera2;
    var camerasArr = mode == 1 ? cameras : cameras2;
    var currentCameraIdxToSet = mode == 1 ? currentCameraIdx : currentCamera2Idx;
    var obliqueContainerToSet = mode == 1 ? obliqueContainer : obliqueContainer2;
    var cameraTypeDropdown = mode == 1 ? cameraDropdown1 : cameraDropdown2;
    var obliqueValueToSet = mode == 1 ? obliqueValue : obliqueValue2;
    var radiusXValueToSet = mode == 1 ? radiusValue : radiusValue2;
    var angleXValueToSet = mode == 1 ? angleXValue : angleXValue2;
    var angleYValueToSet = mode == 1 ? angleYValue : angleYValue2;
    var obliqueSliderToSet = mode == 1 ? obliqueSlider : obliqueSlider2;
    var radiusXSliderToSet = mode == 1 ? radiusSlider : radiusSlider2;
    var angleXSliderToSet = mode == 1 ? angleXSlider : angleXSlider2;
    var angleYSliderToSet = mode == 1 ? angleYSlider : angleYSlider2;

    currentCameraToSet = camerasArr[currentCameraIdxToSet];
    var type = currentCameraToSet.type;
    if (type == "PerspectiveCamera") {
      cameraTypeDropdown.value = 3;
      obliqueContainerToSet.style.display = "none";
    } else if (type == "ObliqueCamera") {
      cameraTypeDropdown.value = 1;
      obliqueContainerToSet.style.display = "flex";
      obliqueValueToSet.textContent = parseInt(currentCameraToSet.theta * 180 / Math.PI);
      obliqueSliderToSet.value = parseInt(currentCameraToSet.theta * 180 / Math.PI);
    } else {
      cameraTypeDropdown.value = 2;
      obliqueContainerToSet.style.display = "none";
    }

    radiusXValueToSet.textContent = parseInt(currentCameraToSet.transform.translateZ);
    angleXValueToSet.textContent = parseInt(currentCameraToSet.transform.angleX * 180 / Math.PI);
    angleYValueToSet.textContent = parseInt(currentCameraToSet.transform.angleY * 180 / Math.PI);
    radiusXSliderToSet.value = parseInt(currentCameraToSet.transform.translateZ);
    angleXSliderToSet.value = parseInt(currentCameraToSet.transform.angleX * 180 / Math.PI);
    angleYSliderToSet.value = parseInt(currentCameraToSet.transform.angleY * 180 / Math.PI);

    return currentCameraToSet;
  }

  document.addEventListener('DOMContentLoaded', function () {
    let totalFrames = animation.frames.length;
    let isPlaying = false;
    let isReversing = false;
    let loop = false;
    let fps = 30;
    let playInterval;
    let animationRequestId;

    const frameSlider = document.getElementById('frameSlider');
    const frameDisplay = document.getElementById('frameDisplay');
    const fpsSlider = document.getElementById('fpsSlider');
    const fpsDisplay = document.getElementById('fpsDisplay');
    const playPauseButton = document.getElementById('play-pause');
    const reverseButton = document.getElementById('reverse');
    const loopButton = document.getElementById('loop');

    const currentFrameDisplay = document.getElementById('currentFrameDisplay');
    const addAfter = document.getElementById('addFrameAfter');
    const addEnd = document.getElementById('addFrameEnd');
    const delFrame = document.getElementById('deleteFrame');
    const moveToFirstFrame = document.getElementById('moveToFirstFrame');
    const moveToPrevFrame = document.getElementById('moveToPrevFrame');
    const moveToNextFrame = document.getElementById('moveToNextFrame');
    const moveToLastFrame = document.getElementById('moveToLastFrame');
    const saveAnimation = document.getElementById('saveAnimation');
    const loadAnimation = document.getElementById("loadAnimation");

    frameSlider.max = totalFrames;

    function updateDisplay() {
        frameSlider.value = currentFrame;
        frameDisplay.textContent = `${currentFrame}/${totalFrames}`;
        currentFrameDisplay.textContent = `${currentFrame}`;
    }

    function updateFPS() {
      fps = parseInt(fpsSlider.value);
      fpsDisplay.textContent = `${fps} FPS`;
    }

    function play() {
      if (!isPlaying) {
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        animate();
      }
    }

    function pause() {
      if (isPlaying) {
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        cancelAnimationFrame(animationRequestId);
      }
    }

    function togglePlayPause() {
      isPlaying ? pause() : play();
    }

    function nextFrame() {
        currentFrame = (currentFrame % totalFrames) + 1;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
        if (currentFrame === 1 && !loop) {
            pause();
        }
    }

    function previousFrame() {
        currentFrame = (currentFrame - 2 + totalFrames) % totalFrames + 1;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
        if (currentFrame === totalFrames && !loop) {
            pause();
        }
    }

    function firstFrame() {
        currentFrame = 1;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
    }

    function lastFrame() {
        currentFrame = totalFrames;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
    }

    function toggleLoop() {
      loop = !loop;
      loopButton.classList.toggle('active');
    }

    function toggleReverse() {
      isReversing = !isReversing;
      reverseButton.classList.toggle('active');
    }

    function interpolateFrames(frame1, frame2, t, easing) {
      const interpolatedFrame = {};

      for (const key in frame1) {
        if (Object.prototype.hasOwnProperty.call(frame1, key) && Object.prototype.hasOwnProperty.call(frame2, key)) {
          const value1 = frame1[key];
          const value2 = frame2[key];

          interpolatedFrame[key] = {};

          if (value1.position && value2.position) {
            const interpolatedPosition = value1.position.map((val, index) => easing(t) * (value2.position[index] - val) + val);
            interpolatedFrame[key].position = interpolatedPosition;
          }

          if (value1.rotation && value2.rotation) {
            const interpolatedRotation = value1.rotation.map((val, index) => easing(t) * (value2.rotation[index] - val) + val);
            interpolatedFrame[key].rotation = interpolatedRotation;
          }
        }
      }

      return interpolatedFrame;
    }
    const easingFunctions = {
      // Sine
      sineIn: (t) => 1 - Math.cos((t * Math.PI) / 2),
      sineOut: (t) => Math.sin((t * Math.PI) / 2),
      sineInOut: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

      // Quad
      quadIn: (t) => t * t,
      quadOut: (t) => 1 - (1 - t) * (1 - t),
      quadInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),

      // Cubic
      cubicIn: (t) => t * t * t,
      cubicOut: (t) => 1 - Math.pow(1 - t, 3),
      cubicInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),

      // Quart
      quartIn: (t) => t * t * t * t,
      quartOut: (t) => 1 - Math.pow(1 - t, 4),
      quartInOut: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),

      // Expo
      expoIn: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
      expoOut: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      expoInOut: (t) => (t < 0.5 ? Math.pow(2, 10 * (2 * t - 1)) / 2 : (2 - Math.pow(2, -10 * (2 * t - 1))) / 2),

      // Circ
      circIn: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
      circOut: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
      circInOut: (t) => (t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2),

      // Back
      backIn: (t) => t * t * (2.70158 * t - 1.70158),
      backOut: (t) => 1 - (1 - t) * (1 - t) * (2.70158 * (1 - t) + 1.70158),
      backInOut: (t) => (t < 0.5 ? Math.pow(2 * t, 2) * (7.189819 * t - 2.5949095) / 2 : (Math.pow(2 * t - 2, 2) * (3.5949095 - 2.5949095 * (2 * t - 1)) + 2) / 2),

      // Elastic
      elasticIn: (t) => (t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3))),
      elasticOut: (t) => (t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
      elasticInOut: (t) =>
        t === 0
          ? 0
          : t === 1
            ? 1
            : t < 0.5
              ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2
              : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * ((2 * Math.PI) / 4.5))) / 2 + 1,

      // Bounce
      bounceIn: (t) => 1 - easingFunctions.bounceOut(1 - t),
      bounceOut: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      },
      bounceInOut: (t) => (t < 0.5 ? easingFunctions.bounceIn(2 * t) / 2 : easingFunctions.bounceOut(2 * t - 1) / 2 + 0.5),
    };

    let dt = 0, lt = 0;

    function animate(ts) {
      const frameTime = 1000 / fps;

      // if (!ts) ts = 0;
      if (!ts) ts = performance.now(); // Inisialisasi ts dengan waktu saat ini jika tidak ada nilai yang diteruskan

      // ts = performance.now();
      if (isPlaying) {
        dt += (ts - lt) / frameTime;

        console.log("dt", dt)
        console.log("ts", ts)
        console.log("lt", lt)
        console.log("frameTime", frameTime)

        // animationRequestId = requestAnimationFrame(animate);
        // let elapsedFrames = Math.floor(performance.now() / frameTime);
        // if (isReversing) {
        //   elapsedFrames = totalFrames - elapsedFrames % totalFrames;
        //   currentFrame = elapsedFrames === 0 ? totalFrames - 1 : elapsedFrames - 1;
        // } else {
        //   currentFrame = (elapsedFrames % totalFrames);
        // }

        // const elapsedFrames = Math.floor(performance.now() / frameTime);
        // const frameIndex1 = elapsedFrames % totalFrames;
        // const frameIndex2 = (frameIndex1 + 1) % totalFrames;
        const frameIndex1 = currentFrame % totalFrames;
        const frameIndex2 = (currentFrame + 1) % totalFrames;

        // const t = (performance.now() % frameTime) / frameTime;
        const t = dt;

        console.log("currentFrame", currentFrame)
        console.log("fr1", frameIndex1)
        console.log("fr2", frameIndex2)

        const frame1 = animation.frames[frameIndex1];
        const frame2 = animation.frames[frameIndex2];
        console.log("fram1", frame1)
        console.log("fram2", frame2)

        const easingFunction = easingFunctions['quadInOut'];
        let interpolatedFrame;
        if (isReversing) {
          interpolatedFrame = interpolateFrames(frame2, frame1, t, easingFunction);
        } else {
          interpolatedFrame = interpolateFrames(frame1, frame2, t, easingFunction);
        }
        // console.log("ifr", interpolatedFrame.RArmL)

        // updateModelAnimation(currentFrame);
        lt = ts;

        updateModelAnimation(-1, interpolatedFrame);

        if (dt >= 1) {
          const sf = Math.floor(dt / 1);
          // dt = 0;
          dt = dt % 1;
          // if (isReversing) {
          //   currentFrame = (currentFrame - sf + totalFrames) % totalFrames;
          // } else {
          //   currentFrame = (currentFrame + sf) % totalFrames;
          // }

          if (isReversing) {
            if (currentFrame === 1) {
              currentFrame = totalFrames;
            } else {
              currentFrame = Math.max(1, currentFrame - sf);
              if (currentFrame === 1) {
                dt = 0.5;
              }
            }
          } else {
            if (currentFrame === totalFrames) {
              currentFrame = 1;
            } else {
              currentFrame = Math.min(currentFrame + sf, totalFrames);
              if (currentFrame === totalFrames) {
                dt = 1;
              }          
            }
          }
                
        }

        console.log("currentFrame", currentFrame)
        if (!loop && ((currentFrame === 1 && isReversing) || (currentFrame === totalFrames && !isReversing))) {
          if (isReversing) {
            currentFrame = totalFrames
          } else {
            currentFrame = 1
          }
          console.log("pause")
          pause();
        }
        updateDisplay();

      }
      requestAnimationFrame(animate);
    }
    animate();

    function addToNextFrame() {
      animation.frames.splice(currentFrame, 0, animation.frames[currentFrame - 1]);
      totalFrames++;
      currentFrame++;
      frameSlider.max = totalFrames;
      updateDisplay();
      updateModelAnimation(currentFrame - 1);
    }

    function addToLastFrame() {
      animation.frames.push(animation.frames[currentFrame - 1]);
      totalFrames++;
      currentFrame = totalFrames;
      frameSlider.max = totalFrames;
      updateDisplay();
      updateModelAnimation(currentFrame - 1);
    }

    function deleteFrame() {
      animation.frames.splice(currentFrame - 1, 1);
      totalFrames--;
      currentFrame = currentFrame < totalFrames ? currentFrame : totalFrames;
      frameSlider.max = totalFrames;
      updateDisplay();
      updateModelAnimation(currentFrame - 1);
    }

    function moveNextFrame() {
      if (currentFrame != totalFrames) {
        animation.frames.splice(currentFrame - 1, 2, animation.frames[currentFrame], animation.frames[currentFrame - 1]);
        currentFrame++;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
      }
    }

    function movePrevFrame() {
      if (currentFrame != 1) {
        animation.frames.splice(currentFrame - 2, 2, animation.frames[currentFrame - 1], animation.frames[currentFrame - 2]);
        currentFrame--;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
      }
    }

    function moveFirstFrame () {
      if (currentFrame != 1) {
        let frame = animation.frames[currentFrame - 1];
        animation.frames.splice(currentFrame - 1, 1);
        animation.frames.unshift(frame);
        currentFrame = 1;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
      }
    }

    function moveLastFrame () {
      if (currentFrame != totalFrames) {
        let frame = animation.frames[currentFrame - 1];
        animation.frames.splice(currentFrame - 1, 1);
        animation.frames.push(frame);
        currentFrame = totalFrames;
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
      }
    }

    function saveAnim() {
      const animationJsString = convertAnimationToJsString(animation);
      const dataStr = "data:text/javascript;charset=utf-8," + encodeURIComponent(animationJsString);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "animation.js");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

    document.getElementById('first').addEventListener('click', firstFrame);
    document.getElementById('previous').addEventListener('click', previousFrame);
    playPauseButton.addEventListener('click', togglePlayPause);
    document.getElementById('next').addEventListener('click', nextFrame);
    document.getElementById('last').addEventListener('click', lastFrame);
    loopButton.addEventListener('click', toggleLoop);
    reverseButton.addEventListener('click', toggleReverse);
    addAfter.addEventListener('click', addToNextFrame);
    addEnd.addEventListener('click', addToLastFrame);
    delFrame.addEventListener('click', deleteFrame);
    moveToPrevFrame.addEventListener('click', movePrevFrame);
    moveToNextFrame.addEventListener('click', moveNextFrame);
    moveToFirstFrame.addEventListener('click', moveFirstFrame);
    moveToLastFrame.addEventListener('click', moveLastFrame);
    saveAnimation.addEventListener('click', saveAnim);
    loadAnimation.addEventListener('click', function() {
      document.getElementById('fileInput').click();
    });

    document
      .getElementById("fileInput")
      .addEventListener("change", async function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async function (e) {
            const scriptContent = e.target.result;
            const blob = new Blob([scriptContent], {
              type: "application/javascript",
            });
            const url = URL.createObjectURL(blob);
            try {
              const module = await import(url);
              const anim = module.default;
              animation = anim;
              totalFrames = animation.frames.length;
              updateDisplay();
            } catch (error) {
              console.error("Failed to load script content:", error);
            } finally {
              URL.revokeObjectURL(url);
            }
          };
          reader.onerror = function (e) {
            console.error("Failed to read file:", e);
          };
          reader.readAsText(file);
        } else {
          console.error("No file selected.");
        }
      });

    frameSlider.addEventListener('input', function () {
        currentFrame = parseInt(this.value);
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
    });

    fpsSlider.addEventListener('input', updateFPS);
    playPauseButton.addEventListener('click', togglePlayPause);
    reverseButton.addEventListener('click', toggleReverse);
    loopButton.addEventListener('click', toggleLoop);

    updateFPS();
    updateDisplay();
    // updateModelAnimation(currentFrame);
    function updateModelAnimation(frameNum, frame=null) {
      if (frameNum !== -1) {
        model.applyFrame(animation.frames[frameNum]);
      } else {
        model.applyFrame(frame);
      }
      render();
    }

    function convertAnimationToJsString(animation) {
      let jsString = "export default ";    
      jsString += JSON.stringify(animation, null, 4).replace(/"([^"]+)":/g, '$1:');
    
      return jsString;
    }
  });
}

export function selectComponent(compName) {
  const materialName = document.getElementById("material-name");
  const materialAmbient = document.getElementById("material-ambient");
  const materialDiffuse = document.getElementById("material-diffuse");
  const materialSpecular = document.getElementById("material-specular");
  const materialShininess = document.getElementById("material-shininess");

  // Function to remove existing event listeners
  function removeEventListeners() {
    materialShininess.removeEventListener("change", handleShininessChange);
    materialAmbient.removeEventListener("change", handleAmbientChange);
    materialDiffuse.removeEventListener("change", handleDiffuseChange);
    materialSpecular.removeEventListener("change", handleSpecularChange);
  }

  // Event handler functions
  function handleShininessChange(e) {
    app.comp.material.shininess = Number(e.target.value);
    render()
  }

  function handleAmbientChange(e) {
    app.comp.material.ambient = e.target.value;
    render()
  }

  function handleDiffuseChange(e) {
    app.comp.material.diffuse = e.target.value;
    render()
  }

  function handleSpecularChange(e) {
    app.comp.material.specular = e.target.value;
    render()
  }

  app.comp = ArticulatedModel.findChildByNameRecursive(app.model, compName);

  if (compName.startsWith("P") && app.comp && app.comp.material) {
    materialName.value = app.comp.material.name;
    materialShininess.value = app.comp.material.shininess;
    materialAmbient.value = app.comp.material.ambient.hex;
    materialDiffuse.value = app.comp.material.diffuse.hex;
    materialSpecular.value = app.comp.material.specular.hex;

    // Remove existing event listeners
    removeEventListeners();

    // Add new event listeners
    materialShininess.addEventListener("change", handleShininessChange);
    materialAmbient.addEventListener("change", handleAmbientChange);
    materialDiffuse.addEventListener("change", handleDiffuseChange);
    materialSpecular.addEventListener("change", handleSpecularChange);
  }
}
