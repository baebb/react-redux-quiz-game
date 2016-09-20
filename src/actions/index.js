import CREATE_QUESTION from './types';

export function createQuestion (props) {

    return {
        type: CREATE_QUESTION,
        payload: props
    }
}