export const sprintElement = () => `<div class="wrap__game">
<section class="section main">
  <div class="button__setting">
    <div class="btn__setting button__close">Close</div>
    <div class="btn__setting button__full">Full</div>
  </div>
  <select name="level" id="level__select">
    <option value="1">Уровень 1</option>
    <option value="2">Уровень 2</option>
    <option value="3">Уровень 3</option>
    <option value="4">Уровень 4</option>
    <option value="5">Уровень 5</option>
    <option value="6">Уровень 6</option>
  </select>
  <div class="wrap__start">
    <div class="text__name">Спринт</div>
    <div class="text__start">
      Выберете соответствует ли перевод предложенному слову
    </div>
    <div class="button__start">Начать</div>
  </div>
</section>

<section class="section questions close">
  <div class="button__setting">
    <div class="btn__setting button__prev">Back</div>
    <div class="btn__setting button__sound">Music</div>
  </div>
  <div class="timer__sprint">00:59</div>
  <div class="score__sprint">0</div>
  <div class="wrap__question">
    <div class="help__sound">
      <div class="help__phrase">J</div>
      <div class="help__word">M</div>
    </div>
    <ul class="result__answer">
      <li class="result__answer-item"></li>
      <li class="result__answer-item"></li>
      <li class="result__answer-item"></li>
    </ul>
   <div class="sprint__block-question"></div>
  </div>
</section>
</div>`;
