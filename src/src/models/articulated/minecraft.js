import { ArticulatedModel } from "../../primitives/ArticulatedModel";

var minecraft = {
  RBody: {
    children: {
      PBody: {
        options: {
          scale: [2, 3, 1],
        },
      },
      RHead: {
        options: {
          position: [0, 0, 0],
        },
        children: {
          PHead: {
            options: {
              position: [0, 2, 0],
              scale: [2, 2, 2],
            },
          },
        },
      },
      RArmL: {
        options: {
          position: [1, 1.3, -1],
        },
        children: {
          PArmR: {
            options: {
              position: [0.3, -1.5, 0],
              scale: [0.6, 3, 0.6],
              rotation: [-2, 0, 0],
            },
          },
        },
      },
      RArmR: {
        options: {
          position: [-1, 1.3, 1],
        },
        children: {
          PArmL: {
            options: {
              position: [-0.3, -1.5, 0],
              scale: [0.6, 3, 0.6],
              rotation: [1.5, 0, 0],
            },
          },
        },
      },
      RLegL: {
        options: {
          position: [-0.5, -1.5, -0.5],
        },
        children: {
          PLegL: {
            options: {
              position: [0, -1, 0],
              scale: [1, 2, 0.6],
              rotation: [-0.5, 0, 0],
            },
          },
        },
      },
      RLegR: {
        options: {
          position: [0.5, -1, 1],
        },
        children: {
          PLegR: {
            options: {
              position: [0, -1, 0],
              scale: [1, 2, 0.6],
              rotation: [1.5, 0, 0],
            },
          },
        },
      },
    },
  },
};

const model = ArticulatedModel.fromModel(minecraft);
model.scale.mul(40);
export default model;
