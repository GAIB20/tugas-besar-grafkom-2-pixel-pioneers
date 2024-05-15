import { setupFullView } from "./BoardFullView.js"
import { setupPartView } from "./BoardPartView.js"

export function setupBoard(element) {
    element.innerHTML = `
        <div id="fullview" class="board-section">
        </div>
        <div class="middle-tray">
            <div class="hierarchy">
                <table style="overflow: auto; width: 100%;">
                    <thead>
                        <tr>
                            <th colspan="4">Hierarchy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="4">
                                <div style="margin-left: 0px;">
                                    <input type="submit" id="insp-compTree-RBody" value="RBody" class="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div style="margin-left: 20px;">
                                    <input type="submit" id="insp-compTree-PBody" value="PBody" class="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div style="margin-left: 20px;">
                                    <input type="submit" id="insp-compTree-RHead" value="RHead" class="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div style="margin-left: 40px;">
                                    <input type="submit" id="insp-compTree-PHead" value="PHead" class="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <div style="margin-left: 20px;">
                                    <input type="submit" id="insp-compTree-RArmL" value="RArmL" class="selected">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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

    const buttonsHTML = createComponentButtons(tree);
    const tbody = document.querySelector('tbody');
    Object.values(buttonsHTML).forEach(buttonHTML => {
        tbody.insertAdjacentHTML('beforeend', buttonHTML);
    });

}

function createComponentButtons(tree, depth = 0) {
    let buttons = {};

    Object.keys(tree).forEach((compName) => {
        const comp = tree[compName];
        buttons[compName] = `<tr>
                                <td colspan="4">
                                    <div style="margin-left: ${depth * 20}px;">
                                        <input type="submit" id="insp-compTree-${compName}" value="${compName}" class="">
                                    </div>
                                </td>
                             </tr>`;
        buttons = {
            ...buttons,
            ...createComponentButtons(comp.children, depth + 1),
        };
    });

    return buttons;
}

// Assume 'tree' is your component tree object
const tree = {
    RBody: { children: { Child1: { children: {Child2: { children: {} }} }, Child2: { children: {} } } },
    PBody: { children: {} },
    RHead: { children: {} },
    PHead: { children: {} },
    RArmL: { children: {} }
};
