import { CREATE_QUESTION, GET_QUESTIONS } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return action.payload.data;
        case CREATE_QUESTION:
            return [...state, action.payload.data];
        default:
            return state;
    }
}