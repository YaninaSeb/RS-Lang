export const autorizationElement = () => `
<section class="autorization">  
  <div class="autorization-bg"></div>

  <div class="container-autorization">
    <div class="title-entry">Вход</div>
    <div class="title-registry hide-title">Регистрация</div>

    <div class="container-data-entry">
      <div>
        <label class="label-autorization" for="mail-entry">Электронная почта</label><br>
        <input class="input-autorization" type="email" id="mail-entry" required>
      </div>
      <div>
        <label class="label-autorization" for="password-entry">Пароль</label><br>
        <input class="input-autorization" type="password" id="password-entry" minlength="8" required>
      </div>
      <div class="error-message-entry"></div>
      <button class="btn-entry">Войти</button>
    </div>

    <div class="container-data-registry hide-autorization">
      <div>
        <label class="label-autorization" for="mail-registry">Электронная почта</label><br>
        <input class="input-autorization" type="email" id="mail-registry" required>
      </div>
      <div>
        <label class="label-autorization" for="username-registry">Имя пользователя</label><br>
        <input class="input-autorization" type="text" id="username-registry" required>
      </div>
      <div>
        <label class="label-autorization" for="password-registry">Пароль</label><br>
        <input class="input-autorization" type="password" id="password-registry" required minlength="8">
      </div>
      <div class="error-message-registry"></div>
      <button class="btn-registry">Зарегистрироваться</button>
    </div>
    
  </div>
</section>
`;
