import { getWords } from '../../../utils/api';
import { wordInterface } from '../../../utils/instance';
import {
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
    

    let arrWords: wordInterface[] = [];
    let wordValues: {
      img: string;
      nameEng: string;
      nameRus: string;
      answer: boolean;
    }[] = [];
    let questionNumber = 0;

    btnStart?.addEventListener('click', async () => {
      //arrWords = await getWords(1, 1);
      arrWords = [{
        "id":  "5e9f5ee35eb9e72bc21af4a0",
        "group": 0,
        "page": 0,
        "word": "alcohol",
        "image": "files/01_0002.jpg",
        "audio": "files/01_0002.mp3",
        "audioMeaning": "files/01_0002_meaning.mp3",
        "audioExample": "files/01_0002_example.mp3",
        "textMeaning": "<i>Alcohol</i> is a type of drink that can make people drunk.",
        "textExample": "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
        "transcription": "[ǽlkəhɔ̀ːl]",
        "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
        "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
        "wordTranslate": "алкоголь"
      },{
        "id":"5e9f5ee35eb9e72bc21af4a2",
        "group": 0,
        "page": 0,
        "word": "boat",
        "image": "files/01_0005.jpg",
        "audio": "files/01_0005.mp3",
        "audioMeaning": "files/01_0005_meaning.mp3",
        "audioExample": "files/01_0005_example.mp3",
        "textMeaning": "A <i>boat</i> is a vehicle that moves across water.",
        "textExample": "There is a small <b>boat</b> on the lake.",
        "transcription": "[bout]",
        "textExampleTranslate": "На озере есть маленькая лодка",
        "textMeaningTranslate": "Лодка - это транспортное средство, которое движется по воде",
        "wordTranslate": "лодка"
      },{
        "id": "5e9f5ee35eb9e72bc21af4a1",
        "group": 0,
        "page": 0,
        "word": "agree",
        "image": "files/01_0001.jpg",
        "audio": "files/01_0001.mp3",
        "audioMeaning": "files/01_0001_meaning.mp3",
        "audioExample": "files/01_0001_example.mp3",
        "textMeaning": "To <i>agree</i> is to have the same opinion or belief as another person.",
        "textExample": "The students <b>agree</b> they have too much homework.",
        "transcription": "[əgríː]",
        "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
        "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
        "wordTranslate": "согласна"
      },]
      await timerSprint(blockTimer!, blockResultTrue!, blockResultFalse!, storeSprint.answers, sections, blockResultWrap!);
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

    btnBack?.addEventListener('click', async () => {
      sections.forEach((section) => section.classList.add('close'));
      sectionMain?.classList.remove('close');
      storeSprint.answers.splice(0, storeSprint.answers.length);
      questionNumber = 0;
      blockTimer!.innerHTML = `01:00`;
      clearInterval(storeSprint.timer!);
    });

    document.addEventListener('keydown', async(event) => {
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

    helpWord?.addEventListener('click', () => {
      const src = arrWords[questionNumber].audio;
      const audio = new Audio();
      audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
      audio.play();
    });

    helpPrase?.addEventListener('click', (e) => {
        const src = arrWords[questionNumber].audioExample;
        const audio = new Audio();
        audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/react-rslang-be/main/${src}`;
        audio.play();
    })
  }
}
