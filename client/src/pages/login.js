import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch } from 'react-redux'

const Login = () => {
	const initialState = { email: '', password: '' }
	const [userData, setUserData] = useState(initialState)
	const { email, password } = userData

	const [typePass, setTypePass] = useState(false)

	const dispatch = useDispatch()

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(login(userData))
	}

	return (
		<div className="auth-page">
			<form onSubmit={handleSubmit}>
				<h3 className="text-uppercase text-center mb-5">B-Network</h3>

				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={handleChangeInput}
						value={email}
						name="email"
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>

				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<div className="pass">
						<input
							type={typePass ? 'text' : 'password'}
							className="form-control"
							id="password-field"
							onChange={handleChangeInput}
							value={password}
							name="password"
						/>
						<i className={`fas ${!typePass ? 'fa-eye' : 'fa-eye-slash'}`} onClick={() => setTypePass(!typePass)}></i>
					</div>
				</div>

				<button type="submit" className="btn btn-info w-100" disabled={email && password ? false : true}>
					Login
				</button>

				<p className="m-2">
					You don't have an account??{' '}
					<Link to="/register" style={{ color: 'red' }}>
						Register Now
					</Link>
				</p>
			</form>
		</div>
	)
}

export default Login
