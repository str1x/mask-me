interface FacePrediction {
  bottomRight: [number, number],
  topLeft: [number, number],
  probability: number,
  landmarks: number[][],
}

export default class MaskRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.width = 640;
    this.ctx.canvas.height = 480;
  }

  render(...faces: FacePrediction[]) {
    const { ctx } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    faces.forEach((face) => {
      const width = face.bottomRight[0] - face.topLeft[0];
      const height = face.bottomRight[1] - face.topLeft[1];
      const [rightEye, leftEye] = face.landmarks;

      ctx.beginPath();
      ctx.rect(...face.topLeft, width, height);
      ctx.strokeStyle = 'green';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightEye[0], rightEye[1], 3, 0, 2 * Math.PI);
      ctx.arc(leftEye[0], leftEye[1], 3, 0, 2 * Math.PI);
      ctx.strokeStyle = 'green';
      ctx.stroke();
    });
  }

  cleanContext() {
    this.ctx = undefined;
  }
}
