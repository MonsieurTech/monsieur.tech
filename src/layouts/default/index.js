import React, {Fragment} from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default class Layout extends React.Component {
	render() {
		return pug`
			Fragment
				Header
				= this.props.children
				Footer
		`
	}
}