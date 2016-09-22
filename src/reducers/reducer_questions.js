import {CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION} from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return [...state, action.payload];
        case DELETE_QUESTION:
            return state.filter((question) => {
                return question.questionTitle !== action.payload
            });
        case EDIT_QUESTION:
            const newState = [...state];
            newState[action.payload.questionId] = {
                questionTitle: action.payload.questionTitle,
                questionAnswer: action.payload.questionAnswer,
                questionType: action.payload.questionType
            }
            return newState;
        default:
            return state;
    }
}