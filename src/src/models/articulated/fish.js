import { ArticulatedModel } from "../../primitives/ArticulatedModel";

var fish = {
  RBody: {
    children: {
      PBody: {
        options: {
          scale: [0.66, 0.9, 1.41],
          position: [-1, 0.2, -0.363],
        },
      },
      RTopHead: {
        options: {
          position: [-1, 0.43, 0.71],
        },
        children: {
          PTopHead: {
            options: {
              scale: [1, 0.53, 1],
            },
          },
        },
      },
      RBottomHead: {
        options: {
          position: [-1, -0.22, 0.51],
        },
        children: {
          PBottomHead: {
            options: {
              scale: [1, 0.14, 0.47],
              rotation: [-1, 0, 0],
            },
          },
        },
      },
      RPreTail: {
        options: {
          position: [-1, 0.2, -1.2],
        },
        children: {
          PPreTail: {
            options: {
              scale: [0.29, 0.41, 0.42],
            },
          },
        },
      },
      RTail: {
        options: {
          position: [-1, 0.2, -1.74],
        },
        children: {
          PTail: {
            options: {
              scale: [0.19, 0.68, 0.63],
            },
          },
        },
      },
      RRightFin: {
        options: {
          position: [-0.4, -0.026, -0.143],
        },
        children: {
          PRightFin: {
            options: {
              scale: [0.81, 0.14, 0.41],
              rotation: [0, 0, 22.93],
            },
          },
        },
      },
      RLeftFin: {
        options: {
          position: [-1.6, -0.026, -0.143],
        },
        children: {
          PLeftFin: {
            options: {
              scale: [0.81, 0.14, 0.41],
              rotation: [0, 0, -22.93],
            },
          },
        },
      },
      RTopFin: {
        options: {
          position: [-1, 0.75, -0.413],
        },
        children: {
          PTopFin: {
            options: {
              scale: [0.04, 0.33, 0.64],
            },
          },
        },
      },
    },
  },
};

// const model = ArticulatedModel.fromModel(fish);
// model.scale.mul(40);
// export default model;

export default fish;