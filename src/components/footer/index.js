import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React, {Fragment} from 'react'
import {
	Container,
	Nav,
	Navbar,
	NavItem,
	NavLink
} from 'reactstrap'

//Icons
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'

//Images
import logoImg from './logo.png'

export default class Footer extends React.Component {
	constructor(props) {
		super(props)
		
		this.footerRef = React.createRef()
		
		this.state = {
			height: 0
		}
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions)
		
		this.requestUpdateDimensions()
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions)
	}
	requestUpdateDimensions() {
		if(window.requestAnimationFrame) {
			requestAnimationFrame(() => requestAnimationFrame(() => this.updateDimensions()))
		}
		else {
			setTimeout(() => this.updateDimensions(), 16)
		}
	}
	updateDimensions() {
		let footer
		if(this.footerRef && (footer = this.footerRef.current)) {
			this.setState({
				height: footer.clientHeight
			})
		}
    }
	render() {
		return pug`
			Fragment
				.transparent.clearfix(style={
					height: this.state.height
				})
				footer.clearfix(ref=this.footerRef)
					Navbar(dark expand='md')
						Container.flex-column.navbar-text
							img.brand(src=logoImg)
							
							.copyright Made with #[FontAwesomeIcon(icon=faHeart)] in France ©2018 #[a(href='/') monsieur.tech]

							ul
								NavItem
									NavLink(href='mailto:baptiste@monsieur.tech')
										FontAwesomeIcon(icon=faEnvelope)
								NavItem
									NavLink(href='https://github.com/daiyam/' target='_blank')
										FontAwesomeIcon(icon=faGithub)
								NavItem
									NavLink(href='https://twitter.com/baptisteaugrain/' target='_blank')
										FontAwesomeIcon(icon=faTwitter)
								NavItem
									NavLink(href='https://www.linkedin.com/in/baptiste-augrain/' target='_blank')
										FontAwesomeIcon(icon=faLinkedin)
		`
	}
}