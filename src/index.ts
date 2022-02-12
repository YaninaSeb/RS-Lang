'use strict';
import './styles/style.scss';

import { Sprint } from './pages/games/sprint';
import { AudioGame } from './pages/games/audiocall';
import { Main } from './pages/main';
import { Book } from './pages/book';
import { Error404 } from './pages/Error404';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Utils } from './utils/utils';

const sprintInstance = new Sprint();
const audioGameInstance = new AudioGame();
const mainInstance = new Main();
const bookInstance = new Book();
const error404Instance = new Error404();
const headerInstance = new Header();
const footerInstance = new Footer();

const routes: { [selector: string]: Sprint } = {
  '/': mainInstance,
  '/book': bookInstance,
  '/game-sprint': sprintInstance,
  '/game-audiocall': audioGameInstance,
};

const router = async () => {
  document.body.innerHTML = '';
  const header = document.createElement('div');
  await document.body.append(header);
  const content = document.createElement('div');
  await document.body.append(content);
  const footer = document.createElement('div');
  await document.body.append(footer);

  header!.innerHTML = await headerInstance.render();
  await headerInstance.after_render();

  footer!.innerHTML = await footerInstance.render();

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;

  content!.innerHTML = await page.render();

  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
