import Layout from '~/src/layouts/default'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import {
	Button,
	Col,
	Input,
	Row,
	UncontrolledAlert
} from 'reactstrap'
import styled, { keyframes } from 'styled-components'

// Animations
import fadeInUp from 'react-animations/lib/fade-in-up'
import zoomIn from 'react-animations/lib/zoom-in'

// Images
import slideImg from './P4265941.jpg'

// Security
import ReCAPTCHA from 'react-google-recaptcha'

const DIV = styled.div`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`
const H3 = styled.h3`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`
const P = styled.p`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`

function urlEncodeFormData(fd){
	let s = ''
	
	function encode(s) {
		return encodeURIComponent(s).replace(/%20/g, '+')
	}
	
	for(let pair of fd.entries()) {
		if(typeof pair[1] === 'string') {
			s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1])
		}
	}
	
	return s
}

export default class Page extends React.Component {
	constructor(props) {
		super(props)
		
		this.handleCaptcha = this.handleCaptcha.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		
		this.state = {
			captcha: '',
			state: 'INPUT'
		}
		
		this.recaptcha = React.createRef()
	}
	handleCaptcha(value) {
		this.setState({
			captcha: value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		
		if(this.state.captcha.length === 0) {
			return this.setState({
				state: 'NO_CAPTCHA'
			})
		}
		
		this.setState({
			state: 'SUBMITTING'
		})
		
		const target = event.target
		
		fetch(target.action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlEncodeFormData(new FormData(target))
		})
		.then(response => {
			if(response.ok) {
				target.reset()
				
				this.recaptcha.current.reset()
				
				this.setState({
					state: 'SUCCESS'
				})
			}
			else {
				this.setState({
					state: 'ERROR'
				})
			}
		})
		.catch(error => {
			this.setState({
				state: 'ERROR'
			})
		})
	}
	render() {
		const state = this.state.state
		
		return pug`
			Layout
				Carousel(showArrows=false showStatus=false showIndicators=false showThumbs=false)
					.slide
						.slider-img-bg(style={
							backgroundImage: 'url(' + slideImg + ')'
						})
						.slider-mask
						.slider-box.container-fluid
							.slider-content
								.slider-hidden
									H3.slider-title(animation=fadeInUp delay='0.8s')
										| Bienvenue sur #[span.nowrap #[span.font-archive M.tech] !]
									P.slider-subtitle(animation=fadeInUp delay='1s') Votre Solutionneur Informatique
								DIV.slider-line(animation=zoomIn delay='0.6s')
								P.slider-text(animation=fadeInUp delay='1.3s')
									| Que vous soyez une entreprise ou un particulier,
									br
									| que vous ayez un problème, une question ou un projet,
									br
									| je suis là pour vous aider et trouver une solution.
				Row.table-box#contact
					Col.gray-bg(lg=6)
						h3 Prenez Contact
						.cell-line
						p
							| Un problème ? Une question ? Une remarque ? Un projet ?
							br
							| Contactez moi ! Je serai ravi de vous répondre et aider.
					Col(lg=6)
						form(
							action='/.netlify/functions/contact'
							method='POST'
							onSubmit=this.handleSubmit
						)
							.form-group
								Input.form-control(
									name='name'
									placeholder='Votre Nom :'
									required
								)
							.form-group
								Input.form-control(
									name='email'
									type='email'
									placeholder='Votre Email :'
									required
								)
							.form-group
								Input.form-control(
									name='message'
									type='textarea'
									placeholder='Votre Message :'
									rows=5
									required
								)
							.form-group
								ReCAPTCHA(ref=this.recaptcha sitekey='6LeNqn0UAAAAAIY_VB9OhZgVTErZ4HGP3Veeyd5q' onChange=this.handleCaptcha)
							if state === 'SUBMITTING'
								.loader
							else
								if state === 'SUCCESS'
									UncontrolledAlert(color='warning') Votre Message a été envoyé. Merci.
								else if state === 'ERROR'
									UncontrolledAlert(color='light') Une erreur s'est produite. Veuillez réessayer plus tard.
								else if state === 'NO_CAPTCHA'
									UncontrolledAlert(color='light') Veuillez valider que vous êtes un humain.
								Button(color='primary' type='submit') Envoyer Votre Message
		`
	}
}