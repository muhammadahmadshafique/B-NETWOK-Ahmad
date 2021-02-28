import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { refreshToken } from './redux/actions/authAction'
import Home from './pages/home'
import Login from './pages/login'
import PageRender from './PageRender'
import Alert from './components/alert/Alert'
import Header from './components/Header'

function App() {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])

	return (
		<Router>
			<Alert />
			<input id="theme" type="checkbox" />
			<div className="App">
				<div className="main">
					{auth.token && <Header />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/:page" component={PageRender} />
					<Route exact path="/:page/:id" component={PageRender} />
				</div>
			</div>
		</Router>
	)
}

export default App
