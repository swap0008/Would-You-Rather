import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoMatch from './NoMatch';
import { Link } from 'react-router-dom';
import { handleAddQuestionAnswer } from '../actions/questions';

class Question extends Component {
	handleVoteQuery = (qid, answer) => {
		const { dispatch } = this.props;

		const info = {
			authedUser: this.props.authedUser,
			qid,
			answer
		};

		dispatch(handleAddQuestionAnswer(info));
	}

	render () {
		const { id, authedUser, users, questions } = this.props;

		if (!questions[id]) {
			return <NoMatch />
		}

		const user = users[questions[id].author];
		const question = questions[id];

		if (!users[authedUser].answers[id]) {
			return (
				<Link to={`/question/${id}`}>
					<div className='question-card'>
						<div className='ques-ask-by'>
							<ul>
				              <li><div className='ask-by-avatar' style={{backgroundImage: `url(${users[question.author].avatarURL})`}}></div></li>
				              <li style={{paddingTop: '5px'}}>{users[question.author].name} asks:</li>
				            </ul>
						</div>
						<div className='would-you-rather'>
							<div className='options-container'>
								<div className='option-header'>
									Would You Rather...
								</div>
								<div className='options'>
									<div className='option-value'>
										<span>[Option A]</span>
										<br /><br />
										<p>{question.optionOne.text}</p>
									</div>
									<div className='vote-option'>
										<button onClick={() => this.handleVoteQuery(id, 'optionOne')}>Vote A</button>
									</div>
								</div>
								<div className='options'>
									<div className='option-value'>
										<span>[Option B]</span>
										<br /><br />
										<p>{question.optionTwo.text}</p>
									</div>
									<div className='vote-option'>
										<button onClick={() => this.handleVoteQuery(id, 'optionTwo')}>Vote B</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Link>
			);
		}

		const optionOneVote = question.optionOne.votes.length;
		const optionTwoVote = question.optionTwo.votes.length;
		const totalVote = question.optionOne.votes.length + question.optionTwo.votes.length;

		const votePerOne = Math.floor((optionOneVote/(totalVote))*1000)/10;
		const votePerTwo = Math.floor((optionTwoVote/(totalVote))*1000)/10;

		return (
			<div className='ques-details-wrapper'>
			  <div className='ques-details-header'>
			    Asked By {user.name}
			  </div>
			  <div className='details'>
			    <div className='details-avatar'>
			      <div className='avatar-image' style={{backgroundImage: `url(${user.avatarURL})`}}></div>
			    </div>
			    <div className='ques-details'>
			      <div className='result'>Results:</div>
			      <div className='optionOne-wrapper'>
			        <div className='question-info'>
			        	Would you rather {question.optionOne.text}?
			        	{users[authedUser].answers[id] === 'optionOne' ? '[Your Vote]' : ' '}
			        </div>
			        <div className='progress-bar'>
			          <div className='progress' style={{width: `${votePerOne}%`}}>{votePerOne}%</div>
			        </div>
			        <div className='votes'>{optionOneVote} out of {totalVote} votes</div>
			      </div>
			      <div className='optionTwo-wrapper'>
			        <div className='question-info'>
			        	Would you rather {question.optionTwo.text}?
			        	{users[authedUser].answers[id] === 'optionTwo' ? '[Your Vote]' : ' '}
			        </div>
			        <div className='progress-bar'>
			          <div className='progress' style={{width: `${votePerTwo}%`}}>{votePerTwo}%</div>
			        </div>
			        <div className='votes'>{optionTwoVote} out of {totalVote} votes</div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

function mapStateToProps ({ authedUser, users, questions}, props) {
	const { id } = props.match.params;

	return {
		id,
		authedUser,
		users,
		questions
	}
}

export default connect(mapStateToProps)(Question);