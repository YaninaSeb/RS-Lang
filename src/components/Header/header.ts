import './header.scss';
import { headerHTML } from './header-html';
import { dataUser, deleteUser } from '../../pages/authorization/users-api';

export class Header {
  async render() {
    return headerHTML;
  }
  async after_render() {
    const titleUser = <HTMLElement>document.querySelector('.title-user');
    const imgLogIn = <HTMLElement>document.querySelector('.img-login');
    const imgLogOut = <HTMLElement>document.querySelector('.img-logout');

    //смена данных у кнопки входа
    titleUser.textContent = dataUser.name;
    if (dataUser.name !== '') {
      imgLogIn.style.display = 'none';
      imgLogOut.style.display = 'block';
    }

    //кнопка удаления пользователя
    imgLogOut.addEventListener('click', () => {
        console.log('выход');
    
        deleteUser(dataUser.userId, dataUser.token).then(() => {
          dataUser.name = '';
          dataUser.token = '';
          dataUser.refreshToken = '';
          dataUser.userId = '';

          titleUser.textContent = dataUser.name;
          imgLogIn.style.display = 'block';
          imgLogOut.style.display = 'none';
        });
      }
    );

    return;
  }
}
