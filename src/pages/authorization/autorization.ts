import { autorizationElement } from './autorization-html';
import './autorization.scss';

export class Autorization {
  async render() {
    return autorizationElement();
  }

  async after_render() {
    const optionEntry = <HTMLButtonElement>document.querySelector('.title-entry');
    const optionRegistry = <HTMLButtonElement>document.querySelector('.title-registry');
    const dataEntry = <HTMLElement>document.querySelector('.container-data-entry');
    const dataRegistry = <HTMLElement>document.querySelector('.container-data-registry');

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


  }
}
