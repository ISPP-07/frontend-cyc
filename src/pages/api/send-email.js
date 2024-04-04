import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const msg = {
			to: 'harmonyltd@outlook.es',
			from: process.env.EMAIL_USER,
			subject: 'No hay accesso a CyC',
			text: 'No se puede acceder a la aplicación CyC. Por favor, compruebe el sistema cuanto antes.'
		}

		try {
			await sgMail.send(msg)
			res.status(200).json({ success: true })
		} catch (error) {
			console.error(error)

			if (error.response) {
				console.error(error.response.body)
			}

			res.status(500).json({ error: 'Error sending email' })
		}
	} else {
		res.status(200).json({ name: 'Email API' })
	}
}
