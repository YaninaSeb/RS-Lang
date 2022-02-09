import { autorizationElement } from './autorization-html';
import './autorization.scss';
import { dataUser, createUser, loginUser, deleteUser} from './users-api';
import { Main } from '../main';

export class Autorization {
  async render() {
    return autorizationElement();
  }

  async after_render() {
    const optionEntry = <HTMLButtonElement>document.querySelector('.title-entry');
    const optionRegistry = <HTMLButtonElement>document.querySelector('.title-registry');
    const dataEntry = <HTMLElement>document.querySelector('.container-data-entry');
    const dataRegistry = <HTMLElement>document.querySelector('.container-data-registry');
    const btnRegistry = <HTMLButtonElement>document.querySelector('.btn-registry');
    const btnEntry = <HTMLButtonElement>document.querySelector('.btn-entry');    
    const inputEmailRegistry = <HTMLInputElement>document.getElementById('mail-registry');
    const inputNameRegistry = <HTMLInputElement>document.getElementById('username-registry');
    const inputPasswordRegistry = <HTMLInputElement>document.getElementById('password-registry');
    const inputEmailEntry = <HTMLInputElement>document.getElementById('mail-entry');
    const inputPasswordEntry = <HTMLInputElement>document.getElementById('password-entry');
    const titleUser = <HTMLElement>document.querySelector('.title-user');
    const imgLogIn = <HTMLElement>document.querySelector('.img-login');
    const imgLogOut = <HTMLElement>document.querySelector('.img-logout');


    //смена внешнего вида входа - регистрации
    optionEntry.addEventListener('click', () => {
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


    function changeBtnEntry() {
      titleUser.textContent = dataUser.name;
      if (dataUser.name !== '') {
        imgLogIn.style.display = 'none';
        imgLogOut.style.display = 'block';
      } else {
        imgLogIn.style.display = 'block';
        imgLogOut.style.display = 'none';
      }
    }


    const mainInstance = new Main();


      //кнопка регистрации
    btnRegistry.addEventListener('click', () => {
      const email = inputEmailRegistry.value;
      const name = inputNameRegistry.value;
      const password = inputPasswordRegistry.value;
    
      createUser({ 'name': name, 'email': email, 'password': password }).then(() => {
        loginUser({ 'email': email, 'password': password }).then(() => {
          changeBtnEntry();

          mainInstance.render();
        });
      });
    });

      //кнопка входа
    btnEntry.addEventListener('click', () => {
      const email = inputEmailEntry.value;
      const password = inputPasswordEntry.value;

      loginUser({ 'email': email, 'password': password }).then(() => {
        changeBtnEntry();
        console.log(dataUser);
      });
    });

  }
}
