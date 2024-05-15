import { setupCanvas } from "../canvas/canvas";

export function setupFullView(element) {
  element.innerHTML = `
        <canvas id="fullview-canvas"></canvas>
        <div class= "properties">
            <div class="properties-content"> 
                <h2>Fullview Properties</h2>
                <h4>Camera</h4>
                <div class="transformation-container">
                    <div class="slider-container-2">
                        <p>Angle</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-angle-slider">
                        <p>0</p>
                    </div>
                    <div class="slider-container-2">
                        <p>Radius</p>
                        <input type="range" min="1" max="100" value="50" class="slider" id="mySlider">
                        <p>0</p>
                    </div>
                </div>
                <div class="transformation-container" style="margin-top:2%">
                    <div class="slider-container-2">
                        <label for="myDropdown">Projection</label>
                        <select id="myDropdown" name="options">
                            <option value="option1">Oblique</option>
                            <option value="option2">Orthographic</option>
                            <option value="option3">Perspective (1-point)</option>
                        </select>
                    </div>
                    <div class="slider-container-2">
                        <label for="myDropdown">Mapping</label>
                        <select id="myDropdown" name="options">
                            <option value="option1">Texture</option>
                            <option value="option2">Environment</option>
                            <option value="option3">Bump</option>
                        </select>
                    </div>
                </div>
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
  setupCanvas(document.querySelector("#fullview-canvas"), document.querySelector("#fullview-camera-angle-slider"));
}
