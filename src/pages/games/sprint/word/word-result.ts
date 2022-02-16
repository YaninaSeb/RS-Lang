
import { wordResultElement } from './word-html';

export class WordResult {
  nameEng: string;
  nameRus: string;
  transcription: string;
  audioExample: string;
  constructor (transcription: string, nameEng: string, nameRus: string, audioExample: string) {
    this.transcription = transcription;
    this.nameEng = nameEng;
    this.nameRus = nameRus;
    this.audioExample = audioExample;
  }
  async render() {
    return wordResultElement(this.transcription, this.nameEng, this.nameRus, this.audioExample);
  }

  async after_render() {
  }
}
