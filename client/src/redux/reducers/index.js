import { combineReducers } from 'redux'

import authReducer from './authReducer'
import alertReducer from './alertReducer'
import themeReducer from './themeReducer'
import profileReducer from './profileReducer'
import statusReducer from './statusReducer'
import postReducer from './postReducer'
import modalReducer from './modalReducer'
import detailPostReducer from './detailPostReducer'
import discoverReducer from './discoverReducer'
import suggestionsReducer from './suggestionsReducer'

export default combineReducers({
	auth: authReducer,
	alert: alertReducer,
	theme: themeReducer,
	profile: profileReducer,
	status: statusReducer,
	homePosts: postReducer,
	modal: modalReducer,
	detailPost: detailPostReducer,
	discover: discoverReducer,
	suggestions: suggestionsReducer,
})
