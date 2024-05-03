export class ShaderMaterial {
    _name: string;
    _vertexShader: string;
    _fragmentShader: string;
    _uniforms: Object;

    constructor(name = "", vertexShader = "", fragmentShader = "", uniforms = {}) {
        this._name = name;
        this._vertexShader = vertexShader;
        this._fragmentShader = fragmentShader;
        this._uniforms = uniforms;
    }

    get vertexShader() {
        return this._vertexShader;
    }

    get fragmentShader() {
        return this._fragmentShader;
    }

    get uniforms() {
        return this._uniforms;
    }
}