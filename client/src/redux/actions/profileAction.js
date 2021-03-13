import { GLOBALTYPES, DeleteData } from '../constants'
import { getDataApi, patchDataApi } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'

export const PROFILE_TYPES = {
	LOADING: 'LOADING',
	GET_USER: 'GET_USER',
	FOLLOW: 'FOLLOW',
	UNFOLLOW: 'UNFOLLOW',
}

export const getProfileUsers = ({ users, id, auth }) => async (dispatch) => {
	if (users.every((user) => user._id !== id)) {
		try {
			dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
			const res = await getDataApi(`/user/${id}`, auth.token)

			dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data })

			dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
		} catch (error) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
		}
	}
}

export const updateProfileUser = ({ userData, avatar, auth }) => async (dispatch) => {
	if (!userData.fullname) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please Enter your Full Name' } })

	if (userData.fullname.length > 25)
		return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Full Name should be less than 25 characters' } })

	if (userData.story.length > 200)
		return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Story should be at least 200 characters' } })

	try {
		let media
		dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

		if (avatar) media = await imageUpload([avatar])

		const res = await patchDataApi('user', { ...userData, avatar: avatar ? media[0].url : auth.user.avatar }, auth.token)

		dispatch({
			type: GLOBALTYPES.AUTH,
			payload: {
				...auth,
				user: {
					...auth.user,
					...userData,
					avatar: avatar ? media[0].url : auth.user.avatar,
				},
			},
		})

		dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
	}
}

export const follow = ({ users, user, auth }) => async (dispatch) => {
	let newUser

	if (users.every((item) => item._id !== user._id)) {
		newUser = { ...user, followers: [...user.followers, auth.user] }
	} else {
		users.forEach((item) => {
			if (item._id === user._id) {
				newUser = { ...item, followers: [...item.followers, auth.user] }
			}
		})
	}

	dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser })

	dispatch({
		type: GLOBALTYPES.AUTH,
		payload: {
			...auth,
			user: {
				...auth.user,
				following: [...auth.user.following, newUser],
			},
		},
	})

	try {
		await patchDataApi(`user/${user._id}/follow`, null, auth.token)
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
	}
}

export const unfollow = ({ users, user, auth }) => async (dispatch) => {
	let newUser

	if (users.every((item) => item._id !== user._id)) {
		newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) }
	} else {
		users.forEach((item) => {
			if (item._id === user._id) {
				newUser = { ...item, followers: DeleteData(item.followers, auth.user._id) }
			}
		})
	}

	dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser })

	dispatch({
		type: GLOBALTYPES.AUTH,
		payload: {
			...auth,
			user: {
				...auth.user,
				following: DeleteData(auth.user.following, newUser._id),
			},
		},
	})

	try {
		await patchDataApi(`user/${user._id}/unfollow`, null, auth.token)
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
	}
}
