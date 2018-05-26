import React from 'react'
import Layout from '../../layouts/default'

import slideImg from './P4265941.jpg'

export default class Page extends React.Component {
	componentDidMount() {
		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			
			elements.each(function() {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationDuration = $this.data('duration');
				var $animationType = 'animated ' + $this.data('animation');
				
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay,
					'-webkit-animation-duration': $animationDuration,
					'animation-duration': $animationDuration,
				});
				
				$this.addClass($animationType).one(animationEndEvents, function() {
					$this.removeClass($animationType);
				});
			});
		}
		
		$(function($) {
			var options = {
				autoplay: true,
				dots: false,
				autoplay: true,
				nextArrow: '<i class="fa fa-long-arrow-right"></i>',
				prevArrow: '<i class="fa fa-long-arrow-left"></i>',
				speed: 800,
				fade: true,
				pauseOnHover: false,
				pauseOnFocus: false
			}
			$('.home-slider').slick(options);
			
			$('.slider-img-bg').each(function() {
				var t = $(this)
				t.css('background-image', "url('" + t.data('background') + "') ")
			});
			
			doAnimations($('div.slide').find('[data-animation]'))
		})
	}
	render() {
		return (
			<Layout>
				<div className="home-slider ani-slider slider" data-slick="{&quot;autoplaySpeed&quot;: 8000}" id="home">
					<div className="slide" data-slick-index="0" aria-hidden="false" tabIndex="0">
						<div className="slider-mask" data-animation="slideUpReturn" data-delay="0.1s"></div>
						<div className="slider-img-bg" data-animation="puffIn" data-animation-duration="0.7s" data-background={slideImg} data-delay="0.2s" data-stellar-ratio="0.8"></div>
						<div className="slider-box container-fluid">
							<div className="slider-content">
								<div className="slider-hidden">
									<h3 className="slider-title" data-animation="fadeInUp" data-delay="0.8s">
										Bienvenue sur <span className="archive">M.TECH</span> !
									</h3>
									<p className="slider-subtitle" data-animation="fadeInUp" data-delay="1s">Votre Solutionneur Informatique</p>
								</div>
								<div className="slider-line" data-animation="zoomIn" data-delay="0.6s"></div>
								<p className="slider-text" data-animation="fadeInUp" data-delay="1.3s">
									Que vous soyez une entreprise ou un particulier,
									<br />
									que vous ayez un problème, une question ou un projet,
									<br />
									je suis là pour vous aider et trouver une solution.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="table-box clearfix row" id="contact">
					<div className="table-cell-box table-content gray-bg col-lg-6">
						<h3>Prenez Contact</h3>
						<div className="cell-line"></div>
						<p>
							Un problème ? Une question ? Une remarque ? Un projet ?
							<br />
							Contactez moi ! Je serai ravi de vous répondre et aider.
						</p>
					</div>
					<div className="table-cell-box table-content col-lg-6">
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
					</div>
				</div>
			</Layout>
		)
	}
}