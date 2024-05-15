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

export const rpVertices = new Float32Array([
  // outer front face
  x1,
  y1,
  z1,
  x2,
  y1,
  z1,
  x2,
  y2,
  z1,
  x1,
  y1,
  z1,
  x2,
  y2,
  z1,
  x1,
  y2,
  z1,

  // outer right face
  x2,
  y2,
  z2,
  x2,
  y2,
  z1,
  x2,
  y1,
  z1,
  x2,
  y1,
  z2,
  x2,
  y2,
  z2,
  x2,
  y1,
  z1,

  // outer left face
  x1,
  y1,
  z1,
  x1,
  y2,
  z1,
  x1,
  y2,
  z2,
  x1,
  y1,
  z1,
  x1,
  y2,
  z2,
  x1,
  y1,
  z2,

  // outer behind face
  x2,
  y2,
  z2,
  x2,
  y1,
  z2,
  x1,
  y1,
  z2,
  x1,
  y2,
  z2,
  x2,
  y2,
  z2,
  x1,
  y1,
  z2,

  // inner front face
  x4,
  y2,
  z3,
  x4,
  y1,
  z3,
  x3,
  y1,
  z3,
  x3,
  y2,
  z3,
  x4,
  y2,
  z3,
  x3,
  y1,
  z3,

  // inner right face
  x4,
  y1,
  z3,
  x4,
  y2,
  z3,
  x4,
  y2,
  z4,
  x4,
  y1,
  z3,
  x4,
  y2,
  z4,
  x4,
  y1,
  z4,

  // inner left face
  x3,
  y2,
  z4,
  x3,
  y2,
  z3,
  x3,
  y1,
  z3,
  x3,
  y1,
  z4,
  x3,
  y2,
  z4,
  x3,
  y1,
  z3,

  // inner behind face
  x3,
  y1,
  z4,
  x4,
  y1,
  z4,
  x4,
  y2,
  z4,
  x3,
  y1,
  z4,
  x4,
  y2,
  z4,
  x3,
  y2,
  z4,

  // top front face
  x1,
  y2,
  z1,
  x4,
  y2,
  z1,
  x4,
  y2,
  z3,
  x1,
  y2,
  z1,
  x4,
  y2,
  z3,
  x1,
  y2,
  z3,

  // top right face
  x4,
  y2,
  z1,
  x2,
  y2,
  z1,
  x2,
  y2,
  z4,
  x4,
  y2,
  z1,
  x2,
  y2,
  z4,
  x4,
  y2,
  z4,

  // top behind face
  x3,
  y2,
  z2,
  x3,
  y2,
  z4,
  x2,
  y2,
  z4,
  x2,
  y2,
  z2,
  x3,
  y2,
  z2,
  x2,
  y2,
  z4,

  // top left face
  x3,
  y2,
  z2,
  x1,
  y2,
  z2,
  x1,
  y2,
  z3,
  x3,
  y2,
  z2,
  x1,
  y2,
  z3,
  x3,
  y2,
  z3,

  // bottom front face
  x4,
  y1,
  z3,
  x4,
  y1,
  z1,
  x1,
  y1,
  z1,
  x1,
  y1,
  z3,
  x4,
  y1,
  z3,
  x1,
  y1,
  z1,

  // bottom right face
  x2,
  y1,
  z4,
  x2,
  y1,
  z1,
  x4,
  y1,
  z1,
  x4,
  y1,
  z4,
  x2,
  y1,
  z4,
  x4,
  y1,
  z1,

  // bottom behind face
  x2,
  y1,
  z4,
  x3,
  y1,
  z4,
  x3,
  y1,
  z2,
  x2,
  y1,
  z4,
  x3,
  y1,
  z2,
  x2,
  y1,
  z2,

  // bottom left face
  x1,
  y1,
  z3,
  x1,
  y1,
  z2,
  x3,
  y1,
  z2,
  x3,
  y1,
  z3,
  x1,
  y1,
  z3,
  x3,
  y1,
  z2,
]);

function repeatColor(count, color) {
  const repeatedColors = [];
  for (let i = 0; i < count; i++) {
    repeatedColors.push(...color);
  }
  return repeatedColors;
}

export const rpColors = new Uint8Array([
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
]);
