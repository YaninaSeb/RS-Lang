export const dataUser: any = {
  name: '',
  userId: '',
  token: '',
  refreshToken: '',
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
      const content = await rawResponse.json();
    } catch (err) {
      console.log('Ошибка' + err);
    }
  };

  // вход уже зарегистрированного пользователя
  export const loginUser = async (user: object) => {
    const rawResponse = await fetch('https://rs-lang25.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();

    dataUser.name = content.name;
    dataUser.token = content.token;
    dataUser.refreshToken = content.refreshToken;
    dataUser.userId = content.userId;
    dataUser.message = content.message;

    console.log(content);
    console.log(dataUser);
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

  // обновление пользователя по id
  export const updateUser = async (user: object, id: string) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  };


  // удаление пользователя по id
  export const deleteUser = async (id: string, token: string) => {
    await fetch(`https://rs-lang25.herokuapp.com/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
     }
    });
  };

  // получение нового токена пользователя
  export const getNewTokenUser = async (id: string) => {
    const rawResponse = await fetch(`https://rs-lang25.herokuapp.com/users/${id}/tokens`, {
      method: 'GET'
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
    dataUser.token = localStorage.getItem('token');
    dataUser.userId = localStorage.getItem('userId');
    dataUser.name = localStorage.getItem('nameUser');
  }
  window.addEventListener('load', getLocalStorageUser);

