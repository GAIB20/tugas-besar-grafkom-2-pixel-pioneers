// type AnimationTRS = {
//   translation?: [number, number, number];
//   rotation?: [number, number, number];
//   scale?: [number, number, number];
// }


// type AnimationPath = {
//   keyframe?: AnimationTRS;
//   children?: {
//       [childName: string]: AnimationPath;
//   }
// }


// type AnimationClip = {
//   name: string,
//   frames: AnimationPath[];
// }


// const testAnim: AnimationClip = {
//   name: "Fox Walking",
//   frames: [
//       // 0
//       {
//           keyframe: {
//               translation: [-0.5, 0, 0],
//               rotation: [0, 0, 0],
//           },
//           children: {
//               RHead: {
//                   keyframe: {
//                       translation: [0.75, 1.5, 0],
//                       rotation: [0, 0, 0],
//                   },
//               },
//               RTail: {
//                   keyframe: {
//                       translation: [-0.75, 1.5, 0],
//                       rotation: [0, 30, 0],
//                   },
//                   children: {
//                       RTailTip: {
//                           keyframes: {
//                               translation: [-0.5, 0, 0],
//                               rotation: [0, 0, 0],
//                           },
//                       }
//                   }
//               }
//           },
//       },
//       // 1
//       {
//           keyframe: {
//               translation: [-0.5, 0, 0],
//               rotation: [0, 0.5, 0],
//           },
//           children: {
//               RHead: {
//                   keyframes: {
//                       translation: [0.75, 1.5, 0],
//                       rotation: [0, 0, 0],
//                   },
//               },
//           },
//       },
//   ],
// };

let lastFrameTime;

// foxNode: Object3D. Sudah ditambahkan dalam scene
let foxAnim = new AnimationRunner('test/fox-anim.json', foxNode);
function runAnim(currentTime) {
    if (lastFrameTime === undefined) lastFrameTime = currentTime;
    const deltaSecond = (currentTime - lastFrameTime) / 1000;
    foxAnim.update(deltaSecond);
    // Tambahkan render update, animasi, dan lainnya di sini
    lastFrameTime = currentTime;
    requestAnimationFrame(runAnim);
}
requestAnimationFrame(runAnim);

class AnimationRunner {
    constructor(animFile, root, { fps = 30 } = {}) {
      this.isPlaying = false;
      this.fps = 30;
      this.currentFrame = 0;
      this.deltaFrame = 0;
      this.currentAnimation = undefined;
  
      this.currentAnimation = this.load(animFile);
      this.fps = fps;
      this.root = root;
    }
  
    get CurrentFrame() {
      return this.currentFrame;
    }
  
    get length() {
      return this.currentAnimation.frames.length;
    }
  
    get frame() {
      return this.currentAnimation.frames[this.currentFrame];
    }
  
    update(deltaSecond) {
      if (this.isPlaying) {
        this.deltaFrame += deltaSecond * this.fps;
        if (this.deltaFrame >= 1) {
          this.currentFrame = (this.currentFrame + Math.floor(this.deltaFrame)) % this.length;
          this.deltaFrame %= 1;
          this.updateSceneGraph();
        }
      }
    }
  
    updateSceneGraph() {
      const frame = this.frame;
      // Update scene graph with current frame
      // Use root as the parent and traverse according to the frame
    }
  
    load(animFile) {
      // Load animation from file
      return;
    }
  }
