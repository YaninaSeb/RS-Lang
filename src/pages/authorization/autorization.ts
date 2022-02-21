import { updateUserStatistic, userStatistic } from '../statistic/statistic-api';
import { autorizationElement } from './autorization-html';
import './autorization.scss';
import { dataUser, createUser, loginUser} from './users-api';

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
    const linkToHomePage = <HTMLLinkElement>document.querySelector('.link-main');
    const errMessageRegistry = <HTMLDivElement>document.querySelector('.error-message-registry');
    const errMessageEntry = <HTMLDivElement>document.querySelector('.error-message-entry');

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

      //кнопка регистрации
    btnRegistry.addEventListener('click', async () => {
      const email = inputEmailRegistry.value;
      const name = inputNameRegistry.value;
      const password = inputPasswordRegistry.value;
      const wordPerDay = {
        learnedWords: 0,
        optional: {
          wordsPerDay: 0,
          audiocallwordsPerDay: 0,
          audiocallRounds: 0,
          audiocallPercent: 0,
          allRounds: 0,
          totalPercent: 0,
          audiocallSeries: 0,
          sprintwordsPerDay: 0,
          sprintRounds: 0,
          sprintPercent: 0,
          sprintSeries: 0,
          wordInGames: {
            wordId: ''
          },
         
        }
      }
      
      createUser({ 'name': name, 'email': email, 'password': password }).then(async () => {
        if (dataUser.errCode != '') {
          errMessageRegistry.textContent = 'Неверный адрес электронной почты или пароль!';
          dataUser.errCode == '417' ? errMessageRegistry.textContent = 'Пользователь с указанной электронной почтой уже зарегистрирован!' : false;
          dataUser.errCode = '';
          
        } else {
          loginUser({ 'email': email, 'password': password }).then(async () => {
            errMessageRegistry.textContent = '';
            changeBtnEntry();
            linkToHomePage.click();
            await updateUserStatistic(dataUser.userId, wordPerDay);
          });
        }
      });
    });

      //кнопка входа
    btnEntry.addEventListener('click', () => {
      const email = inputEmailEntry.value;
      const password = inputPasswordEntry.value;

      loginUser({ 'email': email, 'password': password }).then(() => {
        if (dataUser.errCode != '') {
          errMessageEntry.textContent = 'Неверный адрес электронной почты или пароль!';
          dataUser.errCode = '';
        } else {
          changeBtnEntry();
          linkToHomePage.click();
        }
      });
    });

  }
}

