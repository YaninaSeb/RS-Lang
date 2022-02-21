import { dataUser } from '../authorization/users-api';

export type WordType = {
  wordId: string,
  difficulty: string
}

export const infoBook = {
  group: 1,
  page: 1,
  isFromBook: true
}

export const getWords = async (numGroup: number, numPage: number) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/words?page=${numPage}&group=${numGroup}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const content = await rawResponse.json();
    return content;
};

//получить одно слово
export const getWord = async (wordId: string) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/words/${wordId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await rawResponse.json();
  return content;
};

//запрос для получения сложных и изученных слов
export const getUserWords = async (userId: string) => {
  try {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${userId}/words`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${dataUser.token}`,
        'Accept': 'application/json',
      }
    });
    if (!rawResponse.ok) {
      throw new Error(`${rawResponse.status}`);
    }
    const content = await rawResponse.json();
    return content;

  } catch (err) {
    if (err instanceof Error) dataUser.errCode = err.message;
  }
};


//запрос для создания сложного и изученного слова
export const createUserWord = async (userId: string, wordId: string, word: object) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
};

//запрос для обновления слова
export const updateUserWord = async (userId: string, wordId: string, word: object) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
};

//запрос для удаления слова
export const deleteUserWord = async (userId: string, wordId: string) => {
  
  await fetch(`https://rs-lang25.herokuapp.com/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
};




function setLocalStorageUser() {
  localStorage.setItem('groupBook', (infoBook.group).toString());
  localStorage.setItem('pageBook', (infoBook.page).toString());
}
window.addEventListener('beforeunload', setLocalStorageUser);

function getLocalStorageUser() {
  infoBook.group = Number(localStorage.getItem('groupBook'));
  infoBook.page = Number(localStorage.getItem('pageBook'));
}
window.addEventListener('load', getLocalStorageUser);
