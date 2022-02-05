import { NUMBER_OF_ANSWER } from './audiocall';
import { array, generateWords, randomInteger, Word } from './utils/utils';

export const audio = new Audio();
audio.volume = 0.2;
let arrayOfResults: Word[] = [];

export const renderFirstLevel = async () => {
  await generateWords(0);
  arrayOfResults = [];
  arrayOfResults.push(array[NUMBER_OF_ANSWER]);
  audio.src = `https://raw.githubusercontent.com/BlackMamba51/react-rslang-be/main/${array[NUMBER_OF_ANSWER].audio}`;
  audio.play();
  const html = `
    <div data-word="${array[NUMBER_OF_ANSWER].word}" class="audio"></div>
    <div class="answers__container">
      <button value="${array[NUMBER_OF_ANSWER].word}" id="${array[NUMBER_OF_ANSWER].id}" class="answers">${array[NUMBER_OF_ANSWER].wordTranslate}</button>
      <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
      <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
      <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
    </div>
  `;
  (document.querySelector('.answers__body') as HTMLElement).innerHTML = html;
  (document.querySelector('.audio') as HTMLElement).addEventListener('click', () => {
    audio.play();
  });
};

export function updateLevel() {
  arrayOfResults.push(array[NUMBER_OF_ANSWER]);
  audio.src = `https://raw.githubusercontent.com/BlackMamba51/react-rslang-be/main/${array[NUMBER_OF_ANSWER].audio}`;
  audio.play();
  const html = `
  <div data-word="${array[NUMBER_OF_ANSWER].word}" class="audio"></div>
  <div class="answers__container">
    <button value="${array[NUMBER_OF_ANSWER].word}" id="${array[NUMBER_OF_ANSWER].id}" class="answers">${array[NUMBER_OF_ANSWER].wordTranslate}</button>
    <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
    <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
    <button value="${array[randomInteger(0, 19)].word}" id="${array[randomInteger(0, 19)].id}" class="answers">${array[randomInteger(0, 19)].wordTranslate}</button>
  </div>
  `;
  (document.querySelector('.answers__body') as HTMLElement).innerHTML = html;
  renderResultsTable();
}



export const renderResultsTable = () => `
  <tbody>
      ${arrayOfResults.map((word: Word) => `
        <tr>
          <td onclick="document.querySelector('#${word.word}-audio').play()" class="statistic-audio"><audio id="${word.word}-audio" src="https://raw.githubusercontent.com/BlackMamba51/react-rslang-be/main/${word.audio}"></audio></td>
          <td>${word.word}</td>
          <td>${word.transcription}</td>
          <td>${word.wordTranslate}</td>
          <td class="${word.choice}-choice"></td>
        </tr>
      `)}
  </tbody>
`;


export const renderAuidoCallStatistic = () => {
  const html = `
    <div class="audiocall-statistic__body">
      <div class="audiocall-statistic__content">
        <h2 class="statistic-title">Результаты</h2>
        <table class="table">
          ${renderResultsTable()}
        </table>
      </div>
    </div>
  `;
  (document.querySelector('.audiocall-statistic') as HTMLElement).innerHTML = html;
}

export const audioElement = () => `
  <section class="audiocall">
    <div class="container">
      <div class="audiocall__body">
        <div class="audiocall-description">
          <h1 class="audiocall-title">Аудиовызов</h1>
          <div class="audiocall-text">Выберите из вариантов ответа правильный перевод слова, который услышите</div>
          <div class="audiocall-levels">
            <button id="first-level" class="first-level levels">1</button>
            <button id="second-level" class="second-level levels">2</button>
            <button id="third-level" class="third-level levels">3</button>
            <button id="fourth-level" class="fourth-level levels">4</button>
            <button id="fifth-level" class="fifth-level levels">5</button>
            <button id="sixth-level" class="sixth-level levels">6</button>
          </div>
        </div>
      </div>
    </div>
    <div class="audiocall-round">
      <div class="audiocall-close"></div>
      <div class="container">
        <div class="answers__body hide">
        </div>
      </div>
    </div>
    <div class="audiocall-statistic">
      
    </div>
  </section>`;
