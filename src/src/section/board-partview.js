import { setupCanvas } from "../canvas/canvas";

export function setupPartView(element) {
  element.innerHTML = `
        <canvas id="partview-canvas"></canvas>
        <div class= "properties">
            <div class="properties-content"> 
                <h2>Partview Properties</h2>
                <h4>Camera</h4>
                <div class="transformation-container">
                    <div class="slider-container-2">
                        <p>Angle</p>
                        <input type="range" min="-180" max="180" value="0" class="slider" id="partview-camera-angle-slider">
                        <p>0</p>
                    </div>
                    <div class="slider-container-2">
                        <p>Radius</p>
                        <input type="range" min="0" max="400" value="200" class="slider" id="partview-camera-radius-slider">
                        <p>0</p>
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
            </div>
        </div>
    `;

    setupCanvas(document.querySelector("#partview-canvas"), document.querySelector("#partview-camera-angle-slider"), document.querySelector("#partview-camera-radius-slider"));
}
