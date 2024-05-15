import "./style.css";
import { setupBoard } from "./src/section/Board.js";
import { setupHeader } from "./src/section/Header.js";

document.querySelector("#app").innerHTML = `
        <div>
            <div id="header">
            </div>
            <div id="board">
            </div>
        </div>
    `;

setupHeader(document.querySelector("#header"));
setupBoard(document.querySelector("#board"));
