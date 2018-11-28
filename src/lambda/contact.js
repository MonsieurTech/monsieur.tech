import querystring from 'querystring'
import Recaptcha from 'recaptcha2'
import sgMail from '@sendgrid/mail'

const recaptcha = new Recaptcha({
	siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
	secretKey: process.env.GOOGLE_RECAPTCHA_PRIVATE_KEY
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers('%', '%')

exports.handler = async (event, context) => {
	if(event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: 'Method Not Allowed'
		}
	}
	
	const data = querystring.parse(event.body)
	if(typeof data['g-recaptcha-response'] !== 'string' || data['g-recaptcha-response'].length === 0 || typeof data.message !== 'string' || data.message.length === 0) {
		return {
			statusCode: 400,
			body: `Oops! Something went wrong.`
		}
	}
	
	return recaptcha.validate(data['g-recaptcha-response'])
		.then(() => {
			return sgMail.send({
				from: process.env.CONTACT_FROM,
				to: process.env.CONTACT_TO,
				template_id: process.env.CONTACT_TEMPLATE_ID,
				substitutions: {
					name: data.name,
					email: data.email,
					message: data.message
				}
			})
			.then(() => ({
				statusCode: 200,
				body: ''
			}))
			.catch(error => {
				console.log(error)
				
				return {
					statusCode: 422,
					body: `Oops! Something went wrong.`
				}
			})
		})
		.catch(error => {
			return {
				statusCode: 401,
				body: `Not human!`
			}
		})
}
		