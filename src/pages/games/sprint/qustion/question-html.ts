export const questionElement = (img: string, nameEng: string, nameRus: string) => ` 
<img src="https://raw.githubusercontent.com/KNV1987/react-rslang-be/main/${img}" alt="Image" class="img__word" />
<div class="word__text">${nameEng}</div>
<div class="word__translation">${nameRus}</div>
<div class="wrap__answer-btn">
  <div class="answer__btn btn__false">Не верно</div>
  <div class="answer__btn btn__true">Верно</div>
</div>`;
