import { setupFullView } from "./board-fullview.js";
import { setupPartView } from "./board-partview.js";

export function setupBoard(element) {
    element.innerHTML = `
        <div id="fullview" class="board-section">
        </div>
        <div class="middle-tray">
            <div class="hierarchy">
                <p>Hierarchy</p>
            </div>
            <div class="options">
                <p>File.txt</p>
                <button class="btn-purple">Choose File</button>
                <button class="btn-purple">Save File</button>
                <button class="btn-purple">Reset</button>
            </div>
        </div>
        <div id="partview" class="board-section">
        </div>
    `;

    const fullviewElement = document.querySelector('#fullview');
    const partviewElement = document.querySelector('#partview');

    if (fullviewElement) {
        setupFullView(fullviewElement);
    }

    if (partviewElement) {
        setupPartView(partviewElement);
    }
}
