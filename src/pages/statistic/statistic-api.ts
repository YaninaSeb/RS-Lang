import { dataUser } from "../authorization/users-api";
 
export const userStatistic: any =  {
  wordsPerDay: 0,
  audiocallwordsPerDay: 0,
  sprintwordsPerDay: 0,
  wordsInQuiestions: [],
  totalPercent: 0,
  audiocallPercent: 0,
  sprintPercent: 0,
  allRounds: 0,
  audiocallRounds: 0,
  sprintRounds: 0,
  audiocallSeries: 0,
  sprintSeries: 0,
  wordInGames: {}
}

export type DayStatistic = {
  learnedWords: number,
  optional: {
    wordsPerDay: number,
    audiocallwordsPerDay: number,
    audiocallRounds: number,
    audiocallPercent: number,
    audiocallSeries: number,
    sprintwordsPerDay: number,
    sprintRounds: number,
    sprintPercent: number,
    sprintSeries: number,
    allRounds: number,
    totalPercent: number,
    wordInGames: {},
  }
}


export async function getWords(page: number, group: number) {
  const response = await fetch(`https://rs-lang25.herokuapp.com/words?page=${page}&group=${group}`);
  const words = await response.json();
  return words;
}


export const getUserStatistic = async(id = dataUser.userId) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      
    }
  });
  const settings = await rawResponse.json();
  return settings;
}

export const updateUserStatistic = async(id = dataUser.userId, body: DayStatistic) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/statistics`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const setting = await rawResponse.json();
  return setting;
}



function setLocalStorageStatistc() {
  localStorage.setItem('words', userStatistic.wordsInQuiestions);
}
window.addEventListener('beforeunload', setLocalStorageStatistc);

function getLocalStorageStatistic() {
  userStatistic.wordsInQuiestions = localStorage.getItem('words')?.split(',');
}
window.addEventListener('load', getLocalStorageStatistic);







