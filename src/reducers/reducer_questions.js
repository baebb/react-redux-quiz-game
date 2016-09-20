import { CREATE_QUESTION, GET_QUESTIONS } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return [...state, action.payload];
        default:
            return state;
    }
}