import {CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION} from './types';

export function createQuestion (props) {
    return {
        type: CREATE_QUESTION,
        payload: props
    }
}

export function deleteQuestion (props) {
    return {
        type: DELETE_QUESTION,
        payload: props
    }
}

export function editQuestion (props) {
    return {
        type: EDIT_QUESTION,
        payload: props
    }
}