import '@tensorflow/tfjs';
import { BlazeFaceModel, load, NormalizedFace } from '@tensorflow-models/blazeface';

interface Renderer {
  render(...args: NormalizedFace[]): void;
}

export default class FaceDetector {
  private rafID: number = 0;

  private video: HTMLVideoElement;

  private model: BlazeFaceModel;

  private returnTensors = false;

  private renderer: Renderer;

  constructor(video: HTMLVideoElement, renderer: Renderer) {
    this.video = video;
    this.renderer = renderer;
  }

  private async renderPredictions() {
    const predictions = await this.model.estimateFaces(this.video, this.returnTensors);

    this.renderer.render(...predictions);

    this.rafID = requestAnimationFrame(this.renderPredictions.bind(this));
  }

  private async setupVideoSrc() {
    if (!navigator?.mediaDevices?.getUserMedia) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'user' },
      });
      this.video.srcObject = stream;
      await new Promise((resolve) => {
        this.video.onloadeddata = resolve;
      });
    } catch (error) {
      console.warn(error);
    }
  }

  async start() {
    if (!this.model) {
      this.model = await load();
    }
    await this.setupVideoSrc();
    this.rafID = requestAnimationFrame(this.renderPredictions.bind(this));
  }

  stop() {
    if (!this.rafID) return;
    cancelAnimationFrame(this.rafID);
    this.rafID = 0;
  }
}
