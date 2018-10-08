import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { handleSetAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading());

		return getInitialData()
			.then(({ authedUser, users, questions }) => {
				dispatch(handleSetAuthedUser(authedUser));
				dispatch(receiveUsers(users));
				dispatch(receiveQuestions(questions));
				
				dispatch(hideLoading());
			})
	}
}