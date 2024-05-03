import { Component } from "./component.js";

export class Scene extends Component {
    backgroundColor;

    constructor() {
        super();
        this.backgroundColor = new Color();
    }

    get type() { return "Scene"; }

    set backgroundColor(backgroundColor) { this.backgroundColor = backgroundColor; }

    toJSON() {
        return { 
            ...super.toJSON(),
            backgroundColor: this.backgroundColor.toJSON(),
        };
    }

    static fromJSON(json, obj=null) {
        if (!obj) obj = new Scene();
        super.fromJSON(json, obj);
        return obj;
    }
}