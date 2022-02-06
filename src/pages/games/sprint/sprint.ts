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
    const blockStart: HTMLElement | null = document.querySelector('.wrap__start');

    const arrWords: wordInterface[] = await getWords(2, 1);
    btnStart?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionQuestion?.classList.remove('close');
      let i = 0;
      const wordValues = await Promise.all(arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word)));
      console.log(wordValues)
      //const wordValues = await renderSprintQuestion(2, arrWords);
      // const questionInstance = new Question(wordValues[2].img, wordValues[2].nameEng, wordValues.nameRus);
      // blockQuestion!.innerHTML = await questionInstance.render();
      // blockAnswer?.addEventListener(
      //   'click',
      //   (event) => {
      //     if (event.target instanceof HTMLElement && event.target.dataset.answer) {
      //       const answer = event.target.dataset.answer === String(wordValues.answer);
      //       storeSprint.answers.push({ word: arrWords[2], answer: answer });
      //       i++;
      //       console.log(i)
      //     }
      //   },
      //   { once: true }
      // );
    });

    btnBack?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
    });

    const btnTrue: HTMLElement | null = document.querySelector('.btn__true');
  }
}
