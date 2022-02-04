import { audioElement } from './audiocall-html';
import './audiocall.scss';

export class AudioGame {
  async render() {
    return audioElement();
  }

  async after_render() {
  }
}
