import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import 'semantic-ui-less/definitions/globals/reset.less';
import 'semantic-ui-less/definitions/globals/site.less';

import './styles/main.scss'

class App extends React.Component {
	render() {
		return (
			<Router>
				<Routes />
			</Router>
		)
	}
}

export default hot(module)(App)