import { setupCanvas } from "../canvas/Canvas";
import { PerspectiveCamera } from "../camera/PerspectiveCamera";

export function setupFullView(element) {
  element.innerHTML = `
        <canvas id="fullview-canvas"></canvas>
        <div class= "properties">
            <div class="properties-content"> 
                <h2>Fullview Properties</h2>
                <div class="transformation-container">
                    <h3>Camera</h3>
                    <div class="transformation-container">
                        <button class="btn-purple" id="full-view-add-camera">Add</button>
                        <select id="fullview-camera-dropdown" name="options">
                            <option value="1">Camera 1</option>
                        </select>
                    </div>
                </div>
                <div class="transformation-container" style="margin-top:2%">
                    <p class="prop-title">Projections</p>
                    <select id="fullview-camera-type-dropdown" name="options" value="3">
                        <option value="1">Oblique</option>
                        <option value="2">Orthographic</option>
                        <option value="3">Perspective (1-point)</option>
                    </select>
                </div>
                <div class="transformation-container" style="margin-top:2%">
                    <p class="prop-title">Mapping</p>
                    <select id="myDropdown" name="options">
                        <option value="option1">Texture</option>
                        <option value="option2">Environment</option>
                        <option value="option3">Bump</option>
                    </select>
                </div>
                <div class="transformation-container" style="margin-top:2%">
                    <p class="prop-title">Radius</p>
                    <div class="slider-container-2">
                        <input type="range" min="0" max="400" value="200" class="slider" id="fullview-camera-radius-slider">
                        <p>0</p>
                    </div>
                </div>
                <div class="transformation-container" style="margin-top:2%">
                    <p class="prop-title">Oblique Angle</p>
                    <div class="slider-container-2">
                        <input type="range" min="0" max="400" value="200" class="slider" id="fullview-camera-radius-slider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-anglex-slider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-angley-slider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-anglez-slider">
                        <p>0</p>
                    </div>
                </div>
                <h3>Object</h3>
                <h4>Translation</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Scale</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <h4>Animation</h4>
                <div class="animation-container">
                    <div class="slider-container">
                        <p>Frame</p>
                        <input type="range" min="1" max="60" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                    <div>
                        <button id="playButton">Toggle Play</button>
                        <div>
                            <input type="checkbox" id="autoReplayCheckbox">
                            <label for="autoReplayCheckbox">Auto Replay</label>
                        </div>
                        <div>
                            <input type="checkbox" id="reverseCheckbox">
                            <label for="reverseCheckbox">Reverse</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  var canvas = document.querySelector("#fullview-canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  setupCanvas(
    document.querySelector("#fullview-canvas"),
    document.querySelector("#fullview-camera-angle-slider"),
    document.querySelector("#fullview-camera-radius-slider")
  );
}
