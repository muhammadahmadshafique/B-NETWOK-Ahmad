import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/constants'

const EditProfile = ({ setOnEdit }) => {
	const initState = { fullname: '', mobile: '', address: '', website: '', gender: '', story: '' }

	const [userData, setUserData] = useState(initState)
	const { fullname, mobile, address, website, story } = userData

	const [avatar, setAvatar] = useState('')

	const { auth, theme } = useSelector((state) => state)

	const dispatch = useDispatch()

	useEffect(() => {
		setUserData(auth.user)
	}, [auth.user])

	const changeAvatar = (e) => {
		const file = e.target.files[0]
		const error = checkImage(file)
		if (error) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error } })

		setAvatar(file)
	}

	const handleInput = (e) => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	return (
		<div className="edit_profile">
			<button className="btn btn-danger btn_close" onClick={() => setOnEdit(false)}>
				Close
			</button>

			<form>
				<div className="info_avatar">
					<img
						src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
						alt="avatar"
						style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
					/>
					<span>
						<i className="fas fa-camera" />
						<p>Change</p>
						<input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="fullname">Full Name</label>
					<div className="position-relative">
						<input type="text" className="form-control" id="fullname" name="fullname" value={fullname} onChange={handleInput} />
						<small className="text-danger position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
							{fullname.length}/25
						</small>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="mobile">Mobile</label>
					<input type="text" name="mobile" value={mobile} id="mobile" className="form-control" onChange={handleInput} />
				</div>

				<div className="form-group">
					<label htmlFor="address">Address</label>
					<input type="text" name="address" value={address} id="address" className="form-control" onChange={handleInput} />
				</div>

				<div className="form-group">
					<label htmlFor="website">Website</label>
					<input type="text" name="website" value={website} id="website" className="form-control" onChange={handleInput} />
				</div>

				<div className="form-group">
					<label htmlFor="story">Story</label>
					<textarea type="text" name="story" value={story} id="story" className="form-control" onChange={handleInput} cols="30" rows="4" />
					<small className="text-danger d-block text-right ">{story.length}/200</small>
				</div>

				<label htmlFor="gender">Gender</label>
				<div className="input-group-prepend px-0 mb-4">
					<select name="gender" id="gender" className="custom-select text-capitalize" onChange={handleInput}>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>
				<button className="btn btn-info w-100" type="submit">
					Save
				</button>
			</form>
		</div>
	)
}

export default EditProfile
