import { DayStatistic, getUserStatistic, updateUserStatistic, userStatistic } from '../../statistic/statistic-api';
import { audioElement, renderAuidoCallStatistic, renderLevel, updateLevel } from './audiocall-html';
import './audiocall.scss';
import { array, showRightWord, Word } from './utils/utils';
import { dataUser } from '../../authorization/users-api';


export let NUMBER_OF_ANSWER = 0;
export let arrayOfResults: Word[] = [];
export let NUMBER_OF_RIGHT_ANSWERS = 0;
export let seriesOfAnswers = 0;


export class AudioGame {
  async render() {
    //userStatistic.audiocallwordsPerDay = getCookie('audiocallwordsPerDay');
    //userStatistic.wordsPerDay = getCookie('wordsPerDay');
    //userStatistic.wordsInQuiestions = getCookie('words')?.split(',');
    //userStatistic.audiocallRounds = getCookie('audiocallRounds');
    //userStatistic.allRounds = getCookie('allRounds');
    //userStatistic.audiocallPercent = getCookie('audiocallPercent')?.substr(0, 5);
    //userStatistic.totalPercent = getCookie('totalPercent')?.substr(0, 5);
    //userStatistic.audiocallSeries = getCookie('audiocallSeries');
    return audioElement();
  }

  async after_render() {
    
    const statisticStorage: DayStatistic= await getUserStatistic();
    
    
    userStatistic.wordsPerDay = statisticStorage.optional.wordsPerDay;
    userStatistic.audiocallwordsPerDay = statisticStorage.optional.audiocallwordsPerDay;
    userStatistic.audiocallPercent = String(statisticStorage.optional.audiocallPercent).substr(0, 4);
    userStatistic.audiocallRounds = statisticStorage.optional.audiocallRounds;
    userStatistic.allRounds = statisticStorage.optional.allRounds;
    userStatistic.totalPercent = String(statisticStorage.optional.totalPercent).substr(0, 4);
    userStatistic.audiocallSeries = statisticStorage.optional.audiocallSeries;
    userStatistic.wordInGames = statisticStorage.optional.wordInGames;
    
    
    const answersBody = document.querySelector('.answers__body') as HTMLElement;
    const repeatButton = (document.querySelector('.repeat') as HTMLButtonElement);
    const nextButton = (document.querySelector('.next') as HTMLButtonElement);

    function openLevels() {
      (document.querySelector('.audiocall') as HTMLElement).addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.classList.contains('levels')) {
          arrayOfResults = [];
          (document.querySelector('.audiocall .container') as HTMLElement).classList.add('hide');
          NUMBER_OF_ANSWER = 0;
          while (answersBody.firstChild) {
            answersBody.removeChild(answersBody.firstChild);
          }
          repeatButton.value = target.value;
          await renderLevel(+target.value);
          (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
        }
      }); 
    }
    openLevels();

    if ((document.querySelector('.audiocall-round') as HTMLElement).classList.contains('hide')) {
      NUMBER_OF_ANSWER = 0;
      NUMBER_OF_RIGHT_ANSWERS = 0;
      seriesOfAnswers = 0;
    };
    
      (document.querySelector('.answers__body') as HTMLElement).addEventListener('click', async (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.classList.contains('answers')) {
          const auidoButton = document.querySelector('.audio') as HTMLElement;
          const rightAnswer = auidoButton.getAttribute('data-word');
          const selected = target.value;
          
          userStatistic.wordInGames[array[NUMBER_OF_ANSWER].id] = {
            audiocall: {
              guessed: 0,
              unguessed: 0
            }
          }
          
          if (selected !== rightAnswer) {
            userStatistic.wordInGames[array[NUMBER_OF_ANSWER].id].audiocall.unguessed = userStatistic.wordInGames[array[NUMBER_OF_ANSWER].id].audiocall.unguessed + 1;
            seriesOfAnswers = 0;
            target.style.background = 'red';
            array[NUMBER_OF_ANSWER].choice = 'wrong';
            showRightWord();
          } else {
            userStatistic.wordInGames[array[NUMBER_OF_ANSWER].id].audiocall.guessed = userStatistic.wordInGames[array[NUMBER_OF_ANSWER].id].audiocall.guessed + 1;
            NUMBER_OF_RIGHT_ANSWERS++;
            seriesOfAnswers++;
            target.style.background = 'green';
            array[NUMBER_OF_ANSWER].choice = 'right';
            showRightWord();
          }
          
        }
      });
    
    repeatButton.addEventListener('click', async () => {
      arrayOfResults = [];
      (document.querySelector('.audiocall-statistic') as HTMLElement).classList.add('hide');
      (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
      NUMBER_OF_ANSWER = 0;
      NUMBER_OF_RIGHT_ANSWERS = 0;
      updateLevel();
    });

    async function nextQuestion() {
      
      if (NUMBER_OF_ANSWER === 19) {
        await renderAuidoCallStatistic();
        arrayOfResults.map(async (element: Word) => {
          if (userStatistic.wordsInQuiestions.includes(element.word) || dataUser.userId === '') {
            return;
          } else {
            userStatistic.audiocallwordsPerDay = userStatistic.audiocallwordsPerDay + 1;
            userStatistic.wordsPerDay = userStatistic.wordsPerDay + 1;
            userStatistic.wordsInQuiestions.push(element.word);
            if (seriesOfAnswers > userStatistic.audiocallSeries) {
              userStatistic.audiocallSeries = seriesOfAnswers;
              //setCookie('audiocallSeries', userStatistic.audiocallSeries);
              //userStatistic.audiocallSeries = getCookie('audiocallSeries');
            } 

            //userStatistic.audiocallwordsPerDay = Number(userStatistic.audiocallwordsPerDay) + 1;
            //userStatistic.wordsInQuiestions.push(element.word);
            //setCookie('audiocallwordsPerDay', userStatistic.audiocallwordsPerDay);
            //setCookie('wordsPerDay', userStatistic.wordsPerDay);
            //setCookie('words', userStatistic.wordsInQuiestions);

            //userStatistic.audiocallwordsPerDay = getCookie('audiocallwordsPerDay');
            //userStatistic.wordsPerDay = getCookie('wordsPerDay');
            //userStatistic.wordsInQuiestions = getCookie('words')?.split(',');

            
            
          }
        })
        if (dataUser.userId !== '') {
          userStatistic.audiocallRounds = userStatistic.audiocallRounds + 1;
          userStatistic.allRounds = userStatistic.allRounds + 1;
          userStatistic.audiocallPercent = (Number(userStatistic.audiocallPercent) + Number(((NUMBER_OF_RIGHT_ANSWERS / 20) * 100))) / userStatistic.audiocallRounds;
          userStatistic.totalPercent = (Number(userStatistic.totalPercent) + Number(((NUMBER_OF_RIGHT_ANSWERS / 20) * 100))) / userStatistic.allRounds;
          
          const wordPerDay = {
            learnedWords: 0,
            optional: {
              wordsPerDay: userStatistic.wordsPerDay,
              audiocallwordsPerDay: userStatistic.audiocallwordsPerDay,
              audiocallRounds: userStatistic.audiocallRounds,
              audiocallPercent: userStatistic.audiocallPercent,
              sprintwordsPerDay: userStatistic.sprintwordsPerDay,
              sprintRounds: userStatistic.sprintRounds,
              sprintPercent: userStatistic.sprintPercent,
              allRounds: userStatistic.allRounds,
              totalPercent: userStatistic.totalPercent,
              audiocallSeries: userStatistic.audiocallSeries,
              sprintSeries: userStatistic.sprintSeries,
              wordInGames: userStatistic.wordInGames,
              
            }
          }
          await updateUserStatistic(dataUser.userId, wordPerDay);
          
          //userStatistic.audiocallRounds++;
          //userStatistic.allRounds++;
          //userStatistic.audiocallPercent = (Number(userStatistic.audiocallPercent) + Number(((NUMBER_OF_RIGHT_ANSWERS / 20) * 100))) / userStatistic.audiocallRounds;
          //setCookie('audiocallPercent', userStatistic.audiocallPercent);
          //userStatistic.audiocallPercent = getCookie('audiocallPercent');
          //userStatistic.totalPercent = (Number(userStatistic.totalPercent) + Number(((NUMBER_OF_RIGHT_ANSWERS / 20) * 100))) / userStatistic.allRounds;
          //setCookie('totalPercent', userStatistic.totalPercent );
          //userStatistic.totalPercent = getCookie('totalPercent');
          //setCookie('audiocallRounds', userStatistic.audiocallRounds);
          //setCookie('allRounds', userStatistic.allRounds);
          //userStatistic.audiocallRounds = getCookie('audiocallRounds');
          //userStatistic.allRounds = getCookie('allRounds');
          //if (seriesOfAnswers > userStatistic.audiocallSeries) {
            //userStatistic.audiocallSeries = seriesOfAnswers;
            //setCookie('audiocallSeries', userStatistic.audiocallSeries);
            //userStatistic.audiocallSeries = getCookie('audiocallSeries');
          //} 
        }
        
        while (answersBody.firstChild) {
          answersBody.removeChild(answersBody.firstChild);
        }
        (document.querySelector('.audiocall-round') as HTMLElement).classList.add('hide');
        (document.querySelector('.audiocall-close') as HTMLElement).classList.add('hide');
        (document.querySelector('.audiocall-statistic') as HTMLElement).classList.remove('hide');
      } else {
        NUMBER_OF_ANSWER++;
        array[NUMBER_OF_ANSWER].choice = 'wrong';
        updateLevel();
      }
        
      
    }
    
    nextButton.addEventListener('click', nextQuestion);
    
  
    
      document.addEventListener('keydown', (event) => {
        document.querySelectorAll('.answers').forEach(async (element) => {
          if (element.getAttribute('data-number') === event.code) {
            const auidoButton = document.querySelector('.audio') as HTMLElement;
            const button = ((document.querySelector('.answers__container') as HTMLElement)?.children[Number(`${event.code.split('')[5]}`) - 1]);
            const rightAnswer = auidoButton.getAttribute('data-word');
            const selected = button.getAttribute('data-word');
            if (selected !== rightAnswer) {
              seriesOfAnswers = 0;
              button.classList.add('wrong-answer');
              array[NUMBER_OF_ANSWER].choice = 'wrong';
              showRightWord();
            } else {
              NUMBER_OF_RIGHT_ANSWERS++;
              button.classList.add('right-answer');
              array[NUMBER_OF_ANSWER].choice = 'right';
              showRightWord();
            }
          } 
        });
      });
    
  }
}

