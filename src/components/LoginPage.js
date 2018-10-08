import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser';

class LoginPage extends Component {
	handleLogin = (userID) => {
		this.props.dispatch(handleSetAuthedUser(userID));
	}

	render () {
		const { users } = this.props;

		return (
			<div className='wrapper'>
				<h1 className='header'>Would You Rather App</h1>
				<br />
				<center>
					<span className='continue'>Please login to continue...</span>
				</center>
				<br />
				<div className='logged-in-user'>
					<p>Choose Account:</p><br />
					<div className='accounts'>
						<ol className='users-list'>
							{Object.keys(users).map(key => (
								<li className='users-list-item' key={users[key].id} onClick={() => this.handleLogin(key)}>
									<div className='avatar' style={{backgroundImage: `url(${users[key].avatarURL})`}}></div>
									<div className="user-details">
					                     <p>{users[key].name}</p>
					                     <p>@{users[key].id}</p>
                  					</div>
								</li>
							))}
						</ol>	
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users
	}
}

export default connect(mapStateToProps)(LoginPage);