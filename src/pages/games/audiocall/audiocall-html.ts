import { arrayOfResults, NUMBER_OF_ANSWER } from './audiocall';
import { array, arrayOfRandomNumbers, generateWords, randomWrongAnswer, shuffleAnswers, Word } from './utils/utils';



export const renderLevel = async (group: number) => {
  await generateWords(group);
  randomWrongAnswer();
  arrayOfResults.push(array[NUMBER_OF_ANSWER]);
  const html = `
    <div class="right-word hide"></div>
    <div "onclick="document.getElementById('${array[NUMBER_OF_ANSWER].audio}-audio').play()" data-word="${array[NUMBER_OF_ANSWER].wordTranslate}" class="audio-audiocall-game">
      <audio autoplay id="${array[NUMBER_OF_ANSWER].audio}-audio" src="https://rs-lang25.herokuapp.com/${array[NUMBER_OF_ANSWER].audio}"></audio>
    </div>
    <div class="answers__container">
      <button data-number="Digit1" data-word="${array[NUMBER_OF_ANSWER].wordTranslate}" value="${array[NUMBER_OF_ANSWER].wordTranslate}" id="${array[NUMBER_OF_ANSWER].id}" class="answers answer1">${array[NUMBER_OF_ANSWER].wordTranslate}</button>
      <button data-number="Digit2" data-word="${array[arrayOfRandomNumbers[0]].wordTranslate}" value="${array[arrayOfRandomNumbers[0]].wordTranslate}" id="${array[arrayOfRandomNumbers[0]].id}" class="answers answer2">${array[arrayOfRandomNumbers[0]].wordTranslate}</button>
      <button data-number="Digit3" data-word="${array[arrayOfRandomNumbers[1]].wordTranslate}" value="${array[arrayOfRandomNumbers[1]].wordTranslate} id="${array[arrayOfRandomNumbers[1]].id}" class="answers answer3">${array[arrayOfRandomNumbers[1]].wordTranslate}</button>
      <button data-number="Digit4" data-word="${array[arrayOfRandomNumbers[2]].wordTranslate}" value="${array[arrayOfRandomNumbers[2]].wordTranslate} id="${array[arrayOfRandomNumbers[2]].id}" class="answers answer4">${array[arrayOfRandomNumbers[2]].wordTranslate}</button>
    </div>
  `;
  (document.querySelector('.answers__body') as HTMLElement).innerHTML = html;
  (document.querySelector('.audio-audiocall-game') as HTMLElement).addEventListener('click', () => {
  });
  shuffleAnswers();
};

export function updateLevel() {
  randomWrongAnswer();
  arrayOfResults.push(array[NUMBER_OF_ANSWER]);
  const html = `
    <div class="right-word hide"></div>
    <div onclick="document.getElementById('${array[NUMBER_OF_ANSWER].audio}-audio').play()" data-word="${array[NUMBER_OF_ANSWER].wordTranslate}" class="audio-audiocall-game">
      <audio autoplay id="${array[NUMBER_OF_ANSWER].audio}-audio" src="https://rs-lang25.herokuapp.com/${array[NUMBER_OF_ANSWER].audio}"></audio>
    </div>
    <div class="answers__container">
      <button data-number="Digit1" data-word="${array[NUMBER_OF_ANSWER].wordTranslate}" value="${array[NUMBER_OF_ANSWER].wordTranslate}" id="${array[NUMBER_OF_ANSWER].id}" class="answers answer1">${array[NUMBER_OF_ANSWER].wordTranslate}</button>
      <button data-number="Digit2" data-word="${array[arrayOfRandomNumbers[0]].wordTranslate}" value="${array[arrayOfRandomNumbers[0]].wordTranslate}" id="${array[arrayOfRandomNumbers[0]].id}" class="answers answer2">${array[arrayOfRandomNumbers[0]].wordTranslate}</button>
      <button data-number="Digit3" data-word="${array[arrayOfRandomNumbers[1]].wordTranslate}" value="${array[arrayOfRandomNumbers[1]].wordTranslate} id="${array[arrayOfRandomNumbers[1]].id}" class="answers answer3">${array[arrayOfRandomNumbers[1]].wordTranslate}</button>
      <button data-number="Digit4" data-word="${array[arrayOfRandomNumbers[2]].wordTranslate}" value="${array[arrayOfRandomNumbers[2]].wordTranslate}id="${array[arrayOfRandomNumbers[2]].id}" class="answers answer4">${array[arrayOfRandomNumbers[2]].wordTranslate}</button>
    </div>
  `;
  (document.querySelector('.answers__body') as HTMLElement).innerHTML = html;
  renderResultsTable();
  shuffleAnswers();
}


export const renderRightWord = async() => {
  const html = `
    <div class="right-word__body">
      <div class="right-word__img">
        <img src="https://rs-lang25.herokuapp.com/${array[NUMBER_OF_ANSWER].image}" alt="${array[NUMBER_OF_ANSWER].wordTranslate}">
      </div>
      <div class="right-word__description">
        <p class="right-word__text">${array[NUMBER_OF_ANSWER].word} <span>${array[NUMBER_OF_ANSWER].transcription}</span> - ${array[NUMBER_OF_ANSWER].wordTranslate}</p>
        <p class="right-word__text">${array[NUMBER_OF_ANSWER].textExample}</p>
      </div>
    </div>
  `;
  (document.querySelector('.right-word') as HTMLElement).innerHTML = html;
}


export const renderResultsTable = () => `
  <tbody>
      ${arrayOfResults.map((word: Word) => `
        <tr>
          <td onclick="document.querySelector('#${word.word}-audio').play()" class="statistic-audio"><audio id="${word.word}-audio" src="https://rs-lang25.herokuapp.com/${word.audio}"></audio></td>
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
        <table class="table">
        <caption>Результаты</caption>
          ${renderResultsTable()}
        </table>
  `;
  (document.querySelector('.audiocall-statistic__content') as HTMLElement).innerHTML = html;
}

export const audioElement = () => `
  <section class="audiocall">
    <div class="container">
      <div class="audiocall__body">
        <div class="audiocall-description">
          <h1 class="audiocall-title">Аудиовызов</h1>
          <div class="audiocall-text">Выберите из вариантов ответа правильный перевод слова, который услышите. 
            Можно использовать клавиши 1, 2, 3, 4 для ответа и Enter для перехода к следующему вопросу.</div>
          <div class="audiocall-levels">
            <button value="0" id="first-level" class="first-level levels">1</button>
            <button value="1" id="second-level" class="second-level levels">2</button>
            <button value="2" id="third-level" class="third-level levels">3</button>
            <button value="3" id="fourth-level" class="fourth-level levels">4</button>
            <button value="4" id="fifth-level" class="fifth-level levels">5</button>
            <button value="5" id="sixth-level" class="sixth-level levels">6</button>
          </div>
        </div>
        <div class="audiocall-description-frombook hide">
          <h1 class="audiocall-title">Аудиовызов</h1>
          <div class="audiocall-text">Выберите из вариантов ответа правильный перевод слова, который услышите. 
            Можно использовать клавиши 1, 2, 3, 4 для ответа и Enter для перехода к следующему вопросу.
          </div>
          <button class="audiocall-start">Начать</button>
        </div>   
      </div>
    </div>
    <div class="audiocall-round hide">
      <div class="container">
        <div class="answers__body"></div>
        <div class="next-button">
          <button class="next">Next</buuton>
        </div>
      </div>
    </div>
    <div class="audiocall-statistic hide">
      <div class="container">
        <div class="audiocall-statistic__body">
          <div class="audiocall-statistic__content"></div>
          <div class="results-buttons">
            <button value="" class="repeat after-game"></button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
