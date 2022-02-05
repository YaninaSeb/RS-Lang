import { getWords } from '../../../utils/api';
import { renderSprintQuestion } from '../../../utils/listener';
import { Question } from './qustion';
import { sprintElement } from './sprint-html';
import './sprint.scss';

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

    const arrWords = await getWords(1, 1);
    console.log(arrWords);
    btnStart?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionQuestion?.classList.remove('close');
      const wordValues = await renderSprintQuestion(3, arrWords);
      console.log(wordValues)
      const questionInstance = new Question(wordValues.img, wordValues.nameEng, wordValues.nameRus);
      blockQuestion!.innerHTML = await questionInstance.render();
    });

    btnBack?.addEventListener('click', async() => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
    });

  }
}
