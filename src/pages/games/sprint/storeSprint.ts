import { storeSprintInterface } from "../../../utils/instance";

export const storeSprint: storeSprintInterface = {
    answers: [],//ответы в текущей игре
    correctAnswers: 0,// подсчет правильных ответов подряд
    points: 0,
    timer: null,
    allAnswersSprint: Object.create(null)// подсчет правильных ответов по id для добавления в изученные
}