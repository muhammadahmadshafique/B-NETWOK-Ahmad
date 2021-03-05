import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataApi } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/constants'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'

const Search = () => {
	const [search, setSearch] = useState('')
	const [users, setUsers] = useState([])

	const { auth } = useSelector((state) => state)

	const dispatch = useDispatch()

	useEffect(() => {
		if (search) {
			getDataApi(`search?username=${search}`, auth.token)
				.then((res) => setUsers(res.data.users))
				.catch((error) => {
					dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
				})
		} else {
			setUsers([])
		}
	}, [search, auth.token, dispatch])

	const handleClose = () => {
		setSearch('')
		setUsers([])
	}

	return (
		<form className="search_form">
			<input
				type="text"
				name="search"
				id="search"
				value={search}
				onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
			/>
			<div className="search_icon">
				<span className="material-icons" style={{ opacity: search ? '0' : '0.3' }}>
					search
				</span>
				<span> Search</span>
			</div>

			<div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1 }}>
				&times;
			</div>

			<div className="users">
				{search &&
					users.map((user) => (
						<Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
							<UserCard user={user} border="border" />
						</Link>
					))}
			</div>
		</form>
	)
}

export default Search
