import { bookElement } from './book-html';
import './book.scss';
import { getWords } from './book-api';

export class Book {
  async render() {
    return bookElement();
  }

  async after_render() {
    const containerWords = <HTMLElement>document.querySelector('.container-words');
    const arrWords = await getWords(1, 1);

    for (let i = 0; i < arrWords.length; i++) {
      containerWords.innerHTML += `
        <div class="card-word" data-group="${arrWords[i].group}" data-page="${arrWords[i].page}" id="${arrWords[i].id}">
          <div class="img-word"> 
            <img src="${arrWords[i].image}" alt="img">
          </div>
          <div class="description-word">
            <div class="word-en">${arrWords[i].word} - ${arrWords[i].transcription} - ${arrWords[i].wordTranslate}</div>
            <div class="sentence-one-en">${arrWords[i].textExample}</div>
            <div class="sentence-one-ru">${arrWords[i].textExampleTranslate}</div>
            <div class="sentence-two-en">${arrWords[i].textMeaning}</div>
            <div class="sentence-two-ru">${arrWords[i].textMeaningTranslate}</div>
          </div>
        </div>
      `
    }

  }
}