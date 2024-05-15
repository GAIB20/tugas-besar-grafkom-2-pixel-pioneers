export const vertices = new Float32Array([
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
      0,   0,  30,
     30,   0,  30,
      0, 150,  30,
      0, 150,  30,
     30,   0,  30,
     30, 150,  30,

    // top rung back
     30,   0,  30,
    100,   0,  30,
     30,  30,  30,
     30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
     30,  60,  30,
     67,  60,  30,
     30,  90,  30,
     30,  90,  30,
     67,  60,  30,
     67,  90,  30,

    // top
      0,   0,   0,
    100,   0,   0,
    100,   0,  30,
      0,   0,   0,
    100,   0,  30,
      0,   0,  30,

    // top rung right
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // right of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // right of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0]);


export const colors = new Uint8Array([
        // left column front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // top rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // middle rung front
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,
      200,  70, 120,

        // left column back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // middle rung back
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,
      80, 70, 200,

        // top
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,
      70, 200, 210,

        // top rung right
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,
      200, 200, 70,

        // under top rung
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,
      210, 100, 70,

        // between top rung and middle
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,
      210, 160, 70,

        // top of middle rung
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,
      70, 180, 210,

        // right of middle rung
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,
      100, 70, 210,

        // bottom of middle rung.
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,
      76, 210, 100,

        // right of bottom
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,
      140, 210, 80,

        // bottom
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,
      90, 130, 110,

        // left side
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220,
      160, 160, 220])

    export const verticesCube = new Float32Array([
        // Front face
        -30.0, -30.0,  30.0,
         30.0, -30.0,  30.0,
         30.0,  30.0,  30.0,
        -30.0,  30.0,  30.0,
    
        // Back face
        -30.0, -30.0, -30.0,
        -30.0,  30.0, -30.0,
         30.0,  30.0, -30.0,
         30.0, -30.0, -30.0,
    
        // Top face
        -30.0,  30.0, -30.0,
        -30.0,  30.0,  30.0,
         30.0,  30.0,  30.0,
         30.0,  30.0, -30.0,
    
        // Bottom face
        -30.0, -30.0, -30.0,
         30.0, -30.0, -30.0,
         30.0, -30.0,  30.0,
        -30.0, -30.0,  30.0,
    
        // Right face
         30.0, -30.0, -30.0,
         30.0,  30.0, -30.0,
         30.0,  30.0,  30.0,
         30.0, -30.0,  30.0,
    
        // Left face
        -30.0, -30.0, -30.0,
        -30.0, -30.0,  30.0,
        -30.0,  30.0,  30.0,
        -30.0,  30.0, -30.0,
    ]);
    


    
  export const colorsCube = new Uint8Array([
        // Front face
        255,  0,  0,
        255,  0,  0,
        255,  0,  0,
        255,  0,  0,
        255,  0,  0,
        255,  0,  0,
    
        // Back face
        0, 255,  0,
        0, 255,  0,
        0, 255,  0,
        0, 255,  0,
        0, 255,  0,
        0, 255,  0,
    
        // Top face
        0,  0, 255,
        0,  0, 255,
        0,  0, 255,
        0,  0, 255,
        0,  0, 255,
        0,  0, 255,
    
        // Bottom face
        255, 255,  0,
        255, 255,  0,
        255, 255,  0,
        255, 255,  0,
        255, 255,  0,
        255, 255,  0,
    
        // Right face
        0, 255, 255,
        0, 255, 255,
        0, 255, 255,
        0, 255, 255,
        0, 255, 255,
        0, 255, 255,
    
        // Left face
        255,  0, 255,
        255,  0, 255,
        255,  0, 255,
        255,  0, 255,
        255,  0, 255,
        255,  0, 255,
    ]);


//   

export const verticesData = new Float32Array([
  // Front face
  -30, -30,  30, // Vertex 1
   30, -30,  30, // Vertex 2
   30,  30,  30, // Vertex 3
  -30,  30,  30, // Vertex 4
  -30, -30,  30, // Vertex 5 (Repeated from front face)
   30,  30,  30, // Vertex 6 (Repeated from front face)

  // Back face
   30,  30, -30, // Vertex 9
   30, -30, -30, // Vertex 8
  -30, -30, -30, // Vertex 7
  -30,  30, -30, // Vertex 10
   30,  30, -30, // Vertex 11 (Repeated from back face)
  -30, -30, -30, // Vertex 12 (Repeated from back face)

  // Top face
  -30,  30, -30, // Vertex 10 (Shared with back face)
   30,  30, -30, // Vertex 9 (Shared with back face)
   30,  30,  30, // Vertex 6 (Shared with front face)
  -30,  30,  30, // Vertex 5 (Shared with front face)
  -30,  30, -30, // Vertex 10 (Shared with back face)
   30,  30,  30, // Vertex 3 (Shared with front face)

  // Bottom face
   30, -30,  30, // Vertex 2 (Shared with front face)
   30, -30, -30, // Vertex 8 (Shared with back face)
  -30, -30, -30, // Vertex 7 (Shared with back face)
  -30, -30,  30, // Vertex 1 (Shared with front face)
   30, -30,  30, // Vertex 2 (Shared with front face)
  -30, -30, -30, // Vertex 7 (Shared with back face)

  // Right face
   30,  30,  30, // Vertex 6 (Shared with front face)
   30, -30, 30, // Vertex 9 (Shared with back face)
   30, -30, -30, // Vertex 8 (Shared with back face)
   30,  30,  30, // Vertex 3 (Shared with front face)
   30, -30, -30, // Vertex 8 (Shared with back face)
   30,  30, -30, // Vertex 2 (Shared with front face)

  // Left face
  -30, -30, -30, // Vertex 7 (Shared with back face)
  -30, -30,  30, // Vertex 1 (Shared with front face)
  -30,  30,  30, // Vertex 4 (Shared with front face)
  -30,  30, -30, // Vertex 10 (Shared with back face)
  -30, -30, -30, // Vertex 7 (Shared with back face)
  -30,  30,  30, // Vertex 4 (Shared with front face)
]);


    