import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DISCOVER_TYPES, getDiscoverPost } from '../redux/actions/discoverAction'
import LoadIcon from '../images/loading.gif'
import PostThumb from '../components/PostThumb'
import LoadMoreBtn from '../components/LoadMoreBtn'
import { getDataApi } from '../utils/fetchData'

const Discover = () => {
	const { auth, discover } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [load, setLoad] = useState(false)

	useEffect(() => {
		if (!discover.firstLoad) {
			dispatch(getDiscoverPost(auth.token))
		}
	}, [dispatch, auth.token, discover.firstLoad])

	const handleLoadMore = async () => {
		setLoad(true)

		const res = await getDataApi(`post_discover?limit=${discover.page * 9}`, auth.token)
		dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })

		setLoad(false)
	}

	return (
		<div>
			{discover.loading ? (
				<img src={LoadIcon} alt="loading..." className="mx-auto my-4 d-block" />
			) : (
				<PostThumb posts={discover.posts} result={discover.result} />
			)}

			{load && <img src={LoadIcon} alt="loading..." className="mx-auto d-block" />}

			{!discover.loading && <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />}
		</div>
	)
}

export default Discover
