import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUnsetAuthedUser } from '../actions/authedUser';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	state = {
		activeTab: 'home'
	}

	handleActiveTab = (activeTab) => {
		this.setState(() => ({
			activeTab
		}))
	}

	handleLogout = () => {
		this.props.dispatch(handleUnsetAuthedUser());
	}

	render () {
		const { authedUser, users } = this.props;
		const { activeTab } =  this.state;

		return (
			<div className='nav-container'>
	        	<div className='nav-wrapper'>
	        		<ul className='nav-bar'>
		         		<Link to='/'>
		         			<li 
		         				className={`nav-list-item ${activeTab === 'home' ? 'active-nav-item': ' '}`}
		         				onClick={() => this.handleActiveTab('home')}>
		         				Home
		         			</li>
		         		</Link>
					    <Link to='/new-question'>
					    	<li 
					    		className={`nav-list-item ${activeTab === 'new' ? 'active-nav-item' : ' '}`}
					    		onClick={() => this.handleActiveTab('new')}>
					    		New Question
					    	</li>
					    </Link>
			            <Link to='/leaderboard'>
			            	<li 
			            		className={`nav-list-item ${activeTab === 'lead' ? 'active-nav-item' : ' '}`}
			            		onClick={() => this.handleActiveTab('lead')}>
			            		Leader Board
			            	</li>
			            </Link>
			            <li className='nav-list-item nav-right' onClick={this.handleLogout}>Logout</li>
			            <li className='nav-list-item nav-right'>{users[authedUser] ? users[authedUser].name : ' '}</li>
			            <li className='nav-list-item nav-right nav-list-avatar'>
            		  		<div className="nav-avatar" style={{backgroundImage: `url(${users[authedUser] ? users[authedUser].avatarURL : ' '})`}}></div>
           			    </li>
	         		</ul>
	        	</div>
	     	</div>
		);
	}
}

function mapStateToProps ({ authedUser, users }) {
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(NavBar);