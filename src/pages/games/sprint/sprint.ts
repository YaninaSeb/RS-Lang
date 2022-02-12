import { getWords } from '../../../utils/api';
import { wordInterface } from '../../../utils/instance';
import { answerAdd, randomFalseWordSprint, renderSprintQuestion, timerSprint } from '../../../utils/listener';
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
    const blockTimer: HTMLElement | null = document.querySelector('.timer__sprint');
    const blockScore: HTMLElement | null = document.querySelector('.score__sprint');

    let arrWords: wordInterface[] = [];
    let wordValues: {
      img: string;
      nameEng: string;
      nameRus: string;
      answer: boolean;
    }[] = [];
    let questionNumber = 0;

    btnStart?.addEventListener('click', async () => {
      timerSprint(blockTimer!);
      arrWords = await getWords(1, 1);
      console.log(arrWords);
      wordValues = await Promise.all(
        arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word))
      );
      sections.forEach((section) => section.classList.add('close'));
      sectionQuestion?.classList.remove('close');
      const questionInstance = new Question(
        wordValues[questionNumber].img,
        wordValues[questionNumber].nameEng,
        wordValues[questionNumber].nameRus
      );
      blockQuestion!.innerHTML = await questionInstance.render();
    });

    blockAnswer!.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        await answerAdd(
          event,
          wordValues,
          storeSprint,
          arrWords,
          questionNumber,
          blockQuestinWrap!,
          blockScore!
        );
        questionNumber++;
        const questionInstance = await new Question(
          wordValues[questionNumber].img,
          wordValues[questionNumber].nameEng,
          wordValues[questionNumber].nameRus
        );
        blockQuestion!.innerHTML = await questionInstance.render();
        console.log(storeSprint.correctAnswers);
      }
    });

    btnBack?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
      storeSprint.answers.splice(0, storeSprint.answers.length);
      questionNumber = 0;
      blockTimer!.innerHTML = `01:00`;
      clearInterval(storeSprint.timer!);
    });
  }
}
