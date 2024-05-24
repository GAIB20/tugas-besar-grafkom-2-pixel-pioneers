import { setupCanvas } from "../canvas/Canvas";
import { PerspectiveCamera } from "../camera/PerspectiveCamera";

export function setupFullView(element) {
    element.innerHTML = `
    <canvas id="fullview-canvas"></canvas>
    <div class="properties">
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
            <div class="transformation-container" style="margin-top:2%" id="fullview-camera-radius">
                <p class="prop-title">Radius</p>
                <div class="slider-container-2">
                    <p class="value-display" id="fullview-camera-radius-value">0</p>
                    <input type="range" min="0" max="400" value="200" class="slider" id="fullview-camera-radius-slider">
                </div>
            </div>
            <div class="transformation-container" style="margin-top:2%" id="fullview-camera-oblique-angle">
                <p class="prop-title">Oblique Angle</p>
                <div class="slider-container">
                    <p class="value-display" id="fullview-camera-oblique-value">0</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="fullview-camera-oblique-slider">
                </div>
            </div>
            <div id="fullview-camera-angle">
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-anglex-slider">
                        <p id="fullview-camera-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-angley-slider">
                        <p id="fullview-camera-angley-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-anglez-slider">
                        <p id="fullview-camera-anglez-value" class="value-display">0</p>
                    </div>
                </div>
            <div/>
            <button class="btn-purple" id="reset-view" style="width: 100%; margin-top: 1.5rem;">Reset View</button>
            <h3>Object</h3>
            <h4>Translation</h4>
            <div class="transformation-container">
                <div class="slider-container">
                    <p>X</p>
                    <input type="range" min="-50" max="50" value="0" class="slider" id="fullview-object-translatex-slider">
                    <p id="fullview-object-translatex-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Y</p>
                    <input type="range" min="-50" max="50" value="0" class="slider" id="fullview-object-translatey-slider">
                    <p id="fullview-object-translatey-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Z</p>
                    <input type="range" min="-50" max="50" value="0" class="slider" id="fullview-object-translatez-slider">
                    <p id="fullview-object-translatez-value" class="value-display">0</p>
                </div>
            </div>
            <h4>Angle</h4>
            <div class="transformation-container">
                <div class="slider-container">
                    <p>X</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="fullview-object-anglex-slider">
                    <p id="fullview-object-anglex-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Y</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="fullview-object-angley-slider">
                    <p id="fullview-object-angley-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Z</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="fullview-object-anglez-slider">
                    <p id="fullview-object-anglez-value" class="value-display">0</p>
                </div>
            </div>
            <h4>Scale</h4>
            <div class="transformation-container">
                <div class="slider-container">
                    <p>X</p>
                    <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="fullview-object-scalex-slider">
                    <p id="fullview-object-scalex-value" class="value-display">1</p>
                </div>
                <div class="slider-container">
                    <p>Y</p>
                    <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="fullview-object-scaley-slider">
                    <p id="fullview-object-scaley-value" class="value-display">1</p>
                </div>
                <div class="slider-container">
                    <p>Z</p>
                    <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="fullview-object-scalez-slider">
                    <p id="fullview-object-scalez-value" class="value-display">1</p>
                </div>
            </div>
            <h4>Animation</h4>
            <div class="animation-container">
                <h4>Player</h4>
                <div class="slider-container-3">
                    <input type="range" min="1" max="60" value="1" class="slider" id="frameSlider">
                    <p class="value-display" id="frameDisplay">1/60</p>
                </div>
                <div>
                    <button id="first"><i class="fas fa-step-backward"></i></button>
                    <button id="previous"><i class="fas fa-backward"></i></button>
                    <button id="play-pause"><i class="fas fa-play"></i></button>
                    <button id="next"><i class="fas fa-forward"></i></button>
                    <button id="last"><i class="fas fa-step-forward"></i></button>
                    <button id="reverse"><i class="fas fa-undo"></i></button>
                    <button id="loop"><i class="fas fa-sync-alt"></i></button>
                </div>
                <div class="fps-controller">
                    <p>Frames per Second</p>
                    <div class="slider-container-2">
                        <input type="range" min="1" max="60" value="3" class="slider" id="fpsSlider">
                    </div>
                    <p class="value-display" id="fpsDisplay">30 FPS</p>
                </div>
                <h4>Editor</h4>
                <p>Current Frame: <span id="currentFrameDisplay">1</span></p>
                <div>
                    <p>Add Frame</p>
                    <button id="addFrameAfter">After Current</button>
                    <button id="addFrameEnd">At End</button>
                </div>
                <p>Delete</p>
                <button id="deleteFrame">Delete Current Frame</button>
                <div>
                    <p>Move Frame</p>
                    <button id="moveToFirstFrame"><i class="fas fa-step-backward"></i></button>
                    <button id="moveToPrevFrame"><i class="fas fa-backward"></i></button>
                    <button id="moveToNextFrame"><i class="fas fa-forward"></i></button>
                    <button id="moveToLastFrame"><i class="fas fa-step-forward"></i></button>
                </div>
                <p>Load Frame</p>
                <input type="file" id="fileInput" accept=".js" style="display: none;">
                <button id="loadAnimation">Load Animation</button>
                <p>Save Frame</p>
                <button id="saveAnimation">Save Animation</button>
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
