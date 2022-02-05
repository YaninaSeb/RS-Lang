import { wordInterface } from './instance';

export const renderSprintQuestion = async (id: number, arrWords: wordInterface[]) => {
  const img = arrWords[id].image;
  const nameEng = arrWords[id].word;
  const randomId = randomFalseWordSprint(id, arrWords);
  const nameRus = arrWords[randomId].wordTranslate;
  return { img, nameEng, nameRus };
};

export const randomFalseWordSprint = (id: number, arrWords: wordInterface[]) => {
  let randomNumber = Math.floor(Math.random() * arrWords.length);
  while (randomNumber === id) {
    randomNumber = Math.floor(Math.random() * arrWords.length);
  }
  return Math.floor(Math.random() * 2) === 1 ? randomNumber : id;
};

