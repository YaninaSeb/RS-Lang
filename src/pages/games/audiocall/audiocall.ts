import { audioElement, renderAuidoCallStatistic, renderLevel, renderResultsTable, updateLevel } from './audiocall-html';
import './audiocall.scss';
import { array, arrayOfRandomNumbers, generateWords, randomWrongAnswer } from './utils/utils';
export let NUMBER_OF_ANSWER = 0;

export class AudioGame {
  async render() {
    return audioElement();
  }

  async after_render() {
    const answersBody = document.querySelector('.answers__body') as HTMLElement;
    const repeatButton = (document.querySelector('.repeat') as HTMLButtonElement);
    document.body.addEventListener('click', async (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList.contains('levels')) {
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
            NUMBER_OF_ANSWER++;
          } else {
            target.style.background = 'green';
            array[NUMBER_OF_ANSWER].choice = 'right';
            NUMBER_OF_ANSWER++;
          }
          if (NUMBER_OF_ANSWER === 20) {
            while (answersBody.firstChild) {
              answersBody.removeChild(answersBody.firstChild);
            }
            (document.querySelector('.audiocall-round') as HTMLElement).classList.add('hide');
            (document.querySelector('.audiocall-statistic') as HTMLElement).classList.remove('hide');
            renderAuidoCallStatistic();
          } else {
            setTimeout(updateLevel, 500);
          }
        }
      });
    }
    nextQuestion();

    repeatButton.addEventListener('click', async () => {
      (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('hide');
      (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
      NUMBER_OF_ANSWER = 0;
      await renderLevel(+repeatButton.value);
    });
  }
}
