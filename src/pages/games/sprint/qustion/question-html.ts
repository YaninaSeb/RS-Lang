export const questionElement = (img: string, nameEng: string, nameRus: string) => ` 
<img src="https://raw.githubusercontent.com/KNV1987/react-rslang-be/main/${img}" alt="Image" class="img__word" />
<div class="word__text">${nameEng}</div>
<div class="word__translation">${nameRus}</div>
`;
