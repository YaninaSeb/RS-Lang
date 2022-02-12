import { storeSprintInterface, wordInterface } from './instance';
import { Question } from '../pages/games/sprint/qustion';

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

export const answerAdd = async (
  event: Event,
  wordValues: { img: string; nameEng: string; nameRus: string; answer: boolean }[],
  storeSprint: storeSprintInterface,
  arrWords: wordInterface[],
  i: number,
  blockQuestinWrap: HTMLElement
) => {
  if (event.target instanceof HTMLElement && event.target.dataset.answer) {
    const answer = event.target.dataset.answer === String(wordValues[i].answer);
    storeSprint.answers.push({ word: arrWords[i], answer: answer });
    answer
      ? blockQuestinWrap?.classList.add('questin__true')
      : blockQuestinWrap?.classList.add('questin__false');
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

export const timerSprint = () => {
  let count = 5;
  let interval = setInterval(() => {
    console.log(count--);
    if (count === 0) clearInterval(interval);
  }, 1000);
  interval;
};
