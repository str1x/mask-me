import { NormalizedFace } from '@tensorflow-models/blazeface';

export default class MaskRenderer {
  private ctx: RenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d', {
      antialias: true,
      alpha: true,
      depth: true,
    });
  }

  render(...faces: NormalizedFace[]) {
    // console.log(faces);
  }

  cleanContext() {
    this.ctx = undefined;
  }
}
