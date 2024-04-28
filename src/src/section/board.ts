import { setupFullView } from "./board-fullview"
import { setupPartView } from "./board-partview"

export function setupBoard(element: HTMLDivElement) {
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
        </div>
        <div id="partview" class="board-section">
        </div>
    `
    setupFullView(document.querySelector<HTMLDivElement>('#fullview')!)
    setupPartView(document.querySelector<HTMLDivElement>('#partview')!)
}