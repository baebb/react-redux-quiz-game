import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {reduxForm, Field} from 'redux-form';


class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            correct: 0,
            incorrect: 0,
            checked: false
        }
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    quizHandler(props) {
        if (this.props.params.id == this.props.questions.length - 1) {
            this.checkAnswers(props);
            this.props.reset();
        } else {
            this.context.router.push(`/question/${Number(this.props.params.id) + 1}`);
        }
    }

    checkAnswers(answers) {
        let correct = 0,
            incorrect = 0;

        this.props.questions.forEach((question, index) => {
            if (question.questionAnswer == answers[index]) {
                correct++;
            } else {
                incorrect++;
            }
        })

        this.setState({
            correct: correct,
            incorrect: incorrect,
            checked: true
        })
    }

    render() {
        const {handleSubmit, questions} = this.props;
        const {id} = this.props.params;

        if (!questions[id]) {
            return (
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h2 className="display-4 text-xs-center">
                            No question found
                        </h2>
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h2 className="display-4 text-xs-center">
                        {questions[id].questionTitle}
                    </h2>
                    <form onSubmit={handleSubmit(this.quizHandler.bind(this))}>
                        <div className="form-group">
                            <label htmlFor={`question${id}`}>Your Answer:</label>
                            <Field name={`${id}`} component="input" className="form-control" type="text"/>
                            <Link
                                disabled={id == '0'}
                                to={`/question/${Number(id) - 1}`}
                                className={id == '0' ? "btn btn-danger pull-xs-left disabled" : "btn btn-danger pull-xs-left"}
                            >
                                Back
                            </Link>
                            <button
                                disabled={this.state.checked}
                                type="submit"
                                className="btn btn-primary pull-xs-right"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                    {this.state.checked &&
                    <div className="row text-xs-center">
                            <h4>{this.state.correct} correct</h4>
                            <h4>{this.state.incorrect} incorrect</h4>
                        <Link to="/" className="btn btn-danger">Back to creator mode</Link>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    }
}

Question = reduxForm({
    form: 'answerForm',
    destroyOnUnmount: false
})(Question)

export default Question = connect(mapStateToProps)(Question);

