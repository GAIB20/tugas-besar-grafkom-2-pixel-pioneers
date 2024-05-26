var obj = {
    RBody: {
      children: {
        PBody: {
          options: {
            scale: [3, 0.3, 0.3],
          },
        },
        RHead: {
            options: {
              position: [-1.5, 0, 0],
            },
            children: {
              PHead: {
                options: {
                  position: [0, 0, 0],
                  scale: [0.5, 0.5, 0.5],
                },
              },
              PEarL: {
                options: {
                  position: [0, 0.3, 0.1],
                  scale: [0.1, 0.3, 0.1],
                  rotation: [0, 0, 0],
                },
              },
              PEarR: {
                options: {
                  position: [0, 0.3, -0.1],
                  scale: [0.1, 0.3, 0.1],
                  rotation: [0, 0, 0],
                },
              },
            },
          },
        RWingL: {
          options: {
            position: [0, 0, 0.5],
          },
          children: {
            PWingL: {
              options: {
                position: [0, 0, 0],
                scale: [2.9, 0.1, 1],
                rotation: [0, 0, 0],
              },
            },
            PWingLA: {
                options: {
                    position: [-1.1, 0, 0.5],
                    scale: [0.5, 0.1, 0.5],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingLB: {
                options: {
                    position: [-0.4, 0, 0.5],
                    scale: [0.5, 0.1, 0.5],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingLC: {
                options: {
                    position: [0.5, 0, 0.5],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingLD: {
                options: {
                    position: [1, 0, 0.5],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingLE: {
                options: {
                    position: [-1.4, 0, 0.3],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingLF: {
                options: {
                    position: [1.55, 0, 0],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
          },
        },

        RWingR: {
            options: {
              position: [0, 0, -0.5],
            },
            children: {
              PWingR: {
                options: {
                  position: [0, 0, 0],
                  scale: [2.9, 0.1, 1],
                  rotation: [0, 0, 0],
                },
              },
            PWingRA: {
                options: {
                    position: [-1.1, 0, -0.5],
                    scale: [0.5, 0.1, 0.5],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingRB: {
                options: {
                    position: [-0.4, 0, -0.5],
                    scale: [0.5, 0.1, 0.5],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingRC: {
                options: {
                    position: [0.5, 0, -0.5],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingRD: {
                options: {
                    position: [1, 0, -0.5],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingRE: {
                options: {
                    position: [-1.4, 0, -0.3],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            PWingRF: {
                options: {
                    position: [1.55, 0, 0],
                    scale: [0.7, 0.1, 0.7],
                    rotation: [0, 0.75, 0],
                },
            },
            },
          },
        RTail: {
          options: {
            position: [1.25, 0.20, 0],
          },
          children: {
            PTail: {
              options: {
                position: [0.75, 0, 0],
                scale: [1, 0.1, 0.2],
                rotation: [0, 0, 0.2],
              },
            },
          },
        },
      },
    },
  };
  
  export default obj;
  