import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataApi } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/constants'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'

const Search = () => {
	const [search, setSearch] = useState('')
	const [users, setUsers] = useState([])
	const [load, setLoad] = useState(false)

	const { auth } = useSelector((state) => state)

	const dispatch = useDispatch()

	// Auto Search While typeing
	// useEffect(() => {
	// 	if (search) {
	// 		getDataApi(`search?username=${search}`, auth.token)
	// 			.then((res) => setUsers(res.data.users))
	// 			.catch((error) => {
	// 				dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
	// 			})
	// 	} else {
	// 		setUsers([])
	// 	}
	// }, [search, auth.token, dispatch])

	const handleSearch = async (e) => {
		e.preventDefault()

		if (!search) return

		try {
			setLoad(true)
			const res = await getDataApi(`search?username=${search}`, auth.token)
			setUsers(res.data.users)
			setLoad(false)
		} catch (error) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
		}
	}

	const handleClose = () => {
		setSearch('')
		setUsers([])
	}

	return (
		<form className="search_form" onSubmit={handleSearch}>
			<input
				type="text"
				name="search"
				id="search"
				title="Enter To Search"
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

			<button type="submit" style={{ display: 'none' }}>
				Search
			</button>

			{load && <img className="loading" src={LoadIcon} alt="loading" />}

			<div className="users">
				{search && users.map((user) => <UserCard key={user._id} user={user} border="border" handleClose={handleClose} />)}
			</div>
		</form>
	)
}

export default Search
