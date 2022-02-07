import { getWords } from '../../../utils/api';
import { wordInterface } from '../../../utils/instance';
import { randomFalseWordSprint, renderSprintQuestion } from '../../../utils/listener';
import { Question } from './qustion';
import { sprintElement } from './sprint-html';
import './sprint.scss';
import { storeSprint } from './storeSprint';

export class Sprint {
  async render() {
    return sprintElement();
  }

  async after_render() {
    const btnStart: HTMLElement | null = document.querySelector('.button__start');
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('.section');
    const sectionQuestion: HTMLElement | null = document.querySelector('.questions');
    const sectionMain: HTMLElement | null = document.querySelector('.main');
    const btnBack: HTMLElement | null = document.querySelector('.button__prev');
    const blockQuestion: HTMLElement | null = document.querySelector('.sprint__block-question');
    const blockAnswer: HTMLElement | null = document.querySelector('.wrap__answer-btn');
    const blockQuestinWrap: HTMLElement | null = document.querySelector('.wrap__question');


    const arrWords: wordInterface[] = await getWords(2, 1);
    btnStart?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionQuestion?.classList.remove('close');
      let i = 0;
      const wordValues = await Promise.all(arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word)));
      console.log(wordValues);  
      const questionInstance = new Question(wordValues[i].img, wordValues[i].nameEng, wordValues[i].nameRus);
      blockQuestion!.innerHTML = await questionInstance.render();
      blockAnswer?.addEventListener('click', async (event) => {
          if (event.target instanceof HTMLElement && event.target.dataset.answer) {
            const answer = event.target.dataset.answer === String(wordValues[i].answer);
            storeSprint.answers.push({ word: arrWords[i], answer: answer });
            answer ? blockQuestinWrap?.classList.add('questin__true') : blockQuestinWrap?.classList.add('questin__false');
            answer ? blockQuestinWrap?.classList.remove('questin__true') : blockQuestinWrap?.classList.remove('questin__false');
            i++;
            const questionInstance = new Question(wordValues[i].img, wordValues[i].nameEng, wordValues[i].nameRus);
            blockQuestion!.innerHTML = await questionInstance.render();
            console.log(storeSprint.answers)
          }
        }
      );
    });

    btnBack?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
    });

    const btnTrue: HTMLElement | null = document.querySelector('.btn__true');
  }
}
