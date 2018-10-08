import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Unanswered extends Component {
	render () {
		const { users, unansQues } = this.props;

		return (
			<div>
			{unansQues.map(ques => (
				<Link to={`/question/${ques.id}`} key={ques.id}>
					<div className='question-card'>
						<div className='ques-ask-by'>
							<ul>
				              <li><div className='ask-by-avatar' style={{backgroundImage: `url(${users[ques.author].avatarURL})`}}></div></li>
				              <li style={{paddingTop: '5px'}}>{users[ques.author].name} asks:</li>
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
										<p>{ques.optionOne.text}</p>
									</div>
								</div>
								<div className='options'>
									<div className='option-value'>
										<span>[Option B]</span>
										<br /><br />
										<p>{ques.optionTwo.text}</p>
									</div>
								</div>
								<div className='vote-option'>
									<button>View Poll</button>
								</div>
							</div>
						</div>
					</div>
				</Link>
			))}
			</div>
		);
	}
}

function mapStateToProps ({ authedUser, users, questions }) {
	const unansIDs = Object.keys(questions).filter(id => !users[authedUser].answers[id]); 

	return {
		authedUser,
		users,
		unansQues: unansIDs 
				? unansIDs.map(id => questions[id])
					.sort((a, b) => b.timestamp - a.timestamp)
				: []
	}
}

export default connect(mapStateToProps)(Unanswered);