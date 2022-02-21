import { bookElement } from './book-html';
import './book.scss';
import { getWords, getUserWords, createUserWord, updateUserWord, deleteUserWord, getWord } from './book-api';
import { dataUser } from '../authorization/users-api';
import { infoBook } from './book-api';


export class Book {
  async render() {
    return bookElement();
  }

  async after_render() {
    const containerWords = <HTMLElement>document.querySelector('.container-words');
    const containerPages = <HTMLElement>document.querySelector('.pages-book');
    const containerSelectGroup = <HTMLSelectElement>document.querySelector('.num-group');
    const containerSelectPages = <HTMLSelectElement>document.querySelector('.num-pages');
    let countLearnedWords = 0;

    if (dataUser.userId != '') {
      const optionGroupHardWord = document.createElement('option');
      optionGroupHardWord.textContent = 'Сложные слова';
      optionGroupHardWord.setAttribute('value', '7');
      containerSelectGroup.appendChild(optionGroupHardWord);
    }

    setPageBook();

    //отрисовка слов учебника
    async function createPageBook() {
      let arrWords;
      if (infoBook.group == 7 && dataUser.userId != '') {
        arrWords = await getArrHardWords();
        containerPages.style.display = 'none';
      } else {
        arrWords = await getWords(infoBook.group - 1, infoBook.page - 1);
        containerPages.style.display = 'flex';
      }

      containerWords.innerHTML = '';
      for (let i = 0; i < arrWords.length; i++) {
        containerWords.innerHTML += `
          <div class="card-word" data-group="${arrWords[i].group}" data-page="${arrWords[i].page}" id="${arrWords[i].id}">
            <div class="img-word"> 
              <img src="https://rs-lang25.herokuapp.com/${arrWords[i].image}" alt="img">
            </div>
            <div class="description-word">
              <div class="word-en">
                ${arrWords[i].word} - ${arrWords[i].transcription} - ${arrWords[i].wordTranslate}
                <div class="audio" data-audio=${i}>
                  <audio src="https://rs-lang25.herokuapp.com/${arrWords[i].audio}" class="audio-${i}"></audio>
                  <audio src="https://rs-lang25.herokuapp.com/${arrWords[i].audioMeaning}" class="audio-${i}"></audio>
                  <audio src="https://rs-lang25.herokuapp.com/${arrWords[i].audioExample}" class="audio-${i}"></audio>
                </div>
              </div>
              <div class="sentence-two-en">${arrWords[i].textMeaning}</div>
              <div class="sentence-two-ru">${arrWords[i].textMeaningTranslate}</div>
              <div class="sentence-one-en">${arrWords[i].textExample}</div>
              <div class="sentence-one-ru">${arrWords[i].textExampleTranslate}</div>

              <div class="btns-extra_fuctional" id="extra-${arrWords[i].id}"></div>
            </div>

            <div class="bookmark">
              <img src="../../assets/img/bookmark/group${arrWords[i].group + 1}.png" alt="bookmark">
            </div>
          </div>
        `;

        if (dataUser.token !== '' && infoBook.group < 7) {
          const btnsExtraFuctional = <HTMLDivElement>document.getElementById(`extra-${arrWords[i].id}`);
          btnsExtraFuctional.innerHTML = `
            <button class="btn-hard_word" data-hard=${arrWords[i].id}>Сложное слово</button>
            <button class="btn-learned_word" data-learned=${arrWords[i].id}>Изученное слово</button>
            <button class="btn-statistics_word" data-statistics=${arrWords[i].id}>Статистика</button>
            `;
          checkHardLearnedWord(arrWords[i].id);
        }
        if (dataUser.token !== '' && infoBook.group == 7) {
          const btnsExtraFuctional = <HTMLDivElement>document.getElementById(`extra-${arrWords[i].id}`);
          btnsExtraFuctional.innerHTML = `
            <button class="btn-hard-restore" data-restore=${arrWords[i].id}>Восстановить</button>
            <button class="btn-statistics_word" data-statistics=${arrWords[i].id}>Статистика</button>
            `;
          
        }
      }
    }
    createPageBook();

    //проверяем, является ли слово сложным или изученным
    async function checkHardLearnedWord(idCurrentWord: string) {
      const arrHardAndLearnedWords = await getUserWords(dataUser.userId);

      arrHardAndLearnedWords.forEach((oneWord: any) => {
          if (oneWord.wordId == idCurrentWord && oneWord.difficulty == 'hard') {
              const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
              btnHard.classList.add('hard_word-select');
              btnHard.setAttribute('disabled', 'true');
              //countLearnedWords++;
          }
          if (oneWord.wordId == idCurrentWord && oneWord.difficulty == 'learned') {
            const btnLearned = <HTMLElement>document.querySelector(`button[data-learned='${idCurrentWord}']`);
            const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
            btnLearned.classList.add('learned_word-select');
            btnHard.setAttribute('disabled', 'true');
            btnLearned.setAttribute('disabled', 'true');
            //countLearnedWords++;
          }
        });
      
      // const notes = <HTMLElement>document.querySelector('.notes-learned_page');
      // if (countLearnedWords == 20) {
      //   notes.textContent = "Вы изучили данную страницу!";
      // } else {
      //   notes.textContent = "";
      // }
    }


    //переход по страницам учебника
    const btnNumGroupBook = <HTMLSelectElement>document.querySelector('.num-group');
    btnNumGroupBook.addEventListener('change', (e) => {
      const num = btnNumGroupBook.value;
      infoBook.group = Number(num);
      createPageBook();
    });

    const btnNumPageBook = <HTMLSelectElement>document.querySelector('.num-pages');
    btnNumPageBook.addEventListener('change', () => {
      const num = btnNumPageBook.value;
      infoBook.page = Number(num);
      createPageBook();
    });

    const btnPrevPage = <HTMLElement>document.querySelector('.prev-page');
    btnPrevPage.addEventListener('click', () => {
      if (btnNumPageBook.value > '1') {
        btnNumPageBook.value = (Number(btnNumPageBook.value) - 1).toString();
        infoBook.page -= 1;
        console.log(btnNumPageBook.value);
        console.log(infoBook.page);
        createPageBook();
      } 
    });

    const btnNextPage = <HTMLElement>document.querySelector('.next-page');
    btnNextPage.addEventListener('click', () => {
      console.log('entry');
      if (Number(btnNumPageBook.value) < 30) {
        btnNumPageBook.value = (Number(btnNumPageBook.value) + 1).toString();
        infoBook.page += 1;

        console.log(btnNumPageBook.value);
        console.log(infoBook.page);

        createPageBook();
      } 
    });


    containerWords.addEventListener('click', async (e) => {
      const elem = e.target as HTMLElement;

      console.log(elem);

      //возможность прослушивать аудио к словам
      if (elem.classList.contains('audio')) {
        const numElem = elem.dataset.audio;
        var allAudio = document.querySelectorAll(`.audio-${numElem}`);

        (allAudio[0] as HTMLAudioElement).play();
    
        for (let i = 0; i < allAudio.length - 1; i++) {
          const audio = allAudio[i] as HTMLAudioElement;
          audio.addEventListener('ended', () => {
            if (audio.duration === audio.currentTime) {
              (allAudio[i + 1] as HTMLAudioElement).play();
            }
          });
        }
      }

      //добавление сложных слов
      if (elem.classList.contains('btn-hard_word')) {
        const idCurrentWord = <string>elem.dataset.hard;
        const idCurrentUser = dataUser.userId;
        const currentWord = { "difficulty": "hard" };
        const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
        btnHard.classList.add('hard_word-select');
        btnHard.setAttribute('disabled', 'true');

        createUserWord(idCurrentUser, idCurrentWord, currentWord);
      }

      //добавление изученных слов
      if (elem.classList.contains('btn-learned_word')) {
        const idCurrentWord = <string>elem.dataset.learned;
        const idCurrentUser = dataUser.userId;
        const currentWord = { "difficulty": "learned" };
        const btnHard = <HTMLElement>document.querySelector(`button[data-hard='${idCurrentWord}']`);
        const btnLearned = <HTMLElement>document.querySelector(`button[data-learned='${idCurrentWord}']`);
        let mark = true;

        const arrHardAndLearnedWords = await getUserWords(dataUser.userId);
        
        arrHardAndLearnedWords.forEach((oneWord: any) => {
          if (oneWord.wordId == idCurrentWord && oneWord.difficulty == 'hard') {
            btnLearned.classList.add('learned_word-select');
            btnHard.classList.remove('hard_word-select');
            btnHard.setAttribute('disabled', 'true');
            btnLearned.setAttribute('disabled', 'true');
            mark = false;

            updateUserWord(idCurrentUser, idCurrentWord, currentWord);
          }
        });
        if (mark) {
          btnLearned.classList.add('learned_word-select');
          btnHard.setAttribute('disabled', 'true');
          btnLearned.setAttribute('disabled', 'true');

          createUserWord(idCurrentUser, idCurrentWord, currentWord);
        }
      }

      //удаление из категории сложных слов
      if (elem.classList.contains('btn-hard-restore')) {
        const idCurrentWord = <string>elem.dataset.restore;
        const idCurrentUser = dataUser.userId;
    
        await deleteUserWord(idCurrentUser, idCurrentWord);
        createPageBook();
      }

      //отображение статистики слова
      const blockStatistic = <HTMLElement>document.querySelector('.statistics-one_word');
      if (elem.classList.contains('btn-statistics_word')) {
        const idCurrentWord = <string>elem.dataset.statistics;
            

        blockStatistic.style.display = 'block';
      }
      //закрыть блок со статистикой слова
      if (elem.classList.contains('btn-close_statistic')) {
        console.log('close');
        blockStatistic.style.display = 'none';
      }




    });

    //выход пользователя
    const imgLogOut = <HTMLElement>document.querySelector('.img-logout');
    imgLogOut.addEventListener('click', () => {
      if (infoBook.group == 7) {
        infoBook.group = 1;
        infoBook.page = 1; 
        containerSelectGroup.value = '1';
        containerSelectPages.value = '1';

        createPageBook(); 
      } else {
       createPageBook();
      }
    });

    //переход на игру Спринт
    const btnToGameSprint = <HTMLElement>document.querySelector('.sprint-game');
    const linkToSprint = <HTMLLinkElement>document.querySelector('.link-game_sprint');
    btnToGameSprint.addEventListener('click', () => {
      infoBook.isFromBook = true;
      linkToSprint.click();
    });

    //переход на игру Аудиовызов
    const btnToGameAudiocall = <HTMLElement>document.querySelector('.audio-game');
    const linkToAudiocall = <HTMLLinkElement>document.querySelector('.link-game_audiocall');
    btnToGameAudiocall.addEventListener('click', () => {
      infoBook.isFromBook = true;
      linkToAudiocall.click();
    });


  }
}

//отрисовка  страницы со сложными словами учебника
  async function getArrHardWords() {
    const arrHardWords: object[] = [];

    await getUserWords(dataUser.userId).then(async (arrHardAndLearnedWords) => {
      for (let oneWord of arrHardAndLearnedWords) {
         if (oneWord.difficulty == 'hard') {
          await getWord(oneWord.wordId).then( (elem) => {
            arrHardWords.push(elem);
          });
        }
      }
    });
    return arrHardWords;
  }

function setPageBook() {
  const containerSelectGroup = <HTMLSelectElement>document.querySelector('.num-group');
  const containerSelectPages = <HTMLSelectElement>document.querySelector('.num-pages');

  if (localStorage.getItem('groupBook') && localStorage.getItem('groupBook') != '') {
    infoBook.group = Number(localStorage.getItem('groupBook'));
    infoBook.page = Number(localStorage.getItem('pageBook'));

    containerSelectGroup.value = (infoBook.group).toString();
    containerSelectPages.value = (infoBook.page).toString();

    localStorage.setItem('groupBook', '');
    localStorage.setItem('pageBook', '');
    } else {
    infoBook.group = 1;
    infoBook.page = 1;
  }
}
