/**
 * Represents a color for WebGL rendering.
 * The color is represented in RGBA format with values between 0 and 1.
 * r: red, g: green, b: blue, a: alpha
 */

export class Color {
    /**
     * The red value of the color.
     * @type {number}
     */
    r
    /**
     * The green value of the color.
     * @type {number}
     */
    g
    /**
     * The blue value of the color.
     * @type {number}
     */
    b
    /**
     * The alpha value of the color.
     * @type {number}
     */
    a

    /**
     * Create new instance of color.
     * @param {number} r Red value
     * @param {number} g Green value
     * @param {number} b Blue value
     * @param {number} a Alpha value
     */
    constructor(r, g, b, a) {
        this.set(r, g, b, a);
    }

    /**
     * Returns a string representation of the color in the format 'rgba(r, g, b, a)'.
     * @returns {string} The string representation of the color.
     */
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    /**
     * Returns an array representation of the color.
     * @returns {number[]} The array representation of the color, where the first element is the red value,
     *                    the second element is the green value, the third element is the blue value,
     *                    and the fourth element is the alpha value.
     */
    toArray() {
        return [this.r, this.g, this.b, this.a];
    }

    /**
     * Create new instance of color.
     * @param {number} r Red value
     * @param {number} g Green value
     * @param {number} b Blue value
     * @param {number} a Alpha value
     */
    set(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Color setter using hex string
     * @param {string} hex Hex string
     * @param {number} a Alpha value
     */
    setHex(hex, a = this.a) {
        this.r = parseInt(hex.substring(1, 3), 16) / 255;
        this.g = parseInt(hex.substring(3, 5), 16) / 255;
        this.b = parseInt(hex.substring(5, 7), 16) / 255;
        this.a = a;
    }

    /**
     * Copy the content of other color.
     * @param {Color} c Color
     */
    copy(c) {
        this.set(c.r, c.g, c.b, c.a);
        return this;
    }

    /**
     * Create new instance of color from this instance.
     */
    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    /**
     * Convert color to 32 bit value in string 
     */
    to32bit() {
        return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${this.a * 255})`;
    }

    /**
     * Get alpha value in 8-bit integer representation
     */
    get aInt() {
        return this.a * 255;
    }

    /**
     * Convert RGB to Hexadecimal representation
     */
    get hex() {
        return "#" +
            (this.r * 255).toString(16).padStart(2, '0') +
            (this.g * 255).toString(16).padStart(2, '0') +
            (this.b * 255).toString(16).padStart(2, '0');
    }

    /**
     * Converts the color to a JSON representation.
     * @returns {number[]} The JSON representation of the color as an array
     */
    toJSON() {
        return [...this];
    }

    /**
     * Creates a new Color instance from a JSON representation.
     * @param {number[]} obj The JSON representation of the color as an array
     * @returns {Color} The new Color instance created from the JSON representation.
     */
    static fromJSON(obj) {
        return new Color(...obj);
    }

    /**
     * Allows iteration over the color components.
     * @returns {Generator<number>} A generator that yields the red, green, blue, and alpha components of the color.
     */
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
        yield this.a;
    }
}
