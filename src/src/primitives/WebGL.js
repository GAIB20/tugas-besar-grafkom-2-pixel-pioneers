import { BufferAttribute } from "../geometry/BufferAttribute";
import { ShaderMaterial } from "../material/ShaderMaterial";
import { Mesh } from "./Mesh";
import { SetterWebGLType, ShaderType } from "./Type";

export class WebGL {
  constructor(gl) {
    this.gl = gl;
    this.program = null;
    this.shaderCache = {};
    this.gl.viewport(
      0,
      0,
      this.gl.canvas.clientWidth,
      this.gl.canvas.clientHeight
    );
    const ro = new ResizeObserver(() => this.resizeCanvasToDisplaySize());
    ro.observe(this.gl.canvas, { box: "content-box" });
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

  setProgramInfo(info) {
    if (this.program !== info) {
      this.gl.useProgram(info.program);
      this.program = info;
    }
  }

  createProgram(vertexShader, fragmentShader) {
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
    this.uniformSetters = this.createUniformSetters(this.program);
    this.attributeSetters = this.createAttributeSetters(this.program);

    return {
      program: this.program,
      uniformSetters: this.uniformSetters,
      attributeSetters: this.attributeSetters,
    };
  }

  resizeCanvasToDisplaySize(multiplier) {
    multiplier = multiplier || 1;
    const width = (this.gl.canvas.clientWidth * multiplier) | 0;
    const height = (this.gl.canvas.clientHeight * multiplier) | 0;
    if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
      return true;
    } else {
      this.gl.viewport(
        0,
        0,
        this.gl.canvas.clientWidth,
        this.gl.canvas.clientHeight
      );
      return true;
    }
    return false;
  }

  createUniformSetters(program) {
    let gl = this.gl;

    function createUniformSetter(info) {
      const loc = gl.getUniformLocation(program, info.name);
      const isArray = info.size > 1 && info.name.substr(-3) === "[0]";
      const type = SetterWebGLType[info.type];
      return (v) => {
        if (typeof v === "object" && "toArray" in v) v = v.toArray();
        if (isArray) {
          gl[`uniform${type}v`](loc, v);
        } else {
          if (type.substr(0, 6) === "Matrix") {
            gl[`uniform${type}`](loc, false, v);
          } else {
            if (Array.isArray(v)) gl[`uniform${type}`](loc, ...v);
            else gl[`uniform${type}`](loc, v);
          }
        }
      };
    }

    const uniformSetters = {};
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) break;
      let name =
        info.name.substr(-3) === "[0]"
          ? info.name.substr(0, info.name.length - 3)
          : info.name;
      uniformSetters[name] = createUniformSetter(info);
    }
    return uniformSetters;
  }

  setUniforms(uniforms) {
    const setters = this.program.uniformSetters;
    for (let uniformName in uniforms) {
      const shaderName = `u_${uniformName}`;
      if (shaderName in setters) setters[shaderName](uniforms[uniformName]);
    }
  }

  createAttributeSetters(program) {
    let gl = this.gl;

    function createAttributeSetter(info) {
      const loc = gl.getAttribLocation(program, info.name);
      return (value) => {
        value._buffer = value._buffer || gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, value._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, value.data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(
          loc,
          value.size,
          value.dtype,
          value.normalize,
          value.stride,
          value.offset
        );
      };
    }

    const attributeSetters = {};
    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttribs; i++) {
      const info = gl.getActiveAttrib(program, i);
      if (!info) continue;
      attributeSetters[info.name] = createAttributeSetter(info);
    }
    return attributeSetters;
  }

  setAttribute(programInfo, attributeName, ...data) {
    const setters = programInfo.attributeSetters;
    if (attributeName in setters) {
      const shaderName = `${attributeName}`;
      setters[shaderName](...data);
    }
  }

  setAttributes(programInfo, attributes) {
    for (let attributeName in attributes)
      this.setAttribute(programInfo, attributeName, attributes[attributeName]);
  }

  createOrGetMaterial(material) {
    if (material instanceof ShaderMaterial) {
      const id = material.id;
      if (!(id in this.shaderCache)) {
        this.shaderCache[id] = this.createProgram(
          this.createShader(ShaderType.VERTEX, material.vertexShader),
          this.createShader(ShaderType.FRAGMENT, material.fragmentShader)
        );
      }
      return this.shaderCache[id];
    } else {
      throw new Error("Unsupported material type.");
    }
  }

  render(scene, currentCamera) {
    this.resizeCanvasToDisplaySize();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.renderComponent(scene, {
      cameraPosition: currentCamera.worldPosition,
      viewMatrix: currentCamera.viewProjectionMatrix,
    });
  }

  renderComponent(component, uniforms) {
    if (!component.visible) return;
    component.computeWorldMatrix(false, true);
    if (component instanceof Mesh && component.geometry.attributes.position) {
      const material = component.material;
      const info = this.createOrGetMaterial(material);
      this.setProgramInfo(info);
      this.setAttributes(info, component.geometry.attributes);
      this.setUniforms({
        ...component.material.uniforms,
        ...uniforms,
        worldMatrix: component.worldMatrix,
      });
      this.gl.drawArrays(
        this.gl.TRIANGLES,
        0,
        component.geometry.attributes.position.count
      );
    }

    for (let key in component.children) {
      this.renderComponent(component.children[key], uniforms);
    }
  }
}