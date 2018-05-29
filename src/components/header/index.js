import React from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'

import {
	Container,
	Image,
	Menu,
	Visibility,
} from 'semantic-ui-react'

import logoImg from './logo.png'

export default class Header extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			menuFixed: false
		};
	}
	stickTopMenu() {
		return this.setState({
				menuFixed: true
		})
	}
	unStickTopMenu() {
		this.setState({
			menuFixed: false
		})
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		const { menuFixed } = this.state
		
		return (
			<header>
				{/* <Sticky>
					<Navbar dark expand="md">
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
										<NavLink href="https://github.com/daiyam/"target="_blank">
											<FontAwesomeIcon icon={faGithub} />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="https://twitter.com/baptisteaugrain/"target="_blank">
											<FontAwesomeIcon icon={faTwitter} />
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="https://www.linkedin.com/in/baptiste-augrain/"target="_blank">
											<FontAwesomeIcon icon={faLinkedin} />
										</NavLink>
									</NavItem>
								</Nav>
							</Collapse>
						</Container>
					</Navbar>
				</Sticky> */}
				<Visibility	onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
					<Menu borderless fixed={menuFixed && 'top'}>
						<Container text>
							<Menu.Item as='a' href='/'>
								<Image src={logoImg} />
							</Menu.Item>
							<Container textAlign='right'>
								<Menu.Item as='a' href='#home'>Accueil</Menu.Item>
							</Container>
						</Container>
					</Menu>
				</Visibility>
			</header>
		)
	}
}