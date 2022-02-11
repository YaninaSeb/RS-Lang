import { statisticElement } from './statistic-html';
import './statistic.scss';

export class Statistic {
  async render() {
    return statisticElement();
  }

  async after_render() {
    
  }
}