import { dataUser } from '../authorization/users-api';
import { getUserWords } from '../book/book-api';
import { DayStatistic, getUserStatistic, LearnedWords, userStatistic } from './statistic-api';
import { renderUnauthorized, statisticElement } from './statistic-html';
import './statistic.scss';


export class Statistic {
  async render() {
    if (dataUser.userId) {
      const statisticStorage: DayStatistic = await getUserStatistic();
      userStatistic.wordsPerDay = statisticStorage.optional.wordsPerDay;
      userStatistic.audiocallwordsPerDay = statisticStorage.optional.audiocallwordsPerDay;
      userStatistic.audiocallPercent = String(statisticStorage.optional.audiocallPercent).substr(0, 4);
      userStatistic.audiocallRounds = statisticStorage.optional.audiocallRounds;
      userStatistic.sprintwordsPerDay = statisticStorage.optional.sprintwordsPerDay;
      userStatistic.sprintPercent = String(statisticStorage.optional.sprintPercent).substr(0, 4);
      userStatistic.sprintRounds = statisticStorage.optional.sprintRounds;
      userStatistic.learnedWordsFromBook = 0;
      const allLearnedWords = await getUserWords(dataUser.userId);
      allLearnedWords.map((element: LearnedWords) => {
        if (element.difficulty === 'learned') {
          userStatistic.learnedWordsFromBook = userStatistic.learnedWordsFromBook + 1;
        }
      });
      userStatistic.allRounds = statisticStorage.optional.allRounds;
      userStatistic.sprintSeries = statisticStorage.optional.sprintSeries;
      userStatistic.totalPercent = String(statisticStorage.optional.totalPercent).substr(0, 4);
      userStatistic.audiocallSeries = statisticStorage.optional.audiocallSeries;
      userStatistic.wordInGames = statisticStorage.optional.wordInGames;
      userStatistic.wordInAudiocall= statisticStorage.optional.wordInAudiocall;
    }
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

