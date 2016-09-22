import React from 'react';
import {connect} from 'react-redux';

import {deleteQuestion, editQuestion} from '../actions/index';

class QuestionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editView: false,
            questionTitle: '',
            questionAnswer: '',
            questionType: this.props.question.type,
            questionId: this.props.index
        }
    }

    handleChange(key, e) {
        let newState = {};
        newState[key] = e.target.value;
        this.setState(newState);
    }

    submitEditHandler(e) {
        e.preventDefault();
        this.props.editQuestion({
            questionTitle: this.state.questionTitle,
            questionAnswer: this.state.questionAnswer,
            questionType: this.props.question.type,
            questionId: this.props.index
        })
        this.setState({editView: false});
    }

    toggleEdit() {
        this.state.editView ? this.setState({editView: false}) : this.setState({editView: true});
    }

    render() {
        const {question, deleteQuestion} = this.props;
        return (
            <li className="list-group-item">
                <h5 className="list-group-item-heading">{question.questionTitle}</h5>
                <p className="list-group-item-text">Answer: {question.questionAnswer}</p>
                <button
                    onClick={this.toggleEdit.bind(this)}
                    className="btn btn-default">
                    Edit
                </button>
                <button
                    onClick={deleteQuestion.bind(this, question.questionTitle)}
                    className="btn btn-danger">
                    Delete
                </button>
                {this.state.editView &&
                <form onSubmit={this.submitEditHandler.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="questionTitle">Question:</label>
                        <input
                            onChange={this.handleChange.bind(this, 'questionTitle')}
                            name="questionTitle"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="questionAnswer">Answer:</label>
                        <input
                            onChange={this.handleChange.bind(this, 'questionAnswer')}
                            name="questionAnswer"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit edits</button>
                </form>}
            </li>
        )
    }
}

export default QuestionItem = connect(null, {deleteQuestion, editQuestion})(QuestionItem);