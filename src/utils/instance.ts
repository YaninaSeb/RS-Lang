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
}