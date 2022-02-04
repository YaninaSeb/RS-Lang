import './header.scss';
import { headerHTML } from './header-html';

export class Header {
  async render() {
    return headerHTML;
  }
  async after_render() {
    return;
  }
}
