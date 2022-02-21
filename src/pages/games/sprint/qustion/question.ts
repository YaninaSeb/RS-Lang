import { getWords } from '../../../../utils/api';
import { randomFalseWordSprint } from '../../../../utils/listener';
import { questionElement } from './question-html';

export class Question {
  nameEng: string;
  nameRus: string;
  constructor (nameEng: string, nameRus: string) {
    this.nameEng = nameEng;
    this.nameRus = nameRus;
  }
  async render() {
    return questionElement(this.nameEng, this.nameRus);
  }

  async after_render() {

  }
}
