import { setupCanvasPartView } from "../canvas/PartviewCanvas";

export function setupPartView(element) {
    element.innerHTML = `
    <canvas id="partview-canvas"></canvas>
    <div class="properties">
        <div class="properties-content"> 
            <h2>Partview Properties</h2>
            <div class="transformation-container">
                <h3>Camera</h3>
                <div class="transformation-container">
                    <button class="btn-purple" id="part-view-add-camera">Add</button>
                    <select id="partview-camera-dropdown" name="options">
                        <option value="1">Camera 1</option>
                    </select>
                </div>
            </div>
            <div class="transformation-container" style="margin-top:2%">
                <p class="prop-title">Projections</p>
                <select id="partview-camera-type-dropdown" name="options" value="3">
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
            <div class="transformation-container" style="margin-top:2%" id="partview-camera-radius">
                <p class="prop-title">Radius</p>
                <div class="slider-container-2">
                    <input type="range" min="0" max="400" value="200" class="slider" id="partview-camera-radius-slider">
                    <p class="value-display">0</p>
                </div>
            </div>
            <div class="transformation-container" style="margin-top:2%" id="partview-camera-oblique-angle">
                <p class="prop-title">Oblique Angle</p>
                <div class="slider-container-2">
                    <input type="range" min="0" max="400" value="200" class="slider" id="partview-camera-radius-slider">
                    <p class="value-display">0</p>
                </div>
            </div>
            <div id="partview-camera-angle">
                <h4>Angle</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-anglex-slider">
                        <p id="partview-camera-anglex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-angley-slider">
                        <p id="partview-camera-angley-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-anglez-slider">
                        <p id="partview-camera-anglez-value" class="value-display">0</p>
                    </div>
                </div>
            <div/>
            <div id="partview-camera-translate">
                <h4>Translate</h4>
                <div class="transformation-container">
                    <div class="slider-container">
                        <p>X</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-translatex-slider">
                        <p id="partview-camera-translatex-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Y</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-translatey-slider">
                        <p id="partview-camera-translatey-value" class="value-display">0</p>
                    </div>
                    <div class="slider-container">
                        <p>Z</p>
                        <input type="range" min="0" max="400" value="200" class="slider" id="partview-camera-translatez-slider">
                        <p id="partview-camera-translatez-value" class="value-display">0</p>
                    </div>
                </div>
            </div>
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
                    <input type="range" min="0" max="360" value="0" class="slider" id="partview-object-anglex-slider">
                    <p id="partview-object-anglex-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Y</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="partview-object-angley-slider">
                    <p id="partview-object-angley-value" class="value-display">0</p>
                </div>
                <div class="slider-container">
                    <p>Z</p>
                    <input type="range" min="0" max="360" value="0" class="slider" id="partview-object-anglez-slider">
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
`;

    setupCanvasPartView(
        document.querySelector("#partview-canvas"),
        document.querySelector("#partview-camera-angle-slider"),
        document.querySelector("#partview-camera-radius-slider")
    );
}
