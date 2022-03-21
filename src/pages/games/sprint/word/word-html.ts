export const wordResultElement = (transcription: string, nameEng: string, nameRus: string, audioExample: string ) => `
<div class="word">
      <div class="word__eng">${nameEng}</div>
      <div class="word__rus">${nameRus}</div>
      <div class="word__transcription">${transcription}</div>
      <div class="word__rus-sound" data-sound=${audioExample}>
        <img class="word__rus-sound" src="./assets/img/pngwing.com.png" alt="sound" data-sound=${audioExample}>
      </div>
    </div>
`;
