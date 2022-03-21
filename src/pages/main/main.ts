import { mainElement } from './main-html';
import './main.scss';

export class Main {
  async render() {
    return mainElement();
  }

  async after_render() {
  }
}
