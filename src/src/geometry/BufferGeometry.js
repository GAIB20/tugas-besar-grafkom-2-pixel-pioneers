import { BufferAttribute } from "./BufferAttribute.js";

export class BufferGeometry {
    constructor() {
        this._attributes = {};
    }

    get attributes() {
        return this._attributes;
    }

    get indices() {
        return this._indices;
    }

    setIndices(indices) {
        this._indices = indices;
        return this;
    }

    removeIndices() {
        this._indices = undefined;
        return this;
    }

    setAttribute(name, attribute) {
        this._attributes[name] = attribute;
        return this;
    }

    getAttribute(name) {
        return this._attributes[name];
    }

    deleteAttribute(name) {
        delete this._attributes[name];
        return this;
    }

    calculateNormals(forceNewAttribute = false) {
        const position = this.getAttribute('position');
        if (!position) return;
        let normal = this.getAttribute('normal');
        if (forceNewAttribute || !normal)
            normal = new BufferAttribute(new Float32Array(position.length), position.itemSize);
        // Perform normal calculation here.
        this.setAttribute('normal', normal);
    }
}
