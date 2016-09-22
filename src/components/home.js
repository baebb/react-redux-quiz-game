import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {reduxForm, Field, formValueSelector} from 'redux-form';

import {createQuestion} from '../actions/index';
import QuestionItem from './question-item';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    createQuestionHandler(props) {
        function sendQuestion() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() < 0.1) {
                        return reject();
                    }
                    return resolve();
                }, Math.random() * 1000);
            })
        }

        sendQuestion()
            .then(() => {
                this.props.reset();
                this.setState({error: 'false'});
                this.props.createQuestion(props);
            })
            .catch(() => {
                this.props.reset();
                this.setState({error: 'true'});
            })
    }

    renderQuestions(question, index) {
        return (
            <QuestionItem question={question} key={index} index={index}/>
        )
    }

    render() {
        const {handleSubmit, questionType, questions} = this.props;
        const {error} = this.state;
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h2 className="display-4 text-xs-center">EZ-Quiz Creator 2000</h2>

                    <form onSubmit={handleSubmit(this.createQuestionHandler.bind(this))}>
                        <div className="form-group">
                            <label><Field name="questionType" component="input" type="radio" value="boolean"/>True or
                                False</label>
                            <label><Field name="questionType" component="input" type="radio" value="text"/>Text
                                Answer</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="questionTitle">Question title:</label>
                            <Field name="questionTitle" className="form-control" component="input" type="text"/>
                        </div>
                        {questionType == "text" && <div className="form-group">
                            <label htmlFor="questionAnswer">Question answer:</label>
                            <Field name="questionAnswer" className="form-control" component="input" type="text"/>
                        </div>}
                        {questionType == "boolean" && <div className="form-group">
                            <label><Field name="questionAnswer" component="input" type="radio"
                                          value="true"/>True</label>
                            <label><Field name="questionAnswer" component="input" type="radio"
                                          value="false"/>False</label>
                        </div>}
                        <button type="submit" className="btn btn-primary">Add Question</button>
                    </form>
                    {error == 'true' &&
                    <div className="alert alert-danger" role="alert">
                        Question save failed!
                    </div>
                    }
                    {error == 'false' &&
                    <div className="alert alert-success" role="alert">
                        Question saved!
                    </div>
                    }
                    <h4>Questions:</h4>
                    <div className="list-group">
                        {questions.map(this.renderQuestions)}
                    </div>
                    <Link to={"question/0"} className="btn btn-primary pull-xs-right">Student Mode</Link>
                </div>
            </div>
        )
    }
}

const selector = formValueSelector('questionForm');

function mapStateToProps(state) {
    return {
        questions: state.questions,
        questionType: selector(state, 'questionType')
    }
}

Home = reduxForm({
    form: 'questionForm'
})(Home)

export default Home = connect(mapStateToProps, {createQuestion})(Home);