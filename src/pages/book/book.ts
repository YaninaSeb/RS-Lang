import { bookElement } from './book-html';
import './book.scss';
import { getWords, getUserWords  } from './book-api';
import { infoBook } from './book-api';
import { dataUser } from '../authorization/users-api';

export class Book {
  async render() {
    return bookElement();
  }

  async after_render() {
    const containerWords = <HTMLElement>document.querySelector('.container-words');


    async function createPageBook() {
      let arrWords;

      if (dataUser.token == '') {
        arrWords = await getWords(infoBook.group - 1, infoBook.page - 1);
      } else {
        console.log(dataUser.userId);
        arrWords = await getUserWords(dataUser.userId);
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

              <div class="hard_learned-word">
                <div class="btn-hard_word" data-hard=${arrWords[i].id}>Сложное слово</div>
                <div class="btn-learned_word" data-learned=${arrWords[i].id}>Изученное слово</div>
                <div class="btn-statistics_word" data-learned=${arrWords[i].id}>Статистика</div>

              </div>
            </div>

            <div class="bookmark">
              <img src="../../assets/img/bookmark/group${arrWords[i].group + 1}.png" alt="bookmark">
            </div>
          </div>
        `
      }
    }

    createPageBook();

    

    const btnNumGroupBook = <HTMLSelectElement>document.querySelector('.num-group');
    btnNumGroupBook.addEventListener('change', (e) => {
      const num = btnNumGroupBook.value;
      infoBook.group = Number(num);
      createPageBook();
    });

    const btnNumPageBook = <HTMLSelectElement>document.querySelector('.num-pages');
    btnNumPageBook.addEventListener('change', (e) => {
      const num = btnNumPageBook.value;
      infoBook.page = Number(num);
      console.log(infoBook.page);
      createPageBook();
    });

    const btnPrevPage = <HTMLElement>document.querySelector('.prev-page');
    btnPrevPage.addEventListener('click', () => {
      if (btnNumPageBook.value > '1') {
        btnNumPageBook.value = (Number(btnNumPageBook.value) - 1).toString();
        infoBook.page -= 1;
        createPageBook();
      } 
    });

    const btnNextPage = <HTMLElement>document.querySelector('.next-page');
    btnNextPage.addEventListener('click', () => {
      if (btnNumPageBook.value < '30') {
        btnNumPageBook.value = (Number(btnNumPageBook.value) + 1).toString();
        infoBook.page += 1;
        createPageBook();
      } 
    });




    containerWords.addEventListener('click', (e) => {
      const elem = e.target as HTMLElement;

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

    });



  }
}