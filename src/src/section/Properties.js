import { setupCanvas } from "../canvas/Canvas";

export function setupProperties(element) {
    element.innerHTML = `
    <div class="properties">
        <div class="properties-content"> 
            <h2>Properties</h2>
            <div class="transformation-container">
                <h3>Light Color</h3>
                <input type="color" id="light-color" style="width: 60%"/>
            </div>
            <div class="transformation-container">
                <h3>Camera 1</h3>
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
            <div class="transformation-container" style="margin-top:2%" id="fullview-camera-radius">
                <p class="prop-title">Radius</p>
                <div class="slider-container-2">
                    <p class="value-display" id="fullview-camera-radius-value">0</p>
                    <input type="range" min="0" max="500" value="200" class="slider" id="fullview-camera-radius-slider">
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
                    <div class="slider-container-3">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-anglex-slider">
                        <p id="fullview-camera-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container-3">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-camera-angley-slider">
                        <p id="fullview-camera-angley-value" class="value-display">0</p>
                    </div>
                </div>
            <div/>
            <button class="btn-purple" id="reset-view" style="width: 100%; margin-top: 1.5rem;">Reset View</button>
            <div class="transformation-container">
                <h3>Camera 2</h3>
                <div class="transformation-container">
                    <button class="btn-purple" id="add-camera-2">Add</button>
                    <select id="camera-2-dropdown" name="options">
                        <option value="1">Camera 1</option>
                    </select>
                </div>
            </div>
            <div class="transformation-container" style="margin-top:2%">
                <p class="prop-title">Projections</p>
                <select id="camera-2-type-dropdown" name="options" value="3">
                    <option value="1">Oblique</option>
                    <option value="2">Orthographic</option>
                    <option value="3">Perspective (1-point)</option>
                </select>
            </div>
            <div class="transformation-container" style="margin-top:2%" id="partview-camera-radius">
                <p class="prop-title">Radius</p>
                <div class="slider-container-2">
                    <p class="value-display" id="camera-2-radius-value">0</p>
                    <input type="range" min="0" max="500" value="200" class="slider" id="camera-2-radius-slider">
                </div>
            </div>
            <div class="transformation-container" style="margin-top:2%" id="camera-2-oblique-angle">
                <p class="prop-title">Oblique Angle</p>
                <div class="slider-container">
                    <p class="value-display" id="camera-2-oblique-value">0</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="camera-2-oblique-slider">
                </div>
            </div>
            <div id="partview-camera-angle">
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container-3">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="camera-2-anglex-slider">
                        <p id="camera-2-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container-3">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="camera-2-angley-slider">
                        <p id="camera-2-angley-value" class="value-display">0</p>
                    </div>
                </div>
            <div/>
            <button class="btn-purple" id="reset-camera-2-view" style="width: 100%; margin-top: 1.5rem;">Reset View</button>
            <div class="transformation-container" style="margin-top:2%">
                <h3 class="prop-title">Mapping</h3>
                <select id="mapping" name="options">
                    <option value="color">Color</option>
                    <option value="texture">Texture</option>
                    <option value="environment">Environment</option>
                </select>
            </div>
            <div id="texture-properties">
                <div class="transformation-container">
                    <h3 class="prop-title">Texture</h3>
                    <select id="select-texture" name="options">
                        <option value="brick">Brick</option>
                        <option value="metal">Metal</option>
                        <option value="wood">Wood</option>
                    </select>
                </div>
                <div class="checkbox-table">
                    <div class="checkbox-container">
                        <h3 class="prop-subtitle">Diffuse Texture</h3>
                        <input type="checkbox" class="checkbox" id="diffuse">
                    </div>
                    <div class="checkbox-container">
                        <h3 class="prop-subtitle">Specular Texture</h3>
                        <input type="checkbox" class="checkbox" id="specular">
                    </div>
                    <div class="checkbox-container">
                        <h3 class="prop-subtitle">Normal Texture</h3>
                        <input type="checkbox" class="checkbox" id="normal">
                    </div>
                    <div class="checkbox-container">
                        <h3 class="prop-subtitle">Displacement Texture</h3>
                        <input type="checkbox" class="checkbox" id="displacement">
                    </div>
                </div>
            </div>
            <div id="material-controller">
                <h3>Component Material</h3>
                <div class="material-container">
                    <h4>Material Type</h4>
                    <select id="select-material" name="options">
                        <option value="basic">Basic</option>
                        <option value="phong">Phong</option>
                    </select>
                </div>
                <div class="material-container">
                    <h4>Name</h4>
                    <input type="text" disabled id="material-name"/>
                </div>
                <div id="basic-container">
                    <div class="material-container">
                        <h4>Color</h4>
                        <input type="color" id="material-color"/>
                    </div>
                </div>
                <div id="phong-container">
                    <div class="material-container">
                        <h4>Ambient Color</h4>
                        <input type="color" id="material-ambient"/>
                    </div>
                    <div class="material-container">
                        <h4>Diffuse Color</h4>
                        <input type="color" id="material-diffuse"/>
                    </div>
                    <div class="material-container">
                        <h4>Specular Color</h4>
                        <input type="color" id="material-specular"/>
                    </div>
                    <div class="material-container">
                        <h4>Shininess</h4>
                        <input type="number" id="material-shininess"/>
                    </div>
                </div>
            </div>
            <div id="component-controller">
                <h3>Component Controller</h3>
                <h4>Translation</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-10" max="10" value="0" class="slider" id="fullview-object-translatex-slider">
                        <p id="fullview-object-translatex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-10" max="10" value="0" class="slider" id="fullview-object-translatey-slider">
                        <p id="fullview-object-translatey-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-10" max="10" value="0" class="slider" id="fullview-object-translatez-slider">
                        <p id="fullview-object-translatez-value" class="value-display">0</p>
                    </div>
                </div>
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-object-anglex-slider">
                        <p id="fullview-object-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-object-angley-slider">
                        <p id="fullview-object-angley-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="fullview-object-anglez-slider">
                        <p id="fullview-object-anglez-value" class="value-display">0</p>
                    </div>
                </div>
                <h4>Scale</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="10" value="1" step="0.5" class="slider" id="fullview-object-scalex-slider">
                        <p id="fullview-object-scalex-value" class="value-display">1</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="10" value="1" step="0.5" class="slider" id="fullview-object-scaley-slider">
                        <p id="fullview-object-scaley-value" class="value-display">1</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="10" value="1" step="0.5" class="slider" id="fullview-object-scalez-slider">
                        <p id="fullview-object-scalez-value" class="value-display">1</p>
                    </div>
                </div>
            </div>
            <h3>Animation</h3>
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
                <div class="easing-container">
                <p>Easing Function</p>
                <select id="easingFunction" name="options">
                    <option value="sineIn">Sine In</option>
                    <option value="sineOut">Sine Out</option>
                    <option value="sineInOut">Sine InOut</option>
                    <option value="quadIn">Quad In</option>
                    <option value="quadOut">Quad Out</option>
                    <option value="quadInOut">Quad InOut</option>
                    <option value="cubicIn">Cubic In</option>
                    <option value="cubicOut">Cubic Out</option>
                    <option value="cubicInOut">Cubic InOut</option>
                    <option value="quartIn">Quart In</option>
                    <option value="quartOut">Quart Out</option>
                    <option value="quartInOut">Quart InOut</option>
                    <option value="expoIn">Expo In</option>
                    <option value="expoOut">Expo Out</option>
                    <option value="expoInOut">Expo InOut</option>
                    <option value="circIn">Circ In</option>
                    <option value="circOut">Circ Out</option>
                    <option value="circInOut">Circ InOut</option>
                    <option value="backIn">Back In</option>
                    <option value="backOut">Back Out</option>
                    <option value="backInOut">Back InOut</option>
                    <option value="elasticIn">Elastic In</option>
                    <option value="elasticOut">Elastic Out</option>
                    <option value="elasticInOut">Elastic InOut</option>
                    <option value="bounceIn">Bounce In</option>
                    <option value="bounceOut">Bounce Out</option>
                    <option value="bounceInOut">Bounce InOut</option>
                </select>
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
                <h3>Object</h3>
                <h4>Translation</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-50" max="50" value="0" class="slider" id="partview-object-translatex-slider">
                        <p id="partview-object-translatex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-50" max="50" value="0" class="slider" id="partview-object-translatey-slider">
                        <p id="partview-object-translatey-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-50" max="50" value="0" class="slider" id="partview-object-translatez-slider">
                        <p id="partview-object-translatez-value" class="value-display">0</p>
                    </div>
                </div>
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-object-anglex-slider">
                        <p id="partview-object-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-object-angley-slider">
                        <p id="partview-object-angley-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-object-anglez-slider">
                        <p id="partview-object-anglez-value" class="value-display">0</p>
                    </div>
                </div>
                <h4>Scale</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="partview-object-scalex-slider">
                        <p id="partview-object-scalex-value" class="value-display">1</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="partview-object-scaley-slider">
                        <p id="partview-object-scaley-value" class="value-display">1</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="1" max="4" value="1" step="0.1" class="slider" id="partview-object-scalez-slider">
                        <p id="partview-object-scalez-value" class="value-display">1</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
    setupCanvas();
}
