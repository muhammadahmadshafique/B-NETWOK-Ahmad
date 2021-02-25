import { authConstants } from '../constants'

const initialState = {}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.AUTH:
			return action.payload

		default:
			return state
	}
}

export default authReducer
