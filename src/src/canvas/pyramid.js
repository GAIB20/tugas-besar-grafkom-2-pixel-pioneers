function repeat(count, color) {
    const repeatedColors = [];
    for (let i = 0; i < count; i++) {
      repeatedColors.push(...color);
    }
    return repeatedColors;
  }

export const pyramidColor = new Uint8Array([
    // Front face
    ...repeat(18, [0,0,255]),
  
    // Back face
    ...repeat(18, [0,0,255]),
  
    // Side
    ...repeat(6, [0,0,255]),

    // Bottom
    ...repeat(6, [0,0,255]),

    // Inner Side
    ...repeat(6, [0,255,255]),

    // Inner Bottom
    ...repeat(6, [0,255,255]),

    // Rotated
    // Front face
    ...repeat(18, [0,0,255]),
  
    // Back face
    ...repeat(18, [0,0,255]),
  
    // Side
    ...repeat(6, [0,0,255]),

    // Bottom
    ...repeat(6, [0,0,255]),

    // Inner Side
    ...repeat(6, [0,255,255]),

    // Inner Bottom
    ...repeat(6, [0,255,255]),
  ]);

  export const pyramid = new Float32Array([
    // Front Face
    -45, -45,  5, //corner 1
    -30,  -30,  5, // inner 1
    0,   30,  0, // inner 2
  
    -45, -45, 5, // corner 1
    0, 30, 0, // inner 2
    0,  45,  0, //corner 2
  
    -45,-45, 5, //corner 1
    45,-45,5, // corner 3
    -30,-30,5, // inner 1
  
    30,-30, 5, // inner 3
    -30,-30,5, // inner 1
    45,-45,5, // corner 3
  
    30,-30, 5, // inner 3 
    45,-45,5, // corner 3
    0,30,0, // inner 2
  
    45,-45,5, // corner 3
    0,45, 0, // corner 2
    0,30,0, // inner 2
  
    // Back face
    -45, -45,  -5, //corner 1
    0,   30,  0, // inner 2
    -30,  -30,  -5, // inner 1
  
    -45, -45, -5, // corner 1
    0,  45,  0, //corner 2
    0, 30, 0, // inner 2
  
    -45,-45, -5, //corner 1
    -30,-30,-5, // inner 1
    45,-45,-5, // corner 3
  
    30,-30, -5, // inner 3
    45,-45,-5, // corner 3
    -30,-30,-5, // inner 1
  
    30,-30, -5, // inner 3 
    0,30,0, // inner 2
    45,-45,-5, // corner 3
  
    45,-45,-5, // corner 3
    0,30,0, // inner 2
    0,45, 0, // corner 2
  
    // Side  
    -45, -45, -5,
    -45, -45, 5,
    0, 45, 0,
  
    45, -45, 5,
    45, -45, -5,
    0, 45, 0,
  
    // Bottom
    -45, -45,  5,
    -45, -45,  -5,
    45, -45, 5,
  
    45, -45, -5,
    45, -45, 5,
    -45, -45, -5,
  
    // Inner side
  
    -30, -30, -5,
    0, 30, 0,
    -30, -30, 5,
  
    30, -30, 5,
    0, 30, 0,
    30, -30, -5,
  
    // Inner Bottom
    -30, -30,  5,
    30, -30, 5,
    -30, -30,  -5,
  
    30, -30, -5,
    -30, -30, -5,
    30, -30, 5,
    
    // Rotated
    // Front Face
    5, -45,  -45, //corner 1
    0,   30,  0, // inner 2
    5,  -30,  -30, // inner 1
  
    5, -45, -45, // corner 1
    0,  45,  0, //corner 2
    0, 30, 0, // inner 2
  
    5,-45, -45, //corner 1
    5,-30,-30, // inner 1
    5,-45,45, // corner 3
  
    5,-30, 30, // inner 3
    5,-45,45, // corner 3
    5,-30,-30, // inner 1
  
    5,-30, 30, // inner 3 
    0,30,0, // inner 2
    5,-45,45, // corner 3
  
    5,-45,45, // corner 3
    0,30,0, // inner 2
    0,45, 0, // corner 2
  
    // Back face
    -5, -45,  -45, //corner 1
    -5,  -30,  -30, // inner 1
    0,   30,  0, // inner 2
  
    -5, -45, -45, // corner 1
    0, 30, 0, // inner 2
    0,  45,  0, //corner 2
  
    -5,-45, -45, //corner 1
    -5,-45,45, // corner 3
    -5,-30,-30, // inner 1
  
    -5,-30, 30, // inner 3
    -5,-30,-30, // inner 1
    -5,-45,45, // corner 3
  
    -5,-30, 30, // inner 3 
    -5,-45,45, // corner 3
    0,30,0, // inner 2
  
    -5,-45,45, // corner 3
    0,45, 0, // corner 2
    0,30,0, // inner 2
  
    // Side
    -5, -45, -45,
    0, 45, 0,
    5, -45, -45,
  
    -5, -45, 45,
    5, -45, 45,
    0, 45, 0,
  
    // Βottom
    -5, -45,  -45,
    5, -45,  -45,
    5, -45, 45,
  
    -5, -45, 45,
    -5, -45, -45,
    5, -45, 45,
  
    // Inner side
  
    -5, -30, -30,
    5, -30, -30,
    0, 30, 0,
  
    5, -30, 30,
    -5, -30, 30,
    0, 30, 0,
  
    // Inner Βottom
    5, -30,  -30,
    -5, -30,  -30,
    5, -30, 30,
  
    -5, -30, 30,
    5, -30, 30,
    -5, -30, -30,
   
  ]);
  
  