import './style.css'
import { setupBoard } from './src/section/board.js'
import { setupHeader } from './src/section/header.js'

document.querySelector('#app').innerHTML = `
        <div>
            <div id="header">
            </div>
            <div id="board">
            </div>
        </div>
    `;

;
setupHeader(document.querySelector('#header'));
setupBoard(document.querySelector('#board'));
