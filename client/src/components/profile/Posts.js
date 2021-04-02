import { useEffect, useState } from 'react'
import LoadMoreBtn from '../LoadMoreBtn'
import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import { getDataApi } from '../../utils/fetchData'
import { PROFILE_TYPES } from '../../redux/actions/profileAction'

const Posts = ({ auth, id, profile, dispatch }) => {
	const [posts, setPosts] = useState([])
	const [result, setResult] = useState(9)

	const [page, setPage] = useState(0)
	const [load, setLoad] = useState(false)

	useEffect(() => {
		profile.posts.forEach((data) => {
			if (data._id === id) {
				setPosts(data.posts)
				setResult(data.result)
				setPage(data.page)
			}
		})
	}, [profile.posts, id])

	const handleLoadMore = async () => {
		setLoad(true)

		const res = await getDataApi(`user_posts/${id}?limit=${page * 9}`, auth.token)
		const newData = { ...res.data, page: page + 1, _id: id }
		dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData })

		setLoad(false)
	}

	return (
		<div>
			<PostThumb posts={posts} result={result} />

			{load && <img src={LoadIcon} alt="loading..." className="mx-auto d-block" />}

			<LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />
		</div>
	)
}

export default Posts
