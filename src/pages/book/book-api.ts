import { dataUser } from '../authorization/users-api';
export const infoBook = {
  group: 1,
  page: 1
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
  
    console.log(content);

    return content;
};

//запрос для получения сложных слов
export const getUserWords = async (userId: number) => {
  const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${userId}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${dataUser.token}`,
      'Accept': 'application/json',
    }
  });
  const content = await rawResponse.json();

  console.log(content);

  return content;
};


    // function setLocalStorageUser() {
    //   localStorage.setItem('groupBook', (infoBook.group).toString());
    //   localStorage.setItem('pageBook', (infoBook.page).toString());
    // }
    // window.addEventListener('beforeunload', setLocalStorageUser);
    
    // function getLocalStorageUser() {
    //   infoBook.group = Number(localStorage.getItem('groupBook'));
    //   infoBook.page = Number(localStorage.getItem('pageBook'));
    // }
    // window.addEventListener('load', () => {
    //   getLocalStorageUser();
    //   createPageBook();
    // });
