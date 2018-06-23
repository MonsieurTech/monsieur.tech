import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'
import Sticky from 'react-stickynode'
import {
	Collapse,
	Container,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink
} from 'reactstrap'

// Icons
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

// Images
import logoImg from './logo.png'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	
		this.toggle = this.toggle.bind(this)
		this.state = {
			isOpen: false
		}
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	render() {
		return pug`
			header
				Sticky
					Navbar(dark expand='md')
						Container
							NavbarBrand(href='/') #[img(src=logoImg)]
							
							NavbarToggler(onClick=this.toggle)
							
							Collapse(isOpen=this.state.isOpen navbar)
								Nav.ml-auto.menu(navbar)
									NavItem
										NavLink(href='#home') Accueil
									NavItem
										NavLink(href='#contact') Contact
								Nav.social(navbar)
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