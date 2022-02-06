import { wordInterface } from './instance';

export const renderSprintQuestion = async (id: number, arrWords: wordInterface[], word: wordInterface) => {
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

