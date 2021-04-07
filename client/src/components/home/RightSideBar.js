import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'
import FollowBtn from '../FollowBtn'
import { getSuggestions } from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
	const { auth, suggestions } = useSelector((state) => state)

	const dispatch = useDispatch()

	return (
		<div className="my-4 ">
			<UserCard user={auth.user} />

			<div className="pt-2 my-2 d-flex justify-content-between align-items-center">
				<h6 className="text-muted">Suggestions For You</h6>

				{!suggestions.loading && (
					<i class="fas fa-redo" style={{ cursor: 'pointer', paddingRight: '35px' }} onClick={() => dispatch(getSuggestions(auth.token))} />
				)}
			</div>

			{suggestions.loading ? (
				<img className="mx-auto my-4 d-flex" src={LoadIcon} alt="laoding" />
			) : (
				<div className="suggestions">
					{suggestions.users.map((user) => (
						<UserCard key={user._id} user={user}>
							<FollowBtn user={user} />
						</UserCard>
					))}
				</div>
			)}

			<div style={{ opacity: '0.7' }} className="my-3 ">
				<small className="text-muted">&copy; 2021 B-Network From Engr. Muhammad Bilal</small>
			</div>
		</div>
	)
}

export default RightSideBar
