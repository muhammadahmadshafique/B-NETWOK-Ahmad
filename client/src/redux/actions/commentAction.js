import { GLOBALTYPES } from '../constants'
import { POST_TYPES } from '../actions/postAction'
import { postDataApi } from '../../utils/fetchData'

export const createComment = (post, newComment, auth) => async (dispatch) => {
	const newPost = { ...post, comments: [...post.comments, newComment] }

	dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

	try {
		const data = { ...newComment, postId: post._id }
		const res = await postDataApi('comment', data, auth.token)

		const newData = { ...res.data.newComment, user: auth.user }
		const newPost = { ...post, comments: [...post.comments, newData] }

		dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
	} catch (error) {
		dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
	}
}
