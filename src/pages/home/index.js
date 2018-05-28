import React from 'react'
import Layout from '../../layouts/default'
import fadeInUp from 'react-animations/lib/fade-in-up'
import zoomIn from 'react-animations/lib/zoom-in'
import styled, { keyframes } from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import { Row, Col } from 'reactstrap';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const DIV = styled.div`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`;
const H3 = styled.h3`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`;
const P = styled.p`
	animation: ${props => props.delay} ${props => keyframes`${props.animation}`};
`;

import slideImg from './P4265941.jpg'

export default class Page extends React.Component {
	render() {
		return (
			<Layout>
				<Carousel showArrows={false} showStatus={false} showIndicators={false} showThumbs={false}>
					<div className="slide">
						<div className="slider-img-bg" style={{backgroundImage: `url(${slideImg})`}}></div>
						<div className="slider-mask"></div>
						<div className="slider-box container-fluid">
							<div className="slider-content">
								<div className="slider-hidden">
									<H3 className="slider-title" animation={fadeInUp} delay="0.8s">
										Bienvenue sur <span className="font-archive">M.TECH</span> !
									</H3>
									<P className="slider-subtitle" animation={fadeInUp} delay="1s">Votre Solutionneur Informatique</P>
								</div>
								<DIV className="slider-line" animation={zoomIn} delay="0.6s"></DIV>
								<P className="slider-text" animation={fadeInUp} delay="1.3s">
									Que vous soyez une entreprise ou un particulier,
									<br />
									que vous ayez un problème, une question ou un projet,
									<br />
									je suis là pour vous aider et trouver une solution.
								</P>
							</div>
						</div>
					</div>
				</Carousel>
				<Row className="table-box" id="contact">
					<Col lg={6} className="gray-bg">
						<h3>Prenez Contact</h3>
						<div className="cell-line"></div>
						<p>
							Un problème ? Une question ? Une remarque ? Un projet ?
							<br />
							Contactez moi ! Je serai ravi de vous répondre et aider.
						</p>
					</Col>
					<Col lg={6}>
						<form action="https://formspree.io/baptiste@monsieur.tech" method="POST" target="_blank">
							<input name="_subject" type="hidden" value="[monsieur.tech] Nouveau Message" />
							<input name="_language" type="hidden" value="fr" />
							<div className="form-group">
								<input className="form-control" name="email" placeholder="Votre Email :" type="email" />
							</div>
							<div className="form-group">
								<textarea className="form-control" name="message" placeholder="Votre Message :" rows="5"></textarea>
							</div>
							<button className="btn btn-primary" type="submit">Envoyer Votre Message</button>
						</form>
					</Col>
				</Row>
			</Layout>
		)
	}
}