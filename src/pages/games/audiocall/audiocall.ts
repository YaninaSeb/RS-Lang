import HtmlWebpackPlugin = require('html-webpack-plugin');
import { audioElement, renderAuidoCallStatistic, renderLevel, renderResultsTable, renderRightWord, updateLevel } from './audiocall-html';
import './audiocall.scss';
import { array, arrayOfRandomNumbers, generateWords, randomWrongAnswer, showRightWord, Word } from './utils/utils';
export let NUMBER_OF_ANSWER = 0;
export let arrayOfResults: Word[] = [];
export class AudioGame {
  async render() {
    return audioElement();
  }

  async after_render() {

    const answersBody = document.querySelector('.answers__body') as HTMLElement;
    const repeatButton = (document.querySelector('.repeat') as HTMLButtonElement);
    const nextButton = (document.querySelector('.next-button') as HTMLButtonElement);
    function openLevels() {
      (document.querySelector('.audiocall') as HTMLElement).addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.classList.contains('levels')) {
          arrayOfResults = [];
          (document.querySelector('.audiocall .container') as HTMLElement).classList.add('hide');
          NUMBER_OF_ANSWER = 0;
          while (answersBody.firstChild) {
            answersBody.removeChild(answersBody.firstChild);
          }
          repeatButton.value = target.value;
          await renderLevel(+target.value);
          (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
        }
      }); 
    }
    openLevels();
    if ((document.querySelector('.audiocall-round') as HTMLElement).classList.contains('hide')) {
      NUMBER_OF_ANSWER = 0;
    };
    function nextQuestion() {
      const answersBody = document.querySelector('.answers__body') as HTMLElement;
      (document.querySelector('.answers__body') as HTMLElement).addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.classList.contains('answers')) {
          const auidoButton = document.querySelector('.audio') as HTMLElement;
          const rightAnswer = auidoButton.getAttribute('data-word');
          const selected = target.value;
          if (selected !== rightAnswer) {
            target.style.background = 'red';
            array[NUMBER_OF_ANSWER].choice = 'wrong';
            showRightWord();
          } else {
            target.style.background = 'green';
            array[NUMBER_OF_ANSWER].choice = 'right';
            showRightWord();
          }
        }
      });
    }
    document.addEventListener('keydown', (event) => {
      document.querySelectorAll('.answers').forEach((element) => {
        if (element.getAttribute('data-number') === event.code) {
          const auidoButton = document.querySelector('.audio') as HTMLElement;
          const button = ((document.querySelector('.answers__container') as HTMLElement)?.children[Number(`${event.code.split('')[5]}`) - 1]);
          const rightAnswer = auidoButton.getAttribute('data-word');
          const selected = button.getAttribute('data-word');
          if (selected !== rightAnswer) {
            button.classList.add('wrong-answer');
            array[NUMBER_OF_ANSWER].choice = 'wrong';
            showRightWord();
          } else {
            button.classList.add('right-answer');
            array[NUMBER_OF_ANSWER].choice = 'right';
            showRightWord();
          }
        }
      });
    });
    nextQuestion();

    repeatButton.addEventListener('click', async () => {
      arrayOfResults = [];
      (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('hide');
      (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
      NUMBER_OF_ANSWER = 0;
      updateLevel();
    });
    nextButton.addEventListener('click', function() {
      NUMBER_OF_ANSWER++;
      array[NUMBER_OF_ANSWER].choice = 'wrong';
      updateLevel();
      if (NUMBER_OF_ANSWER === 19) {
        while (answersBody.firstChild) {
          answersBody.removeChild(answersBody.firstChild);
        }
        (document.querySelector('.audiocall-round') as HTMLElement).classList.add('hide');
        (document.querySelector('.audiocall-statistic') as HTMLElement).classList.remove('hide');
        renderAuidoCallStatistic();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        NUMBER_OF_ANSWER++;
        array[NUMBER_OF_ANSWER].choice = 'wrong';
        updateLevel();
        if (NUMBER_OF_ANSWER === 19) {
          while (answersBody.firstChild) {
            answersBody.removeChild(answersBody.firstChild);
          }
          (document.querySelector('.audiocall-round') as HTMLElement).classList.add('hide');
          (document.querySelector('.audiocall-statistic') as HTMLElement).classList.remove('hide');
          renderAuidoCallStatistic();
       }
      }
    });
  }
}
