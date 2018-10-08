import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const options = serializeForm(e.target, {hash: true});

		this.props.dispatch(handleAddQuestion(options));
		this.props.history.push('/');
	}

	render() {
		return (
			<div className='add-ques-wrapper'>
				<div className='add-ques-header'>
					Add New Question
				</div>
			    <form onSubmit={this.handleSubmit}>
			      <div className='ques-options'>
			         <div className='opt'>
			          <span>[Option A]</span><br /><br />
			          <input type='text' name='optionOneText' />
			        </div>
			        <div className='opt'>
			          <span>[Option B]</span><br /><br />
			          <input type='text' name='optionTwoText' />
			        </div>
			      </div>
			      <div className='submit-ques'>
			          <input type='submit' value='Submit'/>
			       </div>
			     </form>
			</div>
		);
	}
}

export default connect()(NewQuestion);