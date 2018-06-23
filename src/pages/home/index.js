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

const DIV = styled.div`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`
const H3 = styled.h3`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`
const P = styled.p`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`

export default class Page extends React.Component {
	constructor(props) {
		super(props)
		
		this.handleSubmit = this.handleSubmit.bind(this)
		
		this.state = {
			state: 'INPUT'
		}
	}
	handleSubmit(event) {
		event.preventDefault()
		
		this.setState({
			state: 'SUBMITTING'
		})
		
		const data = new FormData(event.target)
		data.append('form-name', event.target.getAttribute('form-name'))
		
		fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data
		})
		.then(() => {
			event.target.reset();
			
			this.setState({
				state: 'SUCCESS'
			})
		})
		.catch(error => {
			console.log(error)
			
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
							method='POST'
							name='contact'
							data-netlify='true'
							data-netlify-honeypot='bot-field'
							onSubmit=this.handleSubmit
						)
							Input(type='hidden' name='form-name' value='contact')
							p.d-none
								label Ne remplissez pas ceci si vous êtes un humain : #[Input(name='bot-field')]
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
							if state === 'SUBMITTING'
								.loader
							else
								if state === 'SUCCESS'
									UncontrolledAlert(color='warning') Votre Message a été envoyé. Merci.
								else if state === 'ERROR'
									UncontrolledAlert(color='light') Une erreur s'est produite. Veuillez réessayer plus tard.
								Button(color='primary' type='submit') Envoyer Votre Message
		`
	}
}