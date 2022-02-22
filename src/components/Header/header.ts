import './header.scss';
import { headerHTML } from './header-html';
import { dataUser } from '../../pages/authorization/users-api';
import { infoBook } from '../../pages/book/book-api';

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
    if (dataUser.name) {
      imgLogIn.style.display = 'none';
      imgLogOut.style.display = 'block';
    }

    //кнопка выхода пользователя
    imgLogOut.addEventListener('click', () => {
          dataUser.name = '';
          dataUser.token = '';
          dataUser.refreshToken = '';
          dataUser.userId = '';

          titleUser.textContent = dataUser.name;
          imgLogIn.style.display = 'block';
          imgLogOut.style.display = 'none';

          const notes = <HTMLElement>document.querySelector('.notes-learned_page');
          notes.innerHTML = "";
      }
    );

    //переключение значения infoBook
    const navMenu: HTMLElement | null = document.querySelector('.nav-link_to_pages');
    navMenu?.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement && e.target.tagName === 'SPAN') {
        if (e.target.parentElement?.className == 'link-book') {
          infoBook.isFromBook = true;
        } else infoBook.isFromBook = false;
      }
    })
    return;
  }
}
