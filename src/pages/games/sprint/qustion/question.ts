import { getWords } from '../../../../utils/api';
import { randomFalseWordSprint } from '../../../../utils/listener';
import { questionElement } from './question-html';

export class Question {
  img: string;
  nameEng: string;
  nameRus: string;
  constructor (img: string, nameEng: string, nameRus: string) {
    this.img = img;
    this.nameEng = nameEng;
    this.nameRus = nameRus;
  }
  async render() {
    return questionElement(this.img, this.nameEng, this.nameRus);
  }

  async after_render() {

  }
}
