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
import { Geometry } from "../geometry/Geometry";
import { PhongMaterial } from "../material/PhongMaterial";
import "../primitives/Deserialize";
import model from "../models/articulated/minecraft";
// import model from "../models/articulated/fish";
// import animation from "../models/articulated/minecraftAnimation";

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
  var translateXSlider = document.querySelector("#fullview-camera-translatex-slider");
  var translateYSlider = document.querySelector("#fullview-camera-translatey-slider");
  var translateZSlider = document.querySelector("#fullview-camera-translatez-slider");
  var translateXValue = document.querySelector("#fullview-camera-translatex-value");
  var translateYValue = document.querySelector("#fullview-camera-translatey-value");
  var translateZValue = document.querySelector("#fullview-camera-translatez-value");
  var angleContainer = document.querySelector("#fullview-camera-angle");
  var obliqueContainer = document.querySelector("#fullview-camera-oblique-angle");
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

  globalThis.app = {
    model
  }
  
  scene.add(model);

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
      obliqueContainer.style.display = 'none';
      radiusContainer.style.display = 'none';
      translateContainer.style.display = 'block';
      translateXValue.textContent = Math.round(currentCamera.transform.translateX)
      translateYValue.textContent = Math.round(currentCamera.transform.translateY)
      translateZValue.textContent = Math.round(currentCamera.transform.translateZ)
      translateXSlider.value = Math.round(currentCamera.transform.translateX)
      translateYSlider.value = Math.round(currentCamera.transform.translateY)
      translateZSlider.value = Math.round(currentCamera.transform.translateZ)
      
    } else if (type == "ObliqueCamera") {
      document.getElementById("fullview-camera-type-dropdown").value = 1;
      obliqueContainer.style.display = 'block';
      radiusContainer.style.display = 'block';
      translateContainer.style.display = 'none';
    } else {
      document.getElementById("fullview-camera-type-dropdown").value = 2;
      obliqueContainer.style.display = 'none';
      radiusContainer.style.display = 'block';
      translateContainer.style.display = 'none';
    }

    angleXValue.textContent = Math.round(currentCamera.transform.angleX);
    angleYValue.textContent = Math.round(currentCamera.transform.angleY);
    angleZValue.textContent = Math.round(currentCamera.transform.angleZ);
    angleXSlider.value = Math.round(currentCamera.transform.angleX);
    angleYSlider.value = Math.round(currentCamera.transform.angleY);
    angleZSlider.value = Math.round(currentCamera.transform.angleZ);

    return currentCamera;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const totalFrames = animation.frames.length;
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

    frameSlider.max = totalFrames;

    function updateDisplay() {
        frameSlider.value = currentFrame;
        frameDisplay.textContent = `${currentFrame}/${totalFrames}`;
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
        updateModelAnimation(currentFrame);
        if (currentFrame === 1 && !loop) {
            pause();
        }
    }

    function previousFrame() {
        currentFrame = (currentFrame - 2 + totalFrames) % totalFrames + 1;
        updateDisplay();
        updateModelAnimation(currentFrame);
        if (currentFrame === totalFrames && !loop) {
            pause();
        }
    }

    function firstFrame() {
        currentFrame = 1;
        updateDisplay();
        updateModelAnimation(currentFrame);
    }

    function lastFrame() {
        currentFrame = totalFrames;
        updateDisplay();
        updateModelAnimation(currentFrame);
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

    document.getElementById('first').addEventListener('click', firstFrame);
    document.getElementById('previous').addEventListener('click', previousFrame);
    playPauseButton.addEventListener('click', togglePlayPause);
    document.getElementById('next').addEventListener('click', nextFrame);
    document.getElementById('last').addEventListener('click', lastFrame);
    loopButton.addEventListener('click', toggleLoop);
    reverseButton.addEventListener('click', toggleReverse);

    frameSlider.addEventListener('input', function () {
        currentFrame = parseInt(this.value);
        updateDisplay();
        updateModelAnimation(currentFrame);
    });

    fpsSlider.addEventListener('input', updateFPS);

    updateDisplay();
    updateFPS();

    function updateModelAnimation(frame) {
      // Logic to update model transformation based on the frame number
      // This is where you'd update the model based on your animation logic
      // For example:
      // model.setRotation(frame * 6); // Just an example
      console.log(animation.frames[frame]);
      model.applyFrame(animation.frames[frame]);
      webgl.render(scene, currentCamera);
    }
  });
}
