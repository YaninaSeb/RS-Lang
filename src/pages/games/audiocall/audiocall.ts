import { DayStatistic, getUserStatistic, getWords, updateUserStatistic, userStatistic } from '../../statistic/statistic-api';
import { audioElement, renderAuidoCallStatistic, renderLevel, updateLevel } from './audiocall-html';
import './audiocall.scss';
import { array, showRightWord, Word } from './utils/utils';
import { dataUser } from '../../authorization/users-api';
import { createUserWord, infoBook, updateUserWord } from '../../book/book-api';



export let NUMBER_OF_ANSWER = -1;
export let arrayOfResults: Word[] = [];
export let NUMBER_OF_RIGHT_ANSWERS = 0;
export let seriesOfAnswers = 0;


export class AudioGame {
  async render() {
    const footer: HTMLElement | null = document.querySelector('.footer__body');
    footer!.style.display = 'none';
    return audioElement();
  }

  async after_render() {
    if (infoBook.isFromBook) {
      (document.querySelector('.audiocall-description') as HTMLElement).classList.add('hide');
      (document.querySelector('.audiocall-description-frombook') as HTMLElement).classList.remove('hide');
    }
    if (dataUser.userId !== '') {
      const statisticStorage: DayStatistic= await getUserStatistic();
      
      userStatistic.wordsPerDay = statisticStorage.optional.wordsPerDay;
      userStatistic.audiocallwordsPerDay = statisticStorage.optional.audiocallwordsPerDay;
      userStatistic.audiocallPercent = String(statisticStorage.optional.audiocallPercent).substr(0, 4);
      userStatistic.audiocallRounds = statisticStorage.optional.audiocallRounds;
      userStatistic.allRounds = statisticStorage.optional.allRounds;
      userStatistic.totalPercent = String(statisticStorage.optional.totalPercent).substr(0, 4);
      userStatistic.audiocallSeries = statisticStorage.optional.audiocallSeries;
      userStatistic.wordInAudiocall = statisticStorage.optional.wordInAudiocall;
      userStatistic.wordInGames = statisticStorage.optional.wordInGames;
    }
    
    
    const answersBody = document.querySelector('.answers__body') as HTMLElement;
    const repeatButton = (document.querySelector('.repeat') as HTMLButtonElement);
    const nextButton = (document.querySelector('.next') as HTMLButtonElement);

    function openLevels() {
      if (infoBook.isFromBook) {
        (document.querySelector('.audiocall-start') as HTMLButtonElement).addEventListener('click', async () => {
          arrayOfResults = [];
          (document.querySelector('.audiocall .container') as HTMLElement).classList.add('hide');
          NUMBER_OF_ANSWER = 0;
          while (answersBody.firstChild) {
            answersBody.removeChild(answersBody.firstChild);
          }
          await renderLevel(infoBook.group - 1);
          (document.querySelector('.audiocall-round') as HTMLElement).classList.remove('hide');
        });
      } else {
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
          const auidoButton = document.querySelector('.audio-audiocall-game') as HTMLElement;
          const rightAnswer = auidoButton.getAttribute('data-word');
          const selected = target.value;
          const currentWord = { "difficulty": "hard" };
         
          userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id] = {
            audiocall: {
              guessed: 0,
              unguessed: 0,
              guessedInARow: 0,
            }
          }
          
          if (selected !== rightAnswer) {
            userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.guessedInARow = 0;
            userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.unguessed = userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.unguessed + 1;
            seriesOfAnswers = 0;
            target.style.background = 'red';
            array[NUMBER_OF_ANSWER].choice = 'wrong';
            showRightWord();
            console.log(userStatistic.wordInAudiocall);
            await createUserWord(dataUser.userId, array[NUMBER_OF_ANSWER].id, currentWord);
          } else {
            userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.guessedInARow++;
            userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.guessed = userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.guessed + 1;
            console.log(userStatistic.wordInAudiocall);
            NUMBER_OF_RIGHT_ANSWERS++;
            seriesOfAnswers++;
            target.style.background = 'green';
            array[NUMBER_OF_ANSWER].choice = 'right';
            showRightWord();
            if (userStatistic.wordInAudiocall[array[NUMBER_OF_ANSWER].id].audiocall.guessedInARow > 2) {
              await updateUserWord(dataUser.userId, array[NUMBER_OF_ANSWER].id, { "difficulty": "learned" });
            }
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
            } 
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
              wordInAudiocall: userStatistic.wordInAudiocall,
            }
          }
          await updateUserStatistic(dataUser.userId, wordPerDay);
        
        }
        
        while (answersBody.firstChild) {
          answersBody.removeChild(answersBody.firstChild);
        }
        (document.querySelector('.audiocall-round') as HTMLElement).classList.add('hide');
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
            const auidoButton = document.querySelector('.audio-audiocall-game') as HTMLElement;
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

