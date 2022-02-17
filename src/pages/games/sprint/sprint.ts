import { shuffle } from 'lodash';
import { getWords } from '../../../utils/api';
import { wordInterface } from '../../../utils/instance';
import {
  addRemoveWindow,
  answerAdd,
  renderSprintQuestion,
  timerSprint,
} from '../../../utils/listener';
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
    const resultAnswerArr: NodeListOf<HTMLElement> = document.querySelectorAll('.result__answer-item');
    const helpWord: HTMLElement | null = document.querySelector('.help__word');
    const helpPrase: HTMLElement | null = document.querySelector('.help__phrase');
    const blockResultTrue: HTMLElement | null = document.querySelector('.result__sprint-true');
    const blockResultFalse: HTMLElement | null = document.querySelector('.result__sprint-false');
    const blockResultWrap: HTMLElement | null = document.querySelector('.result__sprint');
    const btnPlayAgain: HTMLElement | null = document.querySelector('.btn__play-again');
    const selectGroup = document.getElementById('level__select') as HTMLSelectElement;
    
    let groupNumber = selectGroup.selectedIndex;
    let arrWords: wordInterface[] = [];
    for (let i = 1; i < 4; i++) {
      let arrWords1: wordInterface[] = await getWords(i, groupNumber);
      arrWords1.forEach(word => arrWords.push(word));
    }
    console.log(arrWords)
    //Выбор уровня
    selectGroup?.addEventListener('change', async() => {
      arrWords.splice(0, arrWords.length)
      groupNumber = selectGroup.selectedIndex;
      for (let i = 1; i < 4; i++) {
        let arrWords1: wordInterface[] = await getWords(i, groupNumber);
        arrWords1.forEach(word => arrWords.push(word));
      }
    })

    let wordValues: {
      img: string;
      nameEng: string;
      nameRus: string;
      answer: boolean;
      word: wordInterface
    }[] = [];
    let questionNumber = 0;
//Старт
    btnStart?.addEventListener('click', async () => {
      await timerSprint(blockTimer!, blockResultTrue!, blockResultFalse!, storeSprint.answers, sections, blockResultWrap!);
      wordValues = await Promise.all(
        arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word))
      );
      wordValues = shuffle(wordValues);
      addRemoveWindow(sections, sectionQuestion!);

      const questionInstance = new Question(
        wordValues[questionNumber].img,
        wordValues[questionNumber].nameEng,
        wordValues[questionNumber].nameRus
      );
      blockQuestion!.innerHTML = await questionInstance.render();
    });
//Выбор ответов
    blockAnswer!.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        await answerAdd(
          event,
          wordValues,
          storeSprint,
          arrWords,
          questionNumber,
          blockQuestinWrap!,
          blockScore!,
          resultAnswerArr
        );
        questionNumber++;
        const questionInstance = await new Question(
          wordValues[questionNumber].img,
          wordValues[questionNumber].nameEng,
          wordValues[questionNumber].nameRus
        );
        blockQuestion!.innerHTML = await questionInstance.render();
      }
    });
//Кнопка назад
    btnBack?.addEventListener('click', async () => {
      addRemoveWindow(sections, sectionMain!);
      storeSprint.answers.splice(0, storeSprint.answers.length);
      questionNumber = 0;
      blockTimer!.innerHTML = `01:00`;
      clearInterval(storeSprint.timer!);
    });
//Нажатие с помощью клавиатуры
    document.addEventListener('keydown', async (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const btnKeybord = event.key === 'ArrowLeft' ? 'false' : 'true';
        await answerAdd(
          event,
          wordValues,
          storeSprint,
          arrWords,
          questionNumber,
          blockQuestinWrap!,
          blockScore!,
          resultAnswerArr,
          btnKeybord
        );
        questionNumber++;
        const questionInstance = await new Question(
          wordValues[questionNumber].img,
          wordValues[questionNumber].nameEng,
          wordValues[questionNumber].nameRus
        );
        blockQuestion!.innerHTML = await questionInstance.render();
      }
    });
//Произношение слова в самом вопросе
    helpWord?.addEventListener('click', () => {
      const src = wordValues[questionNumber].word.audio;
      const audio = new Audio();
      audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
      audio.play();
    });
//Пример фразы в вопросе
    helpPrase?.addEventListener('click', (e) => {
      const src = wordValues[questionNumber].word.audioExample;
      const audio = new Audio();
      audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
      audio.play();
    })
//Произношение слова в результате игры
    blockResultWrap?.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement && e.target.dataset.sound) {  
        const src = e.target.dataset.sound;
        const audio = new Audio;
        audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
        audio.play();
      }
    })
    //Повтор игры
    btnPlayAgain?.addEventListener('click', () => {
      addRemoveWindow(sections, sectionMain!);
      console.log(storeSprint.allAnswersSprint);
    });
  }
}
