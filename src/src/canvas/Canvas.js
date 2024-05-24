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

  const model = ArticulatedModel.fromModel(minecraft);
  model.scale.mul(40);

  globalThis.app = {
    model,
  };

  // scene.add(mesh);
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
    const totalFrames = animation.frames.length;
    let currentFrame = 0;
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

    frameSlider.max = totalFrames;

    function updateDisplay() {
      frameSlider.value = currentFrame + 1;
      frameDisplay.textContent = `${currentFrame + 1}/${totalFrames}`;
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
      currentFrame = ((currentFrame + 1) % totalFrames);
      updateDisplay();
      updateModelAnimation(currentFrame);
      if (currentFrame === 0 && !loop) {
        pause();
      }
    }

    function previousFrame() {
      currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
      updateDisplay();
      updateModelAnimation(currentFrame);
      if (currentFrame === totalFrames && !loop) {
        pause();
      }
    }

    function firstFrame() {
      currentFrame = 0;
      updateDisplay();
      updateModelAnimation(currentFrame);
    }

    function lastFrame() {
      currentFrame = totalFrames - 1;
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

      console.log("call", ts)
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
        const frameIndex1 = currentFrame;
        const frameIndex2 = (currentFrame + 1) % totalFrames;

        // const t = (performance.now() % frameTime) / frameTime;
        const t = dt;

        // console.log("t", t)
        // console.log("fr1", frameIndex1)
        // console.log("fr2", frameIndex2)

        const frame1 = animation.frames[frameIndex1];
        const frame2 = animation.frames[frameIndex2];
        // console.log("fram1", frame1)
        // console.log("fram2", frame2)

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

        updateModelAnimation(interpolatedFrame);

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
            if (currentFrame === 0) {
              currentFrame = totalFrames - 1;
            } else {
              currentFrame = Math.max(0, currentFrame - sf);
              if (currentFrame === 0) {
                dt = 0.5;
              }
            }
          } else {
            if (currentFrame === totalFrames - 1) {
              currentFrame = 0;
            } else {
              currentFrame = Math.min(currentFrame + sf, totalFrames - 1);
              if (currentFrame === totalFrames - 1) {
                dt = 1;
              }          
            }
          }
                
        }

        console.log("currentFrame", currentFrame)
        if (!loop && ((currentFrame === 0 && !isReversing) || (currentFrame === totalFrames - 1 && isReversing))) {
          if (isReversing) {
            currentFrame = totalFrames - 1
          } else {
            currentFrame = 0
          }
          console.log("pause")
          pause();
        }
        updateDisplay();

      }
      requestAnimationFrame(animate);
    }
    animate();

    frameSlider.addEventListener('input', function (event) {
      currentFrame = parseInt(event.target.value);
      updateModelAnimation(currentFrame);
    });

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
    playPauseButton.addEventListener('click', togglePlayPause);
    reverseButton.addEventListener('click', toggleReverse);
    loopButton.addEventListener('click', toggleLoop);

    updateFPS();
    updateDisplay();
    updateModelAnimation(currentFrame);
    function updateModelAnimation(frame) {
      // model.applyFrame(animation.frames[frame]);
      model.applyFrame(frame);
      webgl.render(scene, currentCamera);
    }
  });
}
