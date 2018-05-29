import React from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'

import logoImg from './logo.png'

import { Affix, Menu } from 'antd'

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<header>
				<Affix>
					<a href="/"><img src={logoImg} /></a>
					
					<Menu mode="horizontal">
						<Menu.Item>
							<a href="#home">Accueil</a>
						</Menu.Item>
					</Menu>
					{/* <Navbar dark expand="md">
						<Container>
							<NavbarBrand href="/"><img src={logoImg} /></NavbarBrand>
							
							<NavbarToggler onClick={this.toggle} />
							
							<Collapse isOpen={this.state.isOpen} navbar>
								<Nav className="ml-auto menu" navbar>
									<NavItem>
										<NavLink href="#home">Accueil</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="#contact">Contact</NavLink>
									</NavItem>
								</Nav>
								<Nav className="social" navbar>
									<NavItem>
										<NavLink href="mailto:baptiste@monsieur.tech">
											<FontAwesomeIcon icon={faEnvelope} />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="https://github.com/daiyam/"  target="_blank">
											<FontAwesomeIcon icon={faGithub} />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="https://twitter.com/baptisteaugrain/"  target="_blank">
											<FontAwesomeIcon icon={faTwitter} />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="https://www.linkedin.com/in/baptiste-augrain/"  target="_blank">
											<FontAwesomeIcon icon={faLinkedin} />
										</NavLink>
									</NavItem>
								</Nav>
							</Collapse>
						</Container>
					</Navbar> */}
				</Affix>
			</header>
		)
	}
}