import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

import QuestionReducer from './reducer_questions';

const rootReducer = combineReducers({
    questions: QuestionReducer,
    form: formReducer
});

export default rootReducer;
