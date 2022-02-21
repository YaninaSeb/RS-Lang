import { storeSprintInterface } from "../../../utils/instance";

export const storeSprint: storeSprintInterface = {
    answers: [],//ответы в текущей игре
    correctAnswers: 0,// подсчет правильных ответов подряд
    points: 0,
    timer: null,
    allAnswersSprint: {},// подсчет правильных ответов по id для добавления в изученные,
    audioSprint: true,//Включение или отключение звука
    statisticWord: {},
    numberOfGamesSprint: 0,// Всего сыграно раз
    numberTrueAnswer: 0,//Колличество правильных ответов для статистики
    idTrueWordsAnswer: {},
    idFalseWordsAnswer: {},
    seriasTrueAnswer: 0,
    allAnswersInRaund: 0//Всего ответов в раунде
}