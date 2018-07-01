import querystring from 'querystring'
import sgMail from '@sendgrid/mail'

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
	if(typeof data['bot-field'] !== 'string' || data['bot-field'].length > 0) {
		return {
			statusCode: 422,
			body: `Oops! Something went wrong.`
		}
	}
	
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
}
		