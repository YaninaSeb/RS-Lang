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
  sprintSeries: 0
}

export type DayStatistic = {
  wordsPerDay: number,
  optional: {},
}

export async function getWords(page: number, group: number) {
  const response = await fetch(`https://rs-lang25.herokuapp.com/words?page=${page}&group=${group}`);
  const words = await response.json();
  return words;
}


export const getUserStatistic = async(id = dataUser.userId) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/settings`, {
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
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/settings`, {
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

export function setCookie(name: string, value: string, path = '/', expires = 0) {
 
  let updatedCookie = encodeURIComponent(name) + "=" + value + 
  ((expires)  ?  "; max-age=" + expires:   "");
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}






