import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {reduxForm, Field, formValueSelector } from 'redux-form';

import {createQuestion} from '../actions/index';


class Home extends React.Component {
    createQuestionHandler(props) {
        // console.log(props);
        this.props.createQuestion(props);
    }

    render() {
        console.log(this.props);
        const {handleSubmit, questionType} = this.props;
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h2 className="display-4 text-xs-center">EZ-Quiz Creator 2000</h2>

                    <form onSubmit={handleSubmit(this.createQuestionHandler.bind(this))}>
                        <div className="form-group">
                            <label><Field name="questionType" component="input" type="radio" value="boolean"/>True or False</label>
                            <label><Field name="questionType" component="input" type="radio" value="text"/>Text Answer</label>
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
                            <label><Field name="questionAnswer" component="input" type="radio" value="true"/>True</label>
                            <label><Field name="questionAnswer" component="input" type="radio" value="false"/>False</label>
                        </div>}
                        <button type="submit" className="btn btn-primary">Add Quesiton</button>
                    </form>
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