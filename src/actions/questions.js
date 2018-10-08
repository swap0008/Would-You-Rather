import { saveQuestion, saveQuestionAnswer } from '../utils/api'; 
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'SAVE_QUESTION';
export const ADD_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion ({optionOneText, optionTwoText}) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	}
}

function addQuestionAnswer ({ authedUser, qid, answer }) {
	return {
		type: ADD_QUESTION_ANSWER,
		authedUser,
		qid,
		answer
	}
}

export function handleAddQuestionAnswer (info) {
	return (dispatch, getState) => {
		const { authedUser } = getState();
		const { qid, answer } = info;
		const questionInfo = {
			authedUser,
			qid,
			answer
		};

		dispatch(showLoading());

		return saveQuestionAnswer(questionInfo)
			.then(() => dispatch(addQuestionAnswer(questionInfo)))
			.then(() => dispatch(hideLoading()));
	}
}


