export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const UNSET_AUTHED_USER = 'UNSET_AUTHED_USER';

function setAuthedUser (id = null) {
	return {
		type: SET_AUTHED_USER,
		id
	}
}

export function handleSetAuthedUser (id) {
	return (dispatch) => {
		return dispatch(setAuthedUser(id));
	}
}

function unsetAuthedUser () {
	return {
		type: UNSET_AUTHED_USER,
		id: null
	}
}

export function handleUnsetAuthedUser () {
	return (dispatch) => {
		return dispatch(unsetAuthedUser());
	}
}