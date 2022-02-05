import { audio, audioElement, renderAuidoCallStatistic, renderFirstLevel, renderResultsTable, updateLevel } from './audiocall-html';
import './audiocall.scss';
import { array, generateWords } from './utils/utils';
export let NUMBER_OF_ANSWER = 0;

export class AudioGame {
  async render() {
    return audioElement();
  }

  async after_render() {
    console.log(array);
    const firstButton = document.getElementById('first-level') as HTMLButtonElement;
    const answersBody = document.querySelector('.answers__body') as HTMLElement;
    document.body.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList.contains('levels')) {
        (document.querySelector('.audiocall .container') as HTMLElement).classList.add('hide');
        NUMBER_OF_ANSWER = 0;
      }
    }); 

    document.body.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.classList.contains('answers')) {
        const auidoButton = document.querySelector('.audio') as HTMLElement;
        const rightAnswer = auidoButton.getAttribute('data-word');
        const selected = target.value;
        if (selected !== rightAnswer) {
          target.style.background = 'red';
          array[NUMBER_OF_ANSWER].choice = 'wrong';
          NUMBER_OF_ANSWER++;
          if (NUMBER_OF_ANSWER === 6) {
            while (answersBody.firstChild) {
              answersBody.removeChild(answersBody.firstChild);
            }
            (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('audiocall-statistic-open');
            renderAuidoCallStatistic();
          } else {
            setTimeout(updateLevel, 500);
          }
        } else {
          target.style.background = 'green';
          array[NUMBER_OF_ANSWER].choice = 'right';
          NUMBER_OF_ANSWER++;
          if (NUMBER_OF_ANSWER === 6) {
            while (answersBody.firstChild) {
              answersBody.removeChild(answersBody.firstChild);
            }
            (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('audiocall-statistic-open');
            renderAuidoCallStatistic();
          } else {
            setTimeout(updateLevel, 500);
          }
        }
      }
    });

    firstButton.addEventListener('click', async () => {
      NUMBER_OF_ANSWER = 0;
      await renderFirstLevel();
      (document.querySelector('.audiocall__body') as HTMLElement).classList.remove('hide');
    });

    document.body.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('.statistic-audio')) {
        audio.play();
      }
    })
  }
}
