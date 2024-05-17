import { Component } from "./Component.js";

export class Rig extends Component {
    /** @type {string} */
    _id

    constructor(id) {
        super();
        this._id = id;
    }

    getId() {
        return this._id;
    }

    getType() {
        return "Rig";
    }

    toJSON() {
        return { 
            ...super.toJSON(),
            type: this.getType(),
            id: this.getId(),
        };
    }

    static fromJSON(json, obj = null) {
        if (!obj) {
            obj = new Rig(json.id);
        }
        super.fromJSON(json, obj);
        return obj;
    }
};