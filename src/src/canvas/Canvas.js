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
import minecraft from "../models/articulated/minecraft";
import { bamboo, bambooColor } from "../models/hollow/bamboo"
import fish from "../models/articulated/fish";
import cat from "../models/articulated/cat";
import animation from "../models/articulated/minecraftAnimation";

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
  var obliqueValue = document.querySelector("#fullview-camera-oblique-value");
  var obliqueSlider = document.querySelector("#fullview-camera-oblique-slider");
  var radiusValue = document.querySelector("#fullview-camera-radius-value");
  var radiusSlider = document.querySelector("#fullview-camera-radius-slider");

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
  var geometry = new Geometry(bamboo, bambooColor);
  var material = new PhongMaterial("Phong");
  var mesh = new Mesh(geometry, material);

  const model = ArticulatedModel.fromModel(cat);
  model.scale.mul(40);

  globalThis.app = {
    model,
  };

  scene.add(model);


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
    } else if (type == "ObliqueCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 1;
      obliqueContainer.style.display = "flex";
      obliqueValue.textContent = Math.round(currentCamera.theta * 180 / Math.PI);
      obliqueSlider.value = Math.round(currentCamera.theta * 180 / Math.PI);
    } else {
      document.getElementById("fullview-camera-type-dropdown").value = 2;
      obliqueContainer.style.display = "none";
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

  document.addEventListener('DOMContentLoaded', function () {
    let totalFrames = animation.frames.length;
    let currentFrame = 1;
    let isPlaying = false;
    let isReversing = false;
    let loop = false;
    let fps = 30;
    let playInterval;

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

    frameSlider.max = totalFrames;

    function updateDisplay() {
        frameSlider.value = currentFrame;
        frameDisplay.textContent = `${currentFrame}/${totalFrames}`;
        currentFrameDisplay.textContent = `${currentFrame}`;
    }

    function updateFPS() {
        fps = parseInt(fpsSlider.value);
        fpsDisplay.textContent = `${fps} FPS`;
        if (isPlaying) {
            clearInterval(playInterval);
            playInterval = setInterval(isReversing ? previousFrame : nextFrame, 1000 / fps);
        }
    }

    function play() {
        if (!isPlaying) {
            isPlaying = true;
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            playInterval = setInterval(isReversing ? previousFrame : nextFrame, 1000 / fps);
        }
    }

    function pause() {
        if (isPlaying) {
            isPlaying = false;
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(playInterval);
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
        if (isPlaying) {
            clearInterval(playInterval);
            playInterval = setInterval(isReversing ? previousFrame : nextFrame, 1000 / fps);
        }
    }

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

    frameSlider.addEventListener('input', function () {
        currentFrame = parseInt(this.value);
        updateDisplay();
        updateModelAnimation(currentFrame - 1);
    });

    fpsSlider.addEventListener('input', updateFPS);

    updateDisplay();
    updateFPS();

    function updateModelAnimation(frame) {
      console.log('frame' + frame);
      console.log(animation.frames[frame]);
      model.applyFrame(animation.frames[frame]);
      webgl.render(scene, currentCamera);
    }
  });
}
