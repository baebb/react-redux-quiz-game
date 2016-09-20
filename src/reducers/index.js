import {combineReducers} from 'redux';

import QuestionReducer from './reducer_questions';

const rootReducer = combineReducers({
    questions: QuestionReducer
});

export default rootReducer;
