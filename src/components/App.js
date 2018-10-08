import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { handleInitialData } from '../actions/shared.js';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Question from './Question';
import NoMatch from './NoMatch';

class App extends Component {
	componentDidMount () {
		this.props.dispatch(handleInitialData());
	}

	render () {
		const { authedUser } = this.props;

		return (
			<Router>
				<div>
					<LoadingBar />
					{authedUser
						? <div className='container'>
								<NavBar />
								<Switch>
									<Route path='/' exact component={Dashboard}/>
									<Route path='/new-question' component={NewQuestion} />
									<Route path='/leaderboard' component={Leaderboard} />
									<Route path='/question/:id' component={Question} />
									<Route path='*' component={NoMatch} />
								</Switch>
						  </div>
						: <LoginPage />
					}
				</div>
			</Router>
		);
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser
	};
}	

export default connect(mapStateToProps)(App);