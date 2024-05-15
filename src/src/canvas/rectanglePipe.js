let x1 = 0;
let x2 = 100;
let x3 = 30;
let x4 = 70;

let y1 = 0;
let y2 = 150;
let y3 = 30;
let y4 = 120;

let z1 = 0;
let z2 = -100;
let z3 = -30;
let z4 = -70;

const red = [255, 0, 0];
const green = [0, 255, 0];
const blue = [0, 0, 255];
const white = [255, 255, 255];

const yellow = [255, 255, 0];
const magenta = [255, 0, 255];
const cyan = [0, 255, 255];
const black = [0, 0, 0];

export const vertices = new Float32Array([
  // outer front face
  x1, y1, z1,
  x2, y1, z1,  
  x2, y2, z1,  
  x1, y1, z1,
  x2, y2, z1,
  x1, y2, z1,

  // outer right face
  x2, y2, z2,  
  x2, y2, z1,  
  x2, y1, z1, 
  x2, y1, z2,
  x2, y2, z2,
  x2, y1, z1,

  // outer left face
  x1, y1, z1, 
  x1, y2, z1,  
  x1, y2, z2,  
  x1, y1, z1,
  x1, y2, z2,
  x1, y1, z2,

  // outer behind face
  x2, y2, z2,  
  x2, y1, z2,  
  x1, y1, z2,
  x1, y2, z2,
  x2, y2, z2,
  x1, y1, z2,

    // inner front face
    x4, y2, z3,  
    x4, y1, z3,  
    x3, y1, z3,
    x3, y2, z3,
    x4, y2, z3,
    x3, y1, z3,
  
    // inner right face
    x4, y1, z3, 
    x4, y2, z3,  
    x4, y2, z4,  
    x4, y1, z3,
    x4, y2, z4,
    x4, y1, z4,
  
    // inner left face
    x3, y2, z4,  
    x3, y2, z3,  
    x3, y1, z3, 
    x3, y1, z4,
    x3, y2, z4,
    x3, y1, z3,
  
    // inner behind face
    x3, y1, z4,
    x4, y1, z4,  
    x4, y2, z4,  
    x3, y1, z4,
    x4, y2, z4,
    x3, y2, z4,
  
    
  // top front face
  x1, y2, z1,
  x4, y2, z1,  
  x4, y2, z3,  
  x1, y2, z1,
  x4, y2, z3,
  x1, y2, z3,

  // top right face
  x4, y2, z1,
  x2, y2, z1,  
  x2, y2, z4,  
  x4, y2, z1,
  x2, y2, z4,
  x4, y2, z4,

  // top behind face
  x3, y2, z2,  
  x3, y2, z4,  
  x2, y2, z4,
  x2, y2, z2,
  x3, y2, z2,
  x2, y2, z4,

  // top left face
  x3, y2, z2,
  x1, y2, z2,  
  x1, y2, z3,  
  x3, y2, z2,
  x1, y2, z3,
  x3, y2, z3,


  // bottom front face
  x4, y1, z3,  
  x4, y1, z1,  
  x1, y1, z1,
  x1, y1, z3,
  x4, y1, z3,
  x1, y1, z1,

  // bottom right face
  x2, y1, z4,  
  x2, y1, z1,  
  x4, y1, z1,
  x4, y1, z4,
  x2, y1, z4,
  x4, y1, z1,

  // bottom behind face
  x2, y1, z4,
  x3, y1, z4,  
  x3, y1, z2,  
  x2, y1, z4,
  x3, y1, z2,
  x2, y1, z2,

  // bottom left face
  x1, y1, z3,  
  x1, y1, z2,  
  x3, y1, z2,
  x3, y1, z3,
  x1, y1, z3,
  x3, y1, z2,
]);

// export const vertices = new Float32Array([
//   // left column front
//   0, 0, 0,
//   0, 150, 0,
//   30, 0, 0,
//   0, 150, 0,
//   30, 150, 0,
//   30, 0, 0,

//   // top rung front
//   30, 0, 0,
//   30, 30, 0,
//   100, 0, 0,
//   30, 30, 0,
//   100, 30, 0,
//   100, 0, 0,

//   // middle rung front
//   30, 60, 0,
//   30, 90, 0,
//   67, 60, 0,
//   30, 90, 0,
//   67, 90, 0,
//   67, 60, 0,

//   // left column back
//   0, 0, 30,
//   30, 0, 30,
//   0, 150, 30,
//   0, 150, 30,
//   30, 0, 30,
//   30, 150, 30,

//   // top rung back
//   30, 0, 30,
//   100, 0, 30,
//   30, 30, 30,
//   30, 30, 30,
//   100, 0, 30,
//   100, 30, 30,

//   // middle rung back
//   30, 60, 30,
//   67, 60, 30,
//   30, 90, 30,
//   30, 90, 30,
//   67, 60, 30,
//   67, 90, 30,

//   // top
//   0, 0, 0,
//   100, 0, 0,
//   100, 0, 30,
//   0, 0, 0,
//   100, 0, 30,
//   0, 0, 30,

//   // top rung right
//   100, 0, 0,
//   100, 30, 0,
//   100, 30, 30,
//   100, 0, 0,
//   100, 30, 30,
//   100, 0, 30,

//   // under top rung
//   30, 30, 0,
//   30, 30, 30,
//   100, 30, 30,
//   30, 30, 0,
//   100, 30, 30,
//   100, 30, 0,

//   // between top rung and middle
//   30, 30, 0,
//   30, 60, 30,
//   30, 30, 30,
//   30, 30, 0,
//   30, 60, 0,
//   30, 60, 30,

//   // top of middle rung
//   30, 60, 0,
//   67, 60, 30,
//   30, 60, 30,
//   30, 60, 0,
//   67, 60, 0,
//   67, 60, 30,

//   // right of middle rung
//   67, 60, 0,
//   67, 90, 30,
//   67, 60, 30,
//   67, 60, 0,
//   67, 90, 0,
//   67, 90, 30,

//   // bottom of middle rung.
//   30, 90, 0,
//   30, 90, 30,
//   67, 90, 30,
//   30, 90, 0,
//   67, 90, 30,
//   67, 90, 0,

//   // right of bottom
//   30, 90, 0,
//   30, 150, 30,
//   30, 90, 30,
//   30, 90, 0,
//   30, 150, 0,
//   30, 150, 30,

//   // bottom
//   0, 150, 0,
//   0, 150, 30,
//   30, 150, 30,
//   0, 150, 0,
//   30, 150, 30,
//   30, 150, 0,

//   // left side
//   0, 0, 0,
//   0, 0, 30,
//   0, 150, 30,
//   0, 0, 0,
//   0, 150, 30,
//   0, 150, 0]);

function repeatColor(count, color) {
  const repeatedColors = [];
  for (let i = 0; i < count; i++) {
    repeatedColors.push(...color);
  }
  return repeatedColors;
}

export const colors = new Uint8Array([
  // outer front face
  ...repeatColor(6, red),

  // outer right face
  ...repeatColor(6, green),

  // outer left face
  ...repeatColor(6, blue),

  // outer behind face
  ...repeatColor(6, black),

    // inner front face
    ...repeatColor(6, red),

    // inner right face
    ...repeatColor(6, green),
  
    // inner left face
    ...repeatColor(6, blue),
  
    // inner behind face
    ...repeatColor(6, black),
  
  // top face
  ...repeatColor(24, cyan),

  // bottom face
  ...repeatColor(24, magenta),

  
])

  // export const colors = new Uint8Array([
  //   // left column front
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  
  //   // top rung front
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  
  //   // middle rung front
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  //   200, 70, 120,
  
  //   // left column back
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  
  //   // top rung back
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  
  //   // middle rung back
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  //   80, 70, 200,
  
  //   // top
  //   70, 200, 210,
  //   70, 200, 210,
  //   70, 200, 210,
  //   70, 200, 210,
  //   70, 200, 210,
  //   70, 200, 210,
  
  //   // top rung right
  //   200, 200, 70,
  //   200, 200, 70,
  //   200, 200, 70,
  //   200, 200, 70,
  //   200, 200, 70,
  //   200, 200, 70,
  
  //   // under top rung
  //   210, 100, 70,
  //   210, 100, 70,
  //   210, 100, 70,
  //   210, 100, 70,
  //   210, 100, 70,
  //   210, 100, 70,
  
  //   // between top rung and middle
  //   210, 160, 70,
  //   210, 160, 70,
  //   210, 160, 70,
  //   210, 160, 70,
  //   210, 160, 70,
  //   210, 160, 70,
  
  //   // top of middle rung
  //   70, 180, 210,
  //   70, 180, 210,
  //   70, 180, 210,
  //   70, 180, 210,
  //   70, 180, 210,
  //   70, 180, 210,
  
  //   // right of middle rung
  //   100, 70, 210,
  //   100, 70, 210,
  //   100, 70, 210,
  //   100, 70, 210,
  //   100, 70, 210,
  //   100, 70, 210,
  
  //   // bottom of middle rung.
  //   76, 210, 100,
  //   76, 210, 100,
  //   76, 210, 100,
  //   76, 210, 100,
  //   76, 210, 100,
  //   76, 210, 100,
  
  //   // right of bottom
  //   140, 210, 80,
  //   140, 210, 80,
  //   140, 210, 80,
  //   140, 210, 80,
  //   140, 210, 80,
  //   140, 210, 80,
  
  //   // bottom
  //   90, 130, 110,
  //   90, 130, 110,
  //   90, 130, 110,
  //   90, 130, 110,
  //   90, 130, 110,
  //   90, 130, 110,
  
  //   // left side
  //   160, 160, 220,
  //   160, 160, 220,
  //   160, 160, 220,
  //   160, 160, 220,
  //   160, 160, 220,
  //   160, 160, 220])
  
  