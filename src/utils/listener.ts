import { storeSprintInterface, userWordSprint, wordInterface } from './instance';
import { storeSprint } from '../pages/games/sprint/storeSprint';
import { WordResult } from '../pages/games/sprint/word';
import {
  DayStatistic,
  getUserStatistic,
  updateUserStatistic,
  userStatistic,
} from '../pages/statistic/statistic-api';
import { dataUser } from '../pages/authorization/users-api';
import { deleteUserWord, getUserWords, updateUserWord } from '../pages/book/book-api';
export const renderSprintQuestion = (
  id: number,
  arrWords: wordInterface[],
  word: wordInterface
) => {
  const img = word.image;
  const nameEng = word.word;
  const randomId = randomFalseWordSprint(id, arrWords);
  const nameRus = arrWords[randomId].wordTranslate;
  const answer = randomId === id;
  return { img, nameEng, nameRus, answer, word };
};

export const randomFalseWordSprint = (id: number, arrWords: wordInterface[]) => {
  let randomNumber = Math.floor(Math.random() * arrWords.length);
  while (randomNumber === id) {
    randomNumber = Math.floor(Math.random() * arrWords.length);
  }
  return Math.floor(Math.random() * 2) === 1 ? randomNumber : id;
};

//Функция для выбора правильного или неправильного ответа

export const answerAdd = (
  event: Event,
  wordValues: {
    img: string;
    nameEng: string;
    nameRus: string;
    answer: boolean;
    word: wordInterface;
  }[],
  storeSprint: storeSprintInterface,
  i: number,
  blockQuestinWrap: HTMLElement,
  blockScore: HTMLElement,
  blockArr: NodeListOf<HTMLElement>,
  learnedWords: userWordSprint[],
) => {
  const answer = giveAnswer(event) === String(wordValues[i].answer);
  storeSprint.answers.push({ word: wordValues[i].word, answer: answer });
  const idAllAnswer: string = wordValues[i].word.id;
  storeSprint.allAnswersInRaund++;
  if (!storeSprint.statisticWord.idAllAnswer) {
    storeSprint.statisticWord[idAllAnswer] = { trueUnswer: 0, falseUnswer: 0 };
  }
  if (storeSprint.seriasTrueAnswer < storeSprint.correctAnswers) {
    storeSprint.seriasTrueAnswer = storeSprint.correctAnswers;
  }
  if (answer) {
    storeSprint.allAnswersSprint[idAllAnswer] = storeSprint.allAnswersSprint[idAllAnswer]
      ? (storeSprint.allAnswersSprint[idAllAnswer] += 1)
      : (storeSprint.allAnswersSprint[idAllAnswer] = 1);

    storeSprint.idTrueWordsAnswer[idAllAnswer] = storeSprint.idTrueWordsAnswer[idAllAnswer]
      ? (storeSprint.idTrueWordsAnswer[idAllAnswer] += 1)
      : (storeSprint.idTrueWordsAnswer[idAllAnswer] = 1);

    blockQuestinWrap?.classList.add('questin__true');
    addPoints(storeSprint, blockScore);
    addClass(storeSprint, blockArr);
    storeSprint.correctAnswers++;
    storeSprint.statisticWord[idAllAnswer].trueUnswer++;
    storeSprint.numberTrueAnswer++;
  } else {
    storeSprint.allAnswersSprint[idAllAnswer] = 0;
    storeSprint.idFalseWordsAnswer[idAllAnswer] = storeSprint.idFalseWordsAnswer[idAllAnswer]
      ? (storeSprint.idFalseWordsAnswer[idAllAnswer] += 1)
      : (storeSprint.idFalseWordsAnswer[idAllAnswer] = 1);
    blockQuestinWrap?.classList.add('questin__false');
    storeSprint.correctAnswers = 0;
    storeSprint.statisticWord[idAllAnswer].falseUnswer++;
    blockArr.forEach((li) => li.classList.remove('activ__round'));
    if(dataUser.userId != '' && learnedWords.length !== 0) {
      learnedWords.forEach((word: userWordSprint) => {
        if (idAllAnswer === word.wordId) {
          deleteUserWord(dataUser.userId, idAllAnswer);
        }
      })
    }
  }
  soundAnswer(answer);
  setTimeout(
    () =>
      answer
        ? blockQuestinWrap?.classList.remove('questin__true')
        : blockQuestinWrap?.classList.remove('questin__false'),
    500
  );
};

//Функция таймер

export const timerSprint = (
  block: HTMLElement,
  blockTrue: HTMLElement,
  blockFalse: HTMLElement,
  answers: { word: wordInterface; answer: boolean }[],
  sections: NodeListOf<HTMLElement>,
  blockResult: HTMLElement,
  blockArr: NodeListOf<HTMLElement>,
  arrWords: wordInterface[]
) => {
  let count = 60;
  storeSprint.timer = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(storeSprint.timer!);
      addWordsResult(blockTrue, blockFalse, storeSprint, arrWords);
      addRemoveWindow(sections, blockResult!);
      removeClassTotal(storeSprint, blockArr);
      storeSprint.points = 0;
      answers.splice(0, answers.length);
    }
    if (count < 10) {
      block.innerHTML = `00:0${count}`;
    } else block.innerHTML = `00:${count}`;
  }, 1000);
};

//Функция добавления баллов

export const addPoints = (storeSprint: storeSprintInterface, block: HTMLElement) => {
  if (storeSprint.correctAnswers > 2) {
    storeSprint.points += 20;
  } else if (storeSprint.correctAnswers > 5) {
    storeSprint.points += 40;
  } else storeSprint.points += 10;
  block.innerHTML = String(storeSprint.points);
};

//Функция добавления класса

export const addClass = (storeSprint: storeSprintInterface, blockArr: NodeListOf<HTMLElement>) => {
  if (storeSprint.correctAnswers % 3 === 0) {
    blockArr[0].classList.add('activ__round');
  }
  if (storeSprint.correctAnswers % 3 === 1) {
    blockArr[1].classList.add('activ__round');
  }
  if (storeSprint.correctAnswers % 3 === 2) {
    blockArr[2].classList.add('activ__round');
  }
};
//Функция удаления класса у кружков правильных ответов и сброс на 0 баллы
export const removeClassTotal = (
  storeSprint: storeSprintInterface,
  blockArr: NodeListOf<HTMLElement>
) => {
  storeSprint.correctAnswers = 0;
  blockArr.forEach((li) => li.classList.remove('activ__round'));
};

//Функция звука ответа
const soundAnswer = (flag: boolean) => {
  if (storeSprint.audioSprint) {
    const audio = new Audio();
    audio.src = flag
      ? './assets/sound-sprint/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1-5200.mp3'
      : './assets/sound-sprint/standartnyiy-zvuk-s-oshibochnyim-otvetom-5199-1__=8.mp3';
    audio.autoplay = true;
  }
};

//Функция получения ответа
const giveAnswer = (event: Event | KeyboardEvent) => {
  let answer: boolean;
  if (event.target instanceof HTMLElement && event.target.dataset.answer) {
    return event.target!.dataset.answer;
  } else if (event instanceof KeyboardEvent) {
    const btnKeybord = event.key === 'ArrowLeft' ? 'false' : 'true';
    return btnKeybord;
  }
};

//Функция отрисовки результатов
export const addWordsResult = async (
  blockTrue: HTMLElement,
  blockFalse: HTMLElement,
  storeSprint: storeSprintInterface,
  arrWords: wordInterface[]
) => {
  blockTrue.innerHTML = '';
  blockFalse.innerHTML = '';
  const nameBlockTrue = document.createElement('div');
  nameBlockTrue.classList.add('name__result');
  nameBlockTrue.innerHTML = 'Вы ответили правильно';
  const nameBlockFalse = document.createElement('div');
  nameBlockFalse.classList.add('name__result');
  nameBlockFalse.innerHTML = 'Вы ответили неправильно';
  blockTrue.append(nameBlockTrue);
  blockFalse.append(nameBlockFalse);
  storeSprint.answers.forEach(async (answer) => {
    const word = answer.word;
    const wordResultInstance = new WordResult(
      word.transcription,
      word.word,
      word.wordTranslate,
      word.audio
    );
    const wordElement = document.createElement('div');
    wordElement.innerHTML = await wordResultInstance.render();

    (await answer.answer) ? blockTrue.append(wordElement) : blockFalse.append(wordElement);
    await wordResultInstance.after_render();
  });
  storeSprint.numberOfGamesSprint++;
  
  if (dataUser.userId != '') {
    const arrThreeTrueAnswer = Object.keys(storeSprint.allAnswersSprint);
    arrThreeTrueAnswer.forEach(async (id) => {
      if (storeSprint.allAnswersSprint[id] > 2) {
        await updateUserWord(dataUser.userId, id, { difficulty: 'learned' });
      }
    });
  }

  const statisticStorage: DayStatistic = await getUserStatistic();
  userStatistic.wordsPerDay = statisticStorage.optional.wordsPerDay;
  userStatistic.sprintwordsPerDay = statisticStorage.optional.sprintwordsPerDay;
  userStatistic.sprintPercent = String(statisticStorage.optional.sprintPercent).substr(0, 4);
  userStatistic.sprintRounds = statisticStorage.optional.sprintRounds;
  userStatistic.allRounds = statisticStorage.optional.allRounds;
  userStatistic.sprintSeries = statisticStorage.optional.sprintSeries;
  userStatistic.totalPercent = String(statisticStorage.optional.totalPercent).substr(0, 4);
  userStatistic.wordInGames = statisticStorage.optional.wordInGames;
  userStatistic.wordInAudiocall = statisticStorage.optional.wordInAudiocall;
  if (dataUser.userId !== '') {
    userStatistic.sprintRounds = userStatistic.sprintRounds + 1;
    userStatistic.allRounds = userStatistic.allRounds + 1;
    userStatistic.sprintPercent =
      (Number(userStatistic.sprintPercent) + Number((storeSprint.numberTrueAnswer / storeSprint.allAnswersInRaund) * 100)) /
      userStatistic.sprintRounds;
    userStatistic.totalPercent =
      (Number(userStatistic.totalPercent) + Number((storeSprint.numberTrueAnswer / storeSprint.allAnswersInRaund) * 100)) /
      userStatistic.allRounds;
    userStatistic.sprintwordsPerDay = storeSprint.numberTrueAnswer;
    userStatistic.sprintSeries = storeSprint.seriasTrueAnswer;
    const wordPerDay = {
      learnedWords: 0,
      optional: {
        wordsPerDay: userStatistic.wordsPerDay,
        audiocallwordsPerDay: userStatistic.audiocallwordsPerDay,
        audiocallRounds: userStatistic.audiocallRounds,
        audiocallPercent: userStatistic.audiocallPercent,
        sprintwordsPerDay: userStatistic.sprintwordsPerDay,
        sprintRounds: userStatistic.sprintRounds,
        sprintPercent: userStatistic.sprintPercent,
        allRounds: userStatistic.allRounds,
        totalPercent: userStatistic.totalPercent,
        audiocallSeries: userStatistic.audiocallSeries,
        sprintSeries: userStatistic.sprintSeries,
        wordInGames: userStatistic.wordInGames,
        wordInAudiocall: userStatistic.wordInAudiocall
      },
    };
    const keyInWordResult = Object.keys(storeSprint.statisticWord);
    keyInWordResult.forEach((id) => {
      userStatistic.wordInGames[id] = {
        sprint: {
          guessed: storeSprint.statisticWord[id].trueUnswer,
          unguessed: storeSprint.statisticWord[id].falseUnswer,
        },
      };
    });
    await updateUserStatistic(dataUser.userId, wordPerDay);
  }
};

//Перемешивание массива
export const shuffle = (array: wordInterface[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//Скрытие окон
export const addRemoveWindow = (sections: NodeListOf<HTMLElement>, vievSection: HTMLElement) => {
  sections.forEach((section) => section.classList.add('close'));
  vievSection?.classList.remove('close');
};
