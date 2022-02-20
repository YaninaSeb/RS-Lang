export interface wordInterface {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}
export interface storeSprintInterface {
  answers: {word: wordInterface, answer: boolean}[] ,
  correctAnswers: number,
  points: number,
  timer: NodeJS.Timer | null,
  allAnswersSprint: {[id: string]: number},
  audioSprint: boolean, 
  statisticWord: {[id: string]: statisticWord} 
}

interface statisticWord {
  trueUnswer: number,
  falseUnswer: number
}
export interface userWordSprint {
  id: string, difficulty: string, wordId: string
}

export interface wordValuesInterface {
  img: string,
  nameEng: string,
  nameRus: string,
  answer: boolean,
  word: wordInterface,
}