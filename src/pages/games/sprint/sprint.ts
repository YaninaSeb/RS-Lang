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

    btnStart?.addEventListener('click', () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionQuestion?.classList.remove('close');
    });

    btnBack?.addEventListener('click', () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
    });
  }
}
