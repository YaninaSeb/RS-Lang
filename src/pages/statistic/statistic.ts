import { dataUser } from '../authorization/users-api';
import { DayStatisticAudiocall, DayStatisticSprint, getUserStatistic, userStatistic } from './statistic-api';
import { renderUnauthorized, statisticElement } from './statistic-html';
import './statistic.scss';


export class Statistic {
  async render() {
    const statisticStorageaAudiocall: DayStatisticAudiocall = await getUserStatistic();
    userStatistic.wordsPerDay = statisticStorageaAudiocall.optional.wordsPerDay;
    userStatistic.audiocallwordsPerDay = statisticStorageaAudiocall.optional.audiocallwordsPerDay;
    userStatistic.audiocallPercent = String(statisticStorageaAudiocall.optional.audiocallPercent).substr(0, 4);
    userStatistic.audiocallRounds = statisticStorageaAudiocall.optional.audiocallRounds;
    userStatistic.allRounds = statisticStorageaAudiocall.optional.allRounds;
    userStatistic.totalPercent = String(statisticStorageaAudiocall.optional.totalPercent).substr(0, 4);
    userStatistic.audiocallSeries = statisticStorageaAudiocall.optional.audiocallSeries;
    userStatistic.wordInGames = statisticStorageaAudiocall.optional.wordInGames;

    const statisticStorageaSprint: DayStatisticSprint = await getUserStatistic();
    userStatistic.wordsPerDay = statisticStorageaSprint.optional.wordsPerDay;
    userStatistic.sprintwordsPerDay = statisticStorageaSprint.optional.sprintwordsPerDay;
    userStatistic.sprintPercent = String(statisticStorageaSprint.optional.sprintPercent).substr(0, 4);
    userStatistic.sprintRounds = statisticStorageaSprint.optional.sprintRounds;
    userStatistic.allRounds = statisticStorageaSprint.optional.allRounds;
    userStatistic.totalPercent = String(statisticStorageaSprint.optional.totalPercent).substr(0, 4);
    userStatistic.sprintSeries = statisticStorageaSprint.optional.sprintSeries;
    userStatistic.wordInGames = statisticStorageaSprint.optional.wordInGames;
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

