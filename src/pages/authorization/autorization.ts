import { autorizationElement } from './autorization-html';
import './autorization.scss';


export const dataUser: any = {
  name: '',
  id: '',
  token: '',
  refreshToken: '',
  message: ''
};

export class Autorization {
  async render() {
    return autorizationElement();
  }

  async after_render() {
    const optionEntry = <HTMLButtonElement>document.querySelector('.title-entry');
    const optionRegistry = <HTMLButtonElement>document.querySelector('.title-registry');
    const dataEntry = <HTMLElement>document.querySelector('.container-data-entry');
    const dataRegistry = <HTMLElement>document.querySelector('.container-data-registry');

    optionEntry?.addEventListener('click', () => {
      dataEntry.classList.remove('hide-autorization');
      dataRegistry.classList.add('hide-autorization');

      optionEntry.classList.remove('hide-title');
      optionRegistry.classList.add('hide-title');
    });

    optionRegistry.addEventListener('click', () => {
      dataEntry.classList.add('hide-autorization');
      dataRegistry.classList.remove('hide-autorization');

      optionEntry.classList.add('hide-title');
      optionRegistry.classList.remove('hide-title');
    });



    // регистрация нового пользователя
    const createUser = async (user: object) => {
      const rawResponse = await fetch('https://rs-lang25.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const content = await rawResponse.json();
    };


    // вход уже зарегистрированного пользователя
    const loginUser = async (user: object) => {
      const rawResponse = await fetch('https://rs-lang25.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const content = await rawResponse.json();
    
      console.log(content);

      dataUser.message = content.message;
      dataUser.token = content.token;
      dataUser.refreshToken = content.refreshToken;
      dataUser.id = content.userId;

      console.log(dataUser);
    };




    const btnRegistry = <HTMLButtonElement>document.querySelector('.btn-registry');
    const btnEntry = <HTMLButtonElement>document.querySelector('.btn-entry');    
    const inputEmailRegistry = <HTMLInputElement>document.getElementById('mail-registry');
    const inputNameregistry = <HTMLInputElement>document.getElementById('username-registry');
    const inputPasswordRegistry = <HTMLInputElement>document.getElementById('password-registry');
    const inputEmailEntry = <HTMLInputElement>document.getElementById('mail-entry');
    const inputPasswordEntry = <HTMLInputElement>document.getElementById('password-entry');
    const titleUser = <HTMLElement>document.querySelector('.title-user');
    const imgLogIn = <HTMLElement>document.querySelector('.img-login');
    const imgLogOut = <HTMLElement>document.querySelector('.img-logout');



      //кнопка регистрации
    btnRegistry.addEventListener('click', () => {
      const email = inputEmailRegistry.value;
      const name = inputNameregistry.value;
      const password = inputPasswordRegistry.value;
      dataUser.name = name;
    
      createUser({ 'email': email, 'password': password }).then(() => {
        loginUser({ 'email': email, 'password': password });
      });

      titleUser.textContent = dataUser.name;
      imgLogIn.style.display = 'none';
      imgLogOut.style.display = 'block';
    });

      //кнопка входа
    btnEntry.addEventListener('click', () => {
      const email = inputEmailEntry.value;
      const password = inputPasswordEntry.value;
    
      loginUser({ 'email': email, 'password': password });

      titleUser.textContent = dataUser.name;
      imgLogIn.style.display = 'none';
      imgLogOut.style.display = 'block';
    });






  }
}
