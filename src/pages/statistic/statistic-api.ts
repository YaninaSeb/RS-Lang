import { dataUser } from "../authorization/users-api";
 

export const userStatistic: any =  {
  learnedWords: 0,
  audiocallLearnedWords: 0,
  sprintLearnedWords: 0
}
export type DayStatistic = {
  learnedWords: number,
  optional: {},
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
}

function setLocalStorageUser() {
  localStorage.setItem('learnedWords', userStatistic.learnedWords);
  localStorage.setItem('audiocallLearnedWords', userStatistic.audiocallLearnedWords);
  localStorage.setItem('sprintLearnedWords', userStatistic.sprintLearnedWords);
}
window.addEventListener('beforeunload', setLocalStorageUser);

async function getLocalStorageUser() {
  
  userStatistic.learnedWords = localStorage.getItem('learnedWords');
  userStatistic.audiocallLearnedWords = localStorage.getItem('audiocallLearnedWords');
  userStatistic.sprintLearnedWords = localStorage.getItem('sprintLearnedWords');

  let words = {
    learnedWords: userStatistic.allLearnedWords,
    optional: {}
  }
  await updateUserStatistic(dataUser.userId, words);
}
window.addEventListener('load', getLocalStorageUser);






