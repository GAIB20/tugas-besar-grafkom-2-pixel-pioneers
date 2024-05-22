var cat = {
  RBody: {
    children: {
      PBody: {
        options: {
          scale: [3, 1, 1],
        },
      },
      RHead: {
        options: {
          position: [-1.5, 1, 0],
        },
        children: {
          PHead: {
            options: {
              position: [0, 0, 0],
              scale: [1,1,1],
            },
          },
          PEarL: {
            options: {
              position: [-0.3, 0.65, 0.2],
              scale: [0.3,0.3,0.3],
            },
          },
          PEarR: {
            options: {
              position: [-0.3, 0.65, -0.2],
              scale: [0.3,0.3,0.3],
            },
          },
        },
      },
      RArmL: {
        options: {
          position: [-1.2, -0.5, 0.5],
        },
        children: {
          PArmL: {
            options: {
              position: [0, 0, 0],
              scale: [0.5, 1, 0.5],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RArmR: {
        options: {
          position: [-1.2, -0.5, -0.5],
        },
        children: {
          PArmR: {
            options: {
              position: [0, 0, 0],
              scale: [0.5, 1, 0.5],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RLegL: {
        options: {
          position: [1.2, -0.5, 0.5],
        },
        children: {
          PLegL: {
            options: {
              position: [0, 0, 0],
              scale: [0.5, 1, 0.5],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RLegR: {
        options: {
          position: [1.2, -0.5, -0.5],
        },
        children: {
          PLegR: {
            options: {
              position: [0, 0, 0],
              scale: [0.5, 1, 0.5],
              rotation: [0, 0, 0],
            },
          },
        },
      },
      RTail: {
        options: {
          position: [1.25, 0.25, 0.5]
        },
        children: {
          PTail: {
            options: {
              position: [0.75,0,0],
              scale: [1.5,0.5,0.5],
              rotation: [0,0,0.2]
            },
          }
        },
      },
    },
  },
};

export default cat;
