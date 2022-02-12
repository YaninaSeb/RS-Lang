import { storeSprintInterface, wordInterface } from './instance';
import { Question } from '../pages/games/sprint/qustion';
import { storeSprint } from '../pages/games/sprint/storeSprint';

export const renderSprintQuestion = async (
  id: number,
  arrWords: wordInterface[],
  word: wordInterface
) => {
  const img = word.image;
  const nameEng = word.word;
  const randomId = randomFalseWordSprint(id, arrWords);
  const nameRus = arrWords[randomId].wordTranslate;
  const answer = randomId === id;
  return { img, nameEng, nameRus, answer };
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
  wordValues: { img: string; nameEng: string; nameRus: string; answer: boolean }[],
  storeSprint: storeSprintInterface,
  arrWords: wordInterface[],
  i: number,
  blockQuestinWrap: HTMLElement,
  blockScore: HTMLElement
) => {
  if (event.target instanceof HTMLElement && event.target.dataset.answer) {
    const answer = event.target.dataset.answer === String(wordValues[i].answer);
    storeSprint.answers.push({ word: arrWords[i], answer: answer });
    if (answer) {
      blockQuestinWrap?.classList.add('questin__true');
      addPoints(storeSprint, blockScore);
      storeSprint.correctAnswers++;
    } else {
      blockQuestinWrap?.classList.add('questin__false');
      storeSprint.correctAnswers = 0;
    }
    setTimeout(
      () =>
        answer
          ? blockQuestinWrap?.classList.remove('questin__true')
          : blockQuestinWrap?.classList.remove('questin__false'),
      1000
    );
  }
};

//Функция таймер

export const timerSprint = (block: HTMLElement) => {
  let count = 60;
  storeSprint.timer = setInterval(() => {
    count--;
    if (count === 0) clearInterval(storeSprint.timer!);
    if (count < 10) {
      block.innerHTML = `00:0${count}`;
    } else block.innerHTML = `00:${count}`;
  }, 1000);
};

//Функция добавления баллов

export const addPoints = (storeSprint: storeSprintInterface, block: HTMLElement) => {
  if (storeSprint.correctAnswers > 2) {
    storeSprint.points += 20;
  } else storeSprint.points += 10;
  block.innerHTML = String(storeSprint.points);
}