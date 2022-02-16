import { storeSprintInterface } from "../../../utils/instance";

export const storeSprint: storeSprintInterface = {
    answers: [],//ответы в текущей игре
    correctAnswers: 0,
    points: 0,
    timer: null,
    allAnswersSprint: Object.create(null)
}