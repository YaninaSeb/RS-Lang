import { Error404Element } from './error404-html';

export class Error404 {
  async render() {
    return Error404Element;
  }

  async after_render() {
    return;
  }
}
