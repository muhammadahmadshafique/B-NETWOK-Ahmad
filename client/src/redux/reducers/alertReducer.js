import { GLOBALTYPES } from '../constants'

const initialState = {}

const notifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case GLOBALTYPES.ALERT:
			return action.payload

		default:
			return state
	}
}

export default notifyReducer
