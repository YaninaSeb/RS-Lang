import { getWords } from '../api/api';
import { audio } from '../audiocall-html';

const COUNT_OF_WORDS = 20;

export function randomInteger(min: number, max: number) {
  const number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
}

export let array: Word[] = [];
export type Word = {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audioExample: string,
  audioMeaning: string,
  audio: string,
  wordTranslate: string,
  transcription: string,
  choice: string,
};

export async function generateWords(group: number) {
  for (let numberOfWord = 1; numberOfWord <= COUNT_OF_WORDS; numberOfWord++) {
    const numberOfActualWord = randomInteger(0,19);
    const words = await getWords(randomInteger(0,29), group);
    let newWord: Word;
    
    newWord = (words.slice(numberOfActualWord, numberOfActualWord+ 1)).flat();
    array.push(words[numberOfActualWord]);
  }
  return array;
}
document.body.addEventListener('click', (event) => {
  const target = event.target as HTMLButtonElement;
  if (target.classList.contains('levels')) {
    array = [];
  }
});






