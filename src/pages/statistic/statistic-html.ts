import { userStatistic } from './statistic-api';

export const statisticElement = () => `
  <section class="statistic">
    <div class="container">
      <div class="statistic__body">
        <h2 class="statistic-title">Статистика</h2>
        <div class="statistic-type">Статистика за день</div>
        <div class="games__container">
          <div class="audiocall-game game-statistic blur">
            <h3 class="game-title">Аудиовызов</h3>
            <div class="statistic__container">
              <div class="game-text">Количество новых слов:</div>
              <div class="words-learned">${userStatistic.audiocallwordsPerDay}</div>
            </div>
            <div class="statistic__container">
              <div class="game-text">Правильных ответов (%):</div>
              <div class="percent-game">${userStatistic.audiocallPercent}</div>
            </div>
            <div class="statistic__container">
              <div class="game-text">Самая длинная серия правильных ответов:</div>
              <div class="game-series">${userStatistic.audiocallSeries}</div>
            </div>
          </div>
          <div class="sprint-game2 game-statistic blur">
            <h3 class="game-title">Спринт</h3>
            <div class="statistic__container">
              <div class="game-text">Количество новых слов:</div>
              <div class="words-learned">${userStatistic.sprintwordsPerDay}</div>
            </div>
            <div class="statistic__container">
              <div class="game-text">Правильных ответов (%):</div>
              <div class="percent-game">${userStatistic.sprintPercent}</div>
            </div>
            <div class="statistic__container">
              <div class="game-text">Самая длинная серия правильных ответов:</div>
              <div class="game-series">${userStatistic.sprintSeries}</div>
            </div>
          </div>
        </div>
        <div class="day-statistic blur">
          <h2 class="statistic-title">Общая статистика</h2>
          <div class="statistic__container">
            <div class="game-text">Количество новых слов:</div>
            <div class="words-learned">${userStatistic.wordsPerDay}</div>
          </div>
          <div class="statistic__container">
            <div class="game-text">Количество изученных слов:</div>
            <div class="words-learned-total">${userStatistic.learnedWordsFromBook}</div>
          </div>
          <div class="statistic__container">
            <div class="game-text">Правильных ответов (%):</div>
            <div class="percent-game">${userStatistic.totalPercent}</div>
          </div>
        </div>
      </div>
      <div class="unauthorized-statistic hide"></div>
    </div>
  </section>
`;

export const renderUnauthorized = () => {
  const html = `
    <div class="unauthorized-message">Для просмотра статистики, необходимо авторизоваться</div>
  `;
  (document.querySelector('.unauthorized-statistic') as HTMLElement).innerHTML = html;
}
