import { CatchClause } from "typescript";
import { ErrorObject } from "webpack/node_modules/schema-utils/declarations/validate";
import { Error404 } from "../Error404";

export type User = {
  name: string,
  userId: string,
  token: string,
  refreshToken: string,
  errCode: string,
  message: string
}

export type Error = {
  message: string
}

export const dataUser: User = {
  name: '',
  userId: '',
  token: '',
  refreshToken: '',
  errCode: '',
  message: ''
};


  // регистрация нового пользователя
  export const createUser = async (user: object) => {
    try {
      const rawResponse = await fetch('https://rs-lang25.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      if (!rawResponse.ok) {
        throw new Error(`${rawResponse.status}`);
      }

      const content = await rawResponse.json();

    } catch (err) {
      if (err instanceof Error) dataUser.errCode = err.message;
    }
  };

  // вход уже зарегистрированного пользователя
  export const loginUser = async (user: object) => {
    try {
      const rawResponse = await fetch('https://rs-lang25.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!rawResponse.ok) {
        throw new Error(`${rawResponse.status}`);
      }

      const content = await rawResponse.json();

      dataUser.name = content.name;
      dataUser.token = content.token;
      dataUser.refreshToken = content.refreshToken;
      dataUser.userId = content.userId;
      dataUser.message = content.message;

    } catch (err) {
      if (err instanceof Error) dataUser.errCode = err.message;
    }
  };

  // получение пользователя по id
  export const getUser = async (id: string, token: string) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
     }
    });
    return rawResponse.json();
  };
  

  // получение нового токена пользователя
  export const getNewTokenUser = async (id: string, refreshToken: string) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
     }
    });
    return rawResponse.json();
  };



  function setLocalStorageUser() {
    localStorage.setItem('token', dataUser.token);
    localStorage.setItem('userId', dataUser.userId);
    localStorage.setItem('nameUser', dataUser.name);
  }
  window.addEventListener('beforeunload', setLocalStorageUser);

  function getLocalStorageUser() {
    dataUser.token = <string>localStorage.getItem('token');
    dataUser.userId = <string>localStorage.getItem('userId');
    dataUser.name = <string>localStorage.getItem('nameUser');
  }
  window.addEventListener('load', getLocalStorageUser);

