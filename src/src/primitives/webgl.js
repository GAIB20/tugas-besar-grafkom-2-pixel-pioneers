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
      `
      this.fragmentScript = `
        precision mediump float;

        // Passed in from the vertex shader.
        varying vec4 v_color;
        
        void main() {
            gl_FragColor = v_color;
        }
      `
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
      var vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexScript);
      var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentScript);
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
  
    attribLocation() {
        // Ensure the program is available and valid before using it.
        if (!this.program) {
          console.error("No valid program available.");
          return -1;
        }
      
        this.attribLocation = this.gl.getAttribLocation(this.program, "a_position");
        return this.attribLocation;
    }
      
  
    createAndBindBuffer() {
      const positionBuffer = this.gl.createBuffer();
      this.positionBuffer = positionBuffer;
  
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    }
  
    bufferData(positions) {
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(positions),
        this.gl.STATIC_DRAW
      );
    }
  
    setViewPort() {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
  
    clear() {
      this.gl.clearColor(1, 1, 1, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
  
    useProgramAndEnableVertex() {
      this.gl.useProgram(this.program);
      this.gl.enableVertexAttribArray(this.attribLocation);
    }
  
    bindBuffer() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    }
  
    vertexAttribPointer(size, type, normalize, stride, offset) {
      this.gl.vertexAttribPointer(
        this.attribLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );
    }
  
    draw(primitiveType, count) {
      this.gl.drawArrays(primitiveType, 0, count);
    }

    static resizeCanvasToDisplaySize(canvas, multiplier) {
        multiplier = multiplier || 1;
        const width  = canvas.clientWidth  * multiplier | 0;
        const height = canvas.clientHeight * multiplier | 0;
        if (canvas.width !== width ||  canvas.height !== height) {
          canvas.width  = width;
          canvas.height = height;
          return true;
        }
        return false;
      }
  }