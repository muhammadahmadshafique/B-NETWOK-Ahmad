import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageRender from './PageRender';
import Home from './pages/home';
import Login from './pages/login';

function App() {
	return (
		<Router>
			<input id="theme" type="checkbox" />
			<div className="App">
				<div className="main">
					<Route exact path="/" component={Login} />
					<Route exact path="/:page" component={PageRender} />
					<Route exact path="/:page/:id" component={PageRender} />
				</div>
			</div>
		</Router>
	);
}

export default App;
