export class BufferAttribute {
    constructor(data, size, options = {}) {
        this._data = data;
        this._size = size;
        this._dtype = options.dtype || WebGLRenderingContext.FLOAT; // Assuming WebGL context is globally available
        this._normalize = options.normalize || false;
        this._stride = options.stride || 0;
        this._offset = options.offset || 0;
        this._isDirty = true; // Initialize as true to indicate the data needs to be copied initially
    }

    get data() { return this._data; }
    get size() { return this._size; }
    get dtype() { return this._dtype; }
    get normalize() { return this._normalize; }
    get stride() { return this._stride; }
    get offset() { return this._offset; }
    get isDirty() { return this._isDirty; }

    set data(data) {
        this._data = data;
        this._isDirty = true;
    }
    set size(size) {
        this._size = size;
        this._isDirty = true;
    }
    set dtype(dtype) {
        this._dtype = dtype;
        this._isDirty = true;
    }
    set normalize(normalize) {
        this._normalize = normalize;
        this._isDirty = true;
    }
    set stride(stride) {
        this._stride = stride;
        this._isDirty = true;
    }
    set offset(offset) {
        this._offset = offset;
        this._isDirty = true;
    }

    consume() {
        this._isDirty = false;
    }

    get count() {
        return this._data.length / this._size;
    }

    get length() {
        return this._data.length;
    }

    set(index, data) {
        this._isDirty = true;
        // Example implementation assuming the use of Float32Array or similar
        const baseIndex = index * this._size;
        for (let i = 0; i < this._size; i++) {
            this._data[baseIndex + i] = data[i];
        }
    }

    get(index, size) {
        const baseIndex = index * this._size;
        size = size || this._size;
        const data = [];
        for (let i = 0; i < size; i++) {
            data.push(this._data[baseIndex + i]);
        }
        return data;
    }
}
