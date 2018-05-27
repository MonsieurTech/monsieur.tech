import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import {Helmet} from "react-helmet";

export default class Layout extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				{this.props.children}
				<Footer />
			</React.Fragment>
		)
	}
}