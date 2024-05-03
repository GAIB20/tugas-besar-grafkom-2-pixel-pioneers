export class WebGL {
  constructor() {
    // Vertex shader program
    this.vertex_shader_source = `
        attribute vec2 vertexPoint;
        attribute vec3 vertexColor;

        varying vec3 fragColor;

        void main() {
            fragColor = vertexColor;
            gl_Position = vec4(vertexPoint, 0.0, 1.0);
        }
    `;

    this.fragment_shader_source = `
        precision mediump float;

        varying vec3 fragColor;

        void main() {
            gl_FragColor = vec4(fragColor, 1.0);
        }
    `;
  }

  // Create shader program
  create_shader_program = () => {
    // Creates vertex and fragment shader
    const vertex_shader = this.load_shader(
      this.gl.VERTEX_SHADER,
      this.vertex_shader_source
    );

    const fragment_shader = this.load_shader(
      this.gl.FRAGMENT_SHADER,
      this.fragment_shader_source
    );

    // Create the shader program
    this.shader_program = this.gl.createProgram();

    // Attach shaders to program
    this.gl.attachShader(this.shader_program, vertex_shader);
    this.gl.attachShader(this.shader_program, fragment_shader);

    // Link together
    this.gl.linkProgram(this.shader_program);

    // If creating the shader program failed, alert
    if (
      !this.gl.getProgramParameter(this.shader_program, this.gl.LINK_STATUS)
    ) {
      alert(
        `Unable to initialize the shader program: ${this.gl.getProgramInfoLog(
          this.shader_program
        )}`
      );
    }
  };

  // Function to load shader
  load_shader = (type, source) => {
    // Create object shader
    const shader = this.gl.createShader(type);

    // Send the source to the shader object
    this.gl.shaderSource(shader, source);

    // Compile the shader program
    this.gl.compileShader(shader);

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert(
        `An error occurred compiling the shaders: ${this.gl.getShaderInfoLog(
          shader
        )}`
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  initialize_gl = (canvas) => {
    // Initialize GL
    const gl = canvas.getContext("webgl");

    // Check if browser supports WebGL or not
    if (gl === null) {
      alert("Error! Browser may not support WebGL");
    } else {
      // Set clear color to white, fully opaque (background color)
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
    }

    // Save gl
    this.gl = gl;

    // Initialize a shader program
    this.create_shader_program();

    this.gl.useProgram(this.shader_program);

    // Create the vertex buffer
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // Get the location of the attribute variables in the shader program
    const positionAttributeLocation = this.gl.getAttribLocation(
      this.shader_program,
      "vertexPoint"
    );

    // Set the position attribute
    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      2,
      this.gl.FLOAT,
      false,
      5 * Float32Array.BYTES_PER_ELEMENT,
      0
    );

    // Enable the position attribute
    this.gl.enableVertexAttribArray(positionAttributeLocation);

    // Get the location of the attribute variables in the shader program
    const colorAttributeLocation = this.gl.getAttribLocation(
      this.shader_program,
      "vertexColor"
    );

    // Set the position attribute
    this.gl.vertexAttribPointer(
      colorAttributeLocation,
      3,
      this.gl.FLOAT,
      false,
      5 * Float32Array.BYTES_PER_ELEMENT,
      2 * Float32Array.BYTES_PER_ELEMENT
    );

    // Enable the position attribute
    this.gl.enableVertexAttribArray(colorAttributeLocation);
  };
}
