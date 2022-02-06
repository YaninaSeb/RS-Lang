export const autorizationElement = () => `
<section class="autorization">  
  <div class="autorization-bg"></div>

  <div class="container-autorization">
    <div class="title-entry">Вход</div>
    <div class="title-registry hide-title">Регистрация</div>

    <div class="container-data-entry">
      <div>
        <label class="label-autorization" for="mail">Электронная почта</label><br>
        <input class="input-autorization" type="email" id="mail" required>
      </div>
      <div>
        <label class="label-autorization" for="password">Пароль</label><br>
        <input class="input-autorization" type="password" id="password" required>
      </div>
      <button class="btn-registry">Войти</button>
    </div>

    <div class="container-data-registry hide-autorization">
      <div>
        <label class="label-autorization" for="mail">Электронная почта</label><br>
        <input class="input-autorization" type="email" id="mail" required>
      </div>
      <div>
        <label class="label-autorization" for="username">Имя пользователя</label><br>
        <input class="input-autorization" type="text" id="username" required>
      </div>
      <div>
        <label class="label-autorization" for="password">Пароль</label><br>
        <input class="input-autorization" type="password" id="password" required>
      </div>
      <button class="btn-entry">Зарегистрироваться</button>
    </div>
    
    
  </div>
</section>
`;
