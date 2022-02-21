import { shuffle } from 'lodash';
import { getWords } from '../../../utils/api';
import { userWordSprint, wordInterface, wordValuesInterface } from '../../../utils/instance';
import {
  addRemoveWindow,
  addWordsResult,
  answerAdd,
  removeClassTotal,
  renderSprintQuestion,
  timerSprint,
} from '../../../utils/listener';
import { dataUser } from '../../authorization/users-api';
import { getUserWords, infoBook } from '../../book/book-api';
import { DayStatistic, getUserStatistic, userStatistic } from '../../statistic/statistic-api';
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
    const soundOn: HTMLElement | null = document.querySelector('.sound__on');
    const soundOff: HTMLElement | null = document.querySelector('.sound__off');
    const wrapContener: HTMLElement | null = document.querySelector('.wrap__game');
    const btnFullScreen: HTMLElement | null = document.querySelector('.button__full');

    let groupNumber = selectGroup.selectedIndex;
    let arrWords: wordInterface[] = [];
    let additionWords: wordInterface[] = [];
    let learnedWords: userWordSprint[] = [];
    let dificeltyAnswer: userWordSprint[] = [];
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
    let additionWordValues: {
      img: string;
      nameEng: string;
      nameRus: string;
      answer: boolean;
      word: wordInterface;
    }[] = [];
    let questionNumber = 0;
    let questionNumberAddition = 0;
    //Старт
    btnStart?.addEventListener('click', async () => {
      storeSprint.numberTrueAnswer = 0;
      storeSprint.allAnswersInRaund = 0;
      additionWords.splice(0, additionWords.length);
      let count = 8;
      addRemoveWindow(sections, timerStartWrap!);
      timerStart!.innerHTML = String(count);

      const timer = setInterval(async () => {
        count--;
        addRemoveWindow(sections, timerStartWrap!);
        timerStart!.innerHTML = String(count);
        if (count > 0) {
          const audio = new Audio();
          audio.src = './../assets/sound-sprint/zvuk-otvet-zaschitan-galochka-5193-1-1.mp3';
          audio.autoplay = true;
        }
        if (count < 0) {
          clearInterval(timer);
          blockScore!.innerHTML = '0';
          await timerSprint(
            blockTimer!,
            blockResultTrue!,
            blockResultFalse!,
            storeSprint.answers,
            sections,
            blockResultWrap!,
            resultAnswerArr,arrWords
          );
          wordValues = await arrWords.map((word, id) => renderSprintQuestion(id, arrWords, word));
          addRemoveWindow(sections, sectionQuestion!);
          additionWordValues = additionWords.map((word, id) =>
          renderSprintQuestion(id, additionWords, word)
        );
        if (infoBook.isFromBook) {
          for (let i = 0; i < learnedWords.length; i++) {
            wordValues = wordValues.filter((word: wordValuesInterface) => word.word.id !== learnedWords[i].wordId);
            additionWordValues = additionWordValues.filter((word: wordValuesInterface) => word.word.id !== learnedWords[i].wordId);
          }
        }
        additionWordValues = shuffle(additionWordValues);
        wordValues = shuffle(wordValues);
          const questionInstance = new Question(
            wordValues[questionNumber].nameEng,
            wordValues[questionNumber].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        }
      }, 1000);
      if (dataUser.userId != '') {
        const arr = await getUserWords(dataUser.userId).finally();
        dificeltyAnswer = arr.filter((word: userWordSprint) => word.difficulty === 'hard');
        learnedWords = arr.filter((word: userWordSprint) => word.difficulty === "learned");
      }
      if (!infoBook.isFromBook) {
        arrWords = await Promise.all([
          await getWords(1, groupNumber),
          await getWords(2, groupNumber),
          await getWords(3, groupNumber),
          await getWords(4, groupNumber),
          await getWords(5, groupNumber),
          await getWords(6, groupNumber),
          await getWords(7, groupNumber),
          await getWords(8, groupNumber),
          await getWords(9, groupNumber),
          await getWords(10, groupNumber),
          await getWords(11, groupNumber),
          await getWords(12, groupNumber),
          await getWords(13, groupNumber),
          await getWords(4, groupNumber),
          await getWords(15, groupNumber),
          await getWords(16, groupNumber),
          await getWords(17, groupNumber),
          await getWords(18, groupNumber),
          await getWords(19, groupNumber),
          await getWords(0, groupNumber),
        ]).then((response) => response.flat());
      } else {
        let group = infoBook.group - 1;
        let page = infoBook.page - 1;
        arrWords = await getWords(page, group);
        for (let i = 0; i < page; i++) {
          let arrWordAdition = await getWords(i, group);
          arrWordAdition.forEach((word: wordInterface) => additionWords.push(word));
        }
      }
      
    });


    //Выбор ответов
    blockAnswer!.addEventListener('click', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        if (questionNumber !== wordValues.length - 1) {
          await answerAdd(
            event,
            wordValues,
            storeSprint,
            questionNumber,
            blockQuestinWrap!,
            blockScore!,
            resultAnswerArr,
            learnedWords
          );
          questionNumber++;
          const questionInstance = await new Question(
            wordValues[questionNumber].nameEng,
            wordValues[questionNumber].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        } else if (questionNumber === wordValues.length - 1 && additionWords.length !== 0) {
          if (questionNumberAddition === 0) {
            const questionInstance = new Question(
              additionWordValues[questionNumberAddition].nameEng,
              additionWordValues[questionNumberAddition].nameRus
            );
            blockQuestion!.innerHTML = await questionInstance.render();
          }
          await answerAdd(
            event,
            additionWordValues,
            storeSprint,
            questionNumberAddition,
            blockQuestinWrap!,
            blockScore!,
            resultAnswerArr,
            learnedWords
          );
          questionNumberAddition++;
          if (questionNumberAddition === additionWordValues.length) {
            clearInterval(storeSprint.timer!);
            addWordsResult(blockResultTrue!, blockResultFalse!, storeSprint, arrWords);
            addRemoveWindow(sections, blockResultWrap!);
            removeClassTotal(storeSprint, resultAnswerArr);
            storeSprint.points = 0;
            storeSprint.answers.splice(0, storeSprint.answers.length);
            questionNumberAddition = 0;
            questionNumber = 0;
          }
          const questionInstance = await new Question(
            additionWordValues[questionNumberAddition].nameEng,
            additionWordValues[questionNumberAddition].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        } else {
          clearInterval(storeSprint.timer!);
          addWordsResult(blockResultTrue!, blockResultFalse!, storeSprint, arrWords);
          addRemoveWindow(sections, blockResultWrap!);
          removeClassTotal(storeSprint, resultAnswerArr);
          storeSprint.points = 0;
          storeSprint.answers.splice(0, storeSprint.answers.length);
          questionNumberAddition = 0;
          questionNumber = 0;
        }
      }
    });
    //
    blockAnswer!.addEventListener('mousedown', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        event.target.classList.add('activ__btn');
      }
    });
    blockAnswer!.addEventListener('mouseup', async (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.answer) {
        event.target.classList.remove('activ__btn');
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
      if (
        (event.key === 'ArrowRight' || event.key === 'ArrowLeft') &&
        !sectionQuestion?.classList.contains('close')
      ) {
        if (event.key === 'ArrowRight')
          document.querySelector('.btn__true')?.classList.add('activ__btn');
        if (event.key === 'ArrowLeft')
          document.querySelector('.btn__false')?.classList.add('activ__btn');
        const btnKeybord = event.key === 'ArrowLeft' ? 'false' : 'true';
        if (questionNumber !== wordValues.length - 1) {
          await answerAdd(
            event,
            wordValues,
            storeSprint,
            questionNumber,
            blockQuestinWrap!,
            blockScore!,
            resultAnswerArr,
            learnedWords
          );
          questionNumber++;
          const questionInstance = await new Question(
            wordValues[questionNumber].nameEng,
            wordValues[questionNumber].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        } else if (questionNumber === wordValues.length - 1 && additionWords.length !== 0) {
          if (questionNumberAddition === 0) {
            const questionInstance = new Question(
              additionWordValues[questionNumberAddition].nameEng,
              additionWordValues[questionNumberAddition].nameRus
            );
            blockQuestion!.innerHTML = await questionInstance.render();
          }
          await answerAdd(
            event,
            additionWordValues,
            storeSprint,
            questionNumberAddition,
            blockQuestinWrap!,
            blockScore!,
            resultAnswerArr,
            learnedWords
          );
          questionNumberAddition++;
          if (questionNumberAddition === additionWordValues.length) {
            clearInterval(storeSprint.timer!);
            addWordsResult(blockResultTrue!, blockResultFalse!, storeSprint, arrWords);
            addRemoveWindow(sections, blockResultWrap!);
            removeClassTotal(storeSprint, resultAnswerArr);
            storeSprint.points = 0;
            storeSprint.answers.splice(0, storeSprint.answers.length);
            questionNumberAddition = 0;
            questionNumber = 0;
          }
          const questionInstance = await new Question(
            additionWordValues[questionNumberAddition].nameEng,
            additionWordValues[questionNumberAddition].nameRus
          );
          blockQuestion!.innerHTML = await questionInstance.render();
        } else {
          clearInterval(storeSprint.timer!);
          addWordsResult(blockResultTrue!, blockResultFalse!, storeSprint, arrWords);
          addRemoveWindow(sections, blockResultWrap!);
          removeClassTotal(storeSprint, resultAnswerArr);
          storeSprint.points = 0;
          storeSprint.answers.splice(0, storeSprint.answers.length);
          questionNumberAddition = 0;
          questionNumber = 0;
        }
      }
    });
    document.addEventListener('keyup', async (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if (event.key === 'ArrowRight')
          document.querySelector('.btn__true')?.classList.remove('activ__btn');
        if (event.key === 'ArrowLeft')
          document.querySelector('.btn__false')?.classList.remove('activ__btn');
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

    //Отлючить звук
    soundOn?.addEventListener('click', () => {
      soundOn.classList.remove('activ__music');
      soundOff?.classList.add('activ__music');
      storeSprint.audioSprint = false;
    });
    soundOff?.addEventListener('click', () => {
      soundOn!.classList.add('activ__music');
      soundOff?.classList.remove('activ__music');
      storeSprint.audioSprint = true;
    });

    //Полный экран
    btnFullScreen!.addEventListener(
      'click',
      (event) => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          wrapContener!.requestFullscreen();
        }
      },
      false
    );
  }
}
