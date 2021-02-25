import { postDataApi } from '../../utils/fetchData'
import { authConstants, notifyConstants } from '../constants'

export const login = (data) => async (dispatch) => {
	try {
		dispatch({ type: notifyConstants.NOTIFY, payload: { loading: true } })
		const res = await postDataApi('login', data)
		dispatch({
			type: authConstants.AUTH,
			payload: {
				token: res.data.access_token,
				user: res.data.user,
			},
		})

		localStorage.setItem('firstLogin', true)

		dispatch({
			type: notifyConstants.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		})
	} catch (error) {
		dispatch({ type: notifyConstants.NOTIFY, payload: { error: error.response.data.msg } })
	}
}
