import React, { Component } from 'react';
import { connect } from 'react-redux';
import Unanswered from './Unanswered';
import Answered from './Answered';

class Dashboard extends Component {
	state = {
		activeTab: 'unans'
	}

	switchQuesType = (activeTab) => {
		this.setState(() => ({
			activeTab
		}));
	}

	render () {
		const { activeTab } = this.state;

		return (
			<div className='dashboard-wrapper'>
				<div className='question-type'>
			        <ul className='question-type-list'>
			          <li 
			          	className={`question-type-list-item ${activeTab === 'unans' ? 'active-ques-list-item' : 'unactive'}`}
			          	onClick={() => this.switchQuesType('unans')}
			          	>
			          	Unanswered
			          </li>
			          <li 
			          	className={`question-type-list-item ${activeTab === 'ans'? 'active-ques-list-item' : 'unactive'}`}
			          	onClick={() => this.switchQuesType('ans')}
			          	> 	
			          	Answered
			          </li>
			        </ul>
	      		</div>

	      		<div className='questions'>
	      			{activeTab === 'unans'
	      				? <Unanswered />
	      				: <Answered />
	      			}
	      		</div>
      		</div>
		);
	}
}

export default connect()(Dashboard);