export class WebGL {
  constructor(gl) {
    this.gl = gl;
    this.vertexScript = `
        attribute vec4 a_position;
        attribute vec4 a_color;
        
        uniform mat4 u_matrix;
        
        varying vec4 v_color;
        
        void main() {
            // Multiply the position by the matrix.
            gl_Position = u_matrix * a_position;
        
            // Pass the color to the fragment shader.
            v_color = a_color;
        }
      `;
    this.fragmentScript = `
        precision mediump float;

        // Passed in from the vertex shader.
        varying vec4 v_color;
        
        void main() {
            gl_FragColor = v_color;
        }
      `;
    this.createProgram();
    this.positionLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    this.colorLocation = this.gl.getAttribLocation(this.program, "a_color");
    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    this.positionBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "ERROR compiling shader!",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createProgram() {
    var vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      this.vertexScript
    );
    var fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      this.fragmentScript
    );
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(
        "ERROR linking program!",
        this.gl.getProgramInfoLog(program)
      );
      this.gl.deleteProgram(program);
      return null;
    }
    this.program = program;
    return this.program;
  }

  static resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width = (canvas.clientWidth * multiplier) | 0;
    const height = (canvas.clientHeight * multiplier) | 0;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  createAttributeSetters(program) {
    function createAttributeSetter(info) {
      // Initialization Time
      const loc = gl.getAttribLocation(program, info.name);
      return (...values) => {
        // Render Time (saat memanggil setAttributes() pada render loop)
        const v = values[0];
        if (v instanceof BufferAttribute) {
          v._buffer = v._buffer || gl.createBuffer(); // Initialize bufffer if not exist
          gl.bindBuffer(gl.ARRAY_BUFFER, v._buffer);
          if (v.isDirty) {
            // Data Changed Time (note that buffer is already binded)
            gl.bufferData(gl.ARRAY_BUFFER, v.data, gl.STATIC_DRAW);
            v.consume();
          }
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(
            loc,
            v.size,
            v.dtype,
            v.normalize,
            v.stride,
            v.offset
          );
        } else {
          gl.disableVertexAttribArray(loc);
          if (v instanceof Float32Array)
            gl[`vertexAttrib${v.length}fv`](loc, v);
          else gl[`vertexAttrib${values.length}f`](loc, ...values);
        }
      };
    }

    const attribSetters = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) continue;
      attribSetters[info.name] = createAttributeSetter(info);
    }
    return attribSetters;
  }

  setAttribute(programInfo, attributeName, ...data) {
    const setters = programInfo.attributeSetters;
    if (attributeName in setters) {
      const shaderName = `a_${attributeName}`;
      setters[shaderName](...data);
    }
  }

  setAttributes(programInfo, attributes) {
    for (let attributeName in attributes)
      setAttribute(programInfo, attributeName, attributes[attributeName]);
  }

  setupScene(verticesData, colorsData) {
    const numVertices = verticesData.length / 3;
    const numColors = colorsData.length / 3;

    if (numVertices !== numColors) {
      console.error("Number of vertices and colors must match.");
      return;
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesData, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, colorsData, this.gl.STATIC_DRAW);

    this.numVertices = numVertices;
  }

  render(currentCamera) {
    WebGL.resizeCanvasToDisplaySize(this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.useProgram(this.program);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(
      this.positionLocation,
      3,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.enableVertexAttribArray(this.colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.vertexAttribPointer(
      this.colorLocation,
      3,
      this.gl.UNSIGNED_BYTE,
      true,
      0,
      0
    );
    this.gl.uniformMatrix4fv(
      this.matrixLocation,
      false,
      currentCamera.viewProjectionMatrix.data
    );
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.numVertices);
  }
}
