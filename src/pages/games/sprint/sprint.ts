import { shuffle } from 'lodash';
import { getWords } from '../../../utils/api';
import { wordInterface } from '../../../utils/instance';
import {
  addAllWordsGroup,
  addRemoveWindow,
  addWordsResult,
  answerAdd,
  removeClassTotal,
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
    const resultAnswerArr: NodeListOf<HTMLElement> =
      document.querySelectorAll('.result__answer-item');
    const helpWord: HTMLElement | null = document.querySelector('.help__word');
    const helpPrase: HTMLElement | null = document.querySelector('.help__phrase');
    const blockResultTrue: HTMLElement | null = document.querySelector('.result__sprint-true');
    const blockResultFalse: HTMLElement | null = document.querySelector('.result__sprint-false');
    const blockResultWrap: HTMLElement | null = document.querySelector('.result__sprint');
    const btnPlayAgain: HTMLElement | null = document.querySelector('.btn__play-again');
    const selectGroup = document.getElementById('level__select') as HTMLSelectElement;
    const timerStart: HTMLElement | null = document.querySelector('.timer__start');
    const timerStartWrap: HTMLElement | null = document.querySelector('.timer__start-section');

    let groupNumber = selectGroup.selectedIndex;
    let arrWords: wordInterface[] = [];
    //Выбор уровня
    selectGroup?.addEventListener('change', async () => {
      groupNumber = selectGroup.selectedIndex;
    });

    let wordValues: {
      img: string;
      nameEng: string;
      nameRus: string;
      answer: boolean;
      word: wordInterface;
    }[] = [];
    let questionNumber = 0;

    //Старт
    btnStart?.addEventListener('click', async() => {
      let count = 5;
      addRemoveWindow(sections, timerStartWrap!);
        timerStart!.innerHTML = String(count);
        
      const timer = setInterval(async() => {
        count--;
        addRemoveWindow(sections, timerStartWrap!);
        timerStart!.innerHTML = String(count);
        if (count === 0) {
          clearInterval(timer);
          blockScore!.innerHTML = '0';
          await timerSprint(
            blockTimer!,
            blockResultTrue!,
            blockResultFalse!,
            storeSprint.answers,
            sections,
            blockResultWrap!,
            resultAnswerArr
          );
          wordValues = arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word));
          wordValues = shuffle(wordValues);
          addRemoveWindow(sections, sectionQuestion!);
    
          const questionInstance = new Question(
            wordValues[questionNumber].img,
            wordValues[questionNumber].nameEng,
            wordValues[questionNumber].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        }
      }, 1000)
      arrWords = await Promise.all([await getWords(1, groupNumber), await getWords(2, groupNumber), await getWords(3, groupNumber),
        await getWords(4, groupNumber), await getWords(5, groupNumber), await getWords(6, groupNumber),
        await getWords(7, groupNumber), await getWords(8, groupNumber), await getWords(9, groupNumber),
        await getWords(10, groupNumber), await getWords(11, groupNumber), await getWords(12, groupNumber),
        await getWords(13, groupNumber), await getWords(4, groupNumber), await getWords(15, groupNumber),
        await getWords(16, groupNumber), await getWords(17, groupNumber), await getWords(18, groupNumber),
        await getWords(19, groupNumber), await getWords(20, groupNumber),]).then(response => response.flat());
        console.log(arrWords);
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
        if (questionNumber === wordValues.length) {
          clearInterval(storeSprint.timer!);
          addWordsResult(blockResultTrue!, blockResultFalse!, storeSprint.answers);
          addRemoveWindow(sections, blockResultWrap!);
          removeClassTotal(storeSprint, resultAnswerArr);
          storeSprint.points = 0;
          storeSprint.answers.splice(0, storeSprint.answers.length);
        }
        const questionInstance = await new Question(
          wordValues[questionNumber].img,
          wordValues[questionNumber].nameEng,
          wordValues[questionNumber].nameRus
        );
        blockQuestion!.innerHTML = await questionInstance.render();
      }
    });
    blockAnswer!.addEventListener('mousedown', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        event.target.classList.add('activ__btn');
      }
    })
    blockAnswer!.addEventListener('mouseup', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        event.target.classList.remove('activ__btn');
      }
    })
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
      if ((event.key === 'ArrowRight' || event.key === 'ArrowLeft') && !sectionQuestion?.classList.contains('close')) {
        if(event.key === 'ArrowRight') document.querySelector('.btn__true')?.classList.add('activ__btn');
        if(event.key === 'ArrowLeft') document.querySelector('.btn__false')?.classList.add('activ__btn');
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
    document.addEventListener('keyup', async (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if(event.key === 'ArrowRight') document.querySelector('.btn__true')?.classList.remove('activ__btn');
        if(event.key === 'ArrowLeft') document.querySelector('.btn__false')?.classList.remove('activ__btn');
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
    });
    //Произношение слова в результате игры
    blockResultWrap?.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement && e.target.dataset.sound) {
        const src = e.target.dataset.sound;
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
        audio.play();
      }
    });
    //Повтор игры
    btnPlayAgain?.addEventListener('click', () => {
      addRemoveWindow(sections, sectionMain!);
    });
  }
}
