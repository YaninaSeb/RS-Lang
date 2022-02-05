import { wordInterface } from './instance';

export const renderSprintQuestion = async (id: number, arrWords: wordInterface[]) => {
  const img = arrWords[id].image;
  const nameEng = arrWords[id].word;
  const nameRus = arrWords[id].wordTranslate;
  return {img, nameEng, nameRus};
};
