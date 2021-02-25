import { notifyConstants } from '../constants'

const initialState = {}

const notifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case notifyConstants.NOTIFY:
			return action.payload

		default:
			return state
	}
}

export default notifyReducer
