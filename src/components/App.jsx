import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from '../history'
import CheckIn from './CheckIn'
import VisitorForm from './VisitorForm'
import HostForm from './HostForm'
import Dashboard from './Dashboard'

export class App extends Component {
	render() {
		return (
			<div className="container-fluid px-0">
				<Router history={history}>
					<div>
						<Switch>
							<Route path="/" exact component={CheckIn} />
							<Route path="/visitor" exact component={VisitorForm} />
							<Route path="/host" exact component={HostForm} />
							<Route path="/dashboard" exact component={Dashboard} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default App
