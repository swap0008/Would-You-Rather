import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
	render () {
		const { users } = this.props;

		return (
			<div>
				{users.map(user => (
					<div className='leaderboard-card' key={user.id}>
					  <div className='leaderboard-info'>
					    <div className='user-leaderboard leaderboard'>
					    <div className='avatar-leaderboard' style={{backgroundImage: `url(${user.avatarURL})`}}>
					      
					    </div>
					    <div className='name-leaderboard'>
					        <div>{user.name}</div>
					    </div>
					    </div>
					    <div className='info-leaderboard leaderboard'>
					    <div className='scoreInfo'>
					      <ul>
					        <li className='score'>Total Score:</li>
					        <li className='score-number'>{Object.keys(user.answers).length + user.questions.length}</li>
					      </ul>
					    </div>
					    <div className='ans-section'>
					      <div className='ans-create score-ans'>Answered Questions:</div> 
					      <div className='ans-create num'>{Object.keys(user.answers).length}</div>
					    </div>
					    <div className='create-section'>
					      <div className='ans-create score-ans'>Created Questions:</div>
					      <div className='ans-create num'>{user.questions.length}</div>
					    </div>
					  </div>
					  </div>
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps ({ users }) {
	return {
		users: Object.keys(users).map((id) => users[id])
				.sort((a, b) => Object.keys(b.answers).length + b.questions.length - (Object.keys(a.answers).length + a.questions.length))
	}
}

export default connect(mapStateToProps)(Leaderboard);