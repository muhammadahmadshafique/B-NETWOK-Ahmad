import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { refreshToken } from './redux/actions/authAction'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { getPosts } from './redux/actions/postAction'

function App() {
	const { auth, status, modal } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])

	useEffect(() => {
		if (auth.token) dispatch(getPosts(auth.token))
	}, [dispatch, auth.token])

	const d = new Date()
	return (
		<Router>
			<Alert />
			<input id="theme" type="checkbox" />
			<div className={`App ${(status || modal) && 'mode'}`}>
				<div className="main">
					{auth.token && <Header />}
					{status && <StatusModal />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/register" component={Register} />

					<PrivateRouter exact path="/:page" component={PageRender} />
					<PrivateRouter exact path="/:page/:id" component={PageRender} />
				</div>
			</div>
		</Router>
	)
}

export default App
