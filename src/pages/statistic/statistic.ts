import { dataUser } from '../authorization/users-api';
import { getCookie, userStatistic } from './statistic-api';
import { renderUnauthorized, statisticElement } from './statistic-html';
import './statistic.scss';


export class Statistic {
  async render() {
    userStatistic.audiocallwordsPerDay = getCookie('audiocallwordsPerDay');
    userStatistic.wordsPerDay = getCookie('wordsPerDay');
    userStatistic.wordsInQuiestions = getCookie('words')?.split(',');
    userStatistic.audiocallRounds = getCookie('audiocallRounds');
    userStatistic.allRounds = getCookie('allRounds');
    userStatistic.audiocallPercent = getCookie('audiocallPercent')?.substr(0, 5);
    userStatistic.totalPercent = getCookie('totalPercent')?.substr(0, 5);
    userStatistic.audiocallSeries = getCookie('audiocallSeries');
    return statisticElement();
  }

  async after_render() {
  
    const linkToHomePage = document.querySelector('.link-main') as HTMLLinkElement;
    const linkToStatisticPage = document.querySelector('.link-static') as HTMLLinkElement;
    const login = document.querySelector('.img-login') as HTMLDivElement;
    const logout = document.querySelector('.img-logout') as HTMLDivElement;

    function showStatistic() {
      if (dataUser.userId === '') {
        (document.querySelector('.statistic__body') as HTMLElement).classList.add('hide');
        (document.querySelector('.unauthorized-statistic') as HTMLElement).classList.remove('hide');
        renderUnauthorized();
      } else {
        linkToStatisticPage.click();
        (document.querySelector('.statistic__body') as HTMLElement).classList.remove('hide');
      }
    }
    showStatistic();
    login.addEventListener('click', showStatistic);
    logout.addEventListener('click', function() {
      linkToHomePage.click();
    });

   }
}
