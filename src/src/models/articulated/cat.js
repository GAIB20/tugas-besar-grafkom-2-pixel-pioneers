var cat = {
  RBody: {
    options: {
      position: [1,0,0]
    },
    children: {
      PBody: {
        options: {
          scale: [3, 1, 1],
        },
      },
      RHead: {
        options: {
          position: [-1.5, 0.8, 0],
        },
        children: {
          PHead: {
            options: {
              position: [0, 0, 0],
              scale: [1, 1, 1],
            },
          },
          PEarL: {
            options: {
              position: [-0.3, 0.5, 0.25],
              scale: [0.3, 0.3, 0.3],
              rotation: [0.785, 0, 0],
            },
          },
          PEarR: {
            options: {
              position: [-0.3, 0.5, -0.25],
              scale: [0.3, 0.3, 0.3],
              rotation: [0.785, 0, 0],
            },
          },
        },
      },
      RArmL: {
        options: {
          position: [-1.2, -0.5, 0.4],
        },
        children: {
          PArmL: {
            options: {
              position: [0, 0, 0],
              scale: [0.3, 1, 0.3],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RArmR: {
        options: {
          position: [-1.2, -0.5, -0.4],
        },
        children: {
          PArmR: {
            options: {
              position: [0, 0, 0],
              scale: [0.3, 1, 0.3],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RLegL: {
        options: {
          position: [1.2, -0.5, 0.4],
        },
        children: {
          PLegL: {
            options: {
              position: [0, 0, 0],
              scale: [0.3, 1, 0.3],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RLegR: {
        options: {
          position: [1.2, -0.5, -0.4],
        },
        children: {
          PLegR: {
            options: {
              position: [0, 0, 0],
              scale: [0.3, 1, 0.3],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RTail: {
        options: {
          position: [1.25, 0.25, 0],
          rotation: [0, 0, 0.2],
        },
        children: {
          PTail: {
            options: {
              position: [0.75, 0, 0],
              scale: [1.5, 0.3, 0.3],
            },
          },
        },
      },
    },
  },
};

export default cat;
