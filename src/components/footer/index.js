import React from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'
import faLinkedin from '@fortawesome/fontawesome-free-brands/faLinkedin'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'

import {
	Container,
	Navbar,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

import logoImg from './logo.png'

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.footerRef = React.createRef();
		this.transparentRef = React.createRef();
	}
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		
		this.requestUpdateDimensions();
	}
	componentDidUpdate() {
		this.requestUpdateDimensions();
	}
	requestUpdateDimensions() {
		if(window.requestAnimationFrame) {
			requestAnimationFrame(() => requestAnimationFrame(() => this.updateDimensions()));
		}
		else {
			setTimeout(() => this.updateDimensions(), 16);
		}
	}
	updateDimensions() {
		$(this.transparentRef.current).css('height', $(this.footerRef.current).outerHeight() + 'px')
    }
	render() {
		return (
			<React.Fragment>
				<div ref={this.transparentRef} className="transparent clearfix" />
				<footer className="clearfix" ref={this.footerRef}>
					<Navbar dark expand="md">
						<Container className="flex-column navbar-text">
							<img src={logoImg} className="brand"/>
							
							<div className="copyright">
								Made with <FontAwesomeIcon icon={faHeart} /> in France &copy;2018 <a href="/">monsieur.tech</a>
							</div>
							
							<ul>
								<NavItem>
									<NavLink href="mailto:baptiste@monsieur.tech">
										<FontAwesomeIcon icon={faEnvelope} />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="https://github.com/daiyam/" target="_blank">
										<FontAwesomeIcon icon={faGithub} />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="https://twitter.com/baptisteaugrain/" target="_blank">
										<FontAwesomeIcon icon={faTwitter} />
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="https://www.linkedin.com/in/baptiste-augrain/" target="_blank">
										<FontAwesomeIcon icon={faLinkedin} />
									</NavLink>
								</NavItem>
							</ul>
						</Container>
					</Navbar>
				</footer>
			</React.Fragment>
		)
	}
}