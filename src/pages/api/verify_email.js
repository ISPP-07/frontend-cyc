import axios from 'axios'
const EMAIL_API_KEY = process.env.VALIDATION_EMAIL_API_KEY
const X_RAPIDAPI_KEY = process.env.X_RAPID_API_KEY

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email
		const options = {
			method: 'GET',
			url: 'https://quickemailverification.p.rapidapi.com/v1/verify',
			params: {
				email
			},
			headers: {
				Authorization: EMAIL_API_KEY,
				'X-RapidAPI-Key': X_RAPIDAPI_KEY,
				'X-RapidAPI-Host': 'quickemailverification.p.rapidapi.com'
			}
		}

		try {
			const response = await axios.request(options)
			if (response.data.result === 'valid') {
				res.status(200).json({ success: true })
			} else if (response.status === 429) {
				res.status(429).json({ error: 'Too many requests' })
			} else {
				res.status(400).json({ error: 'Invalid email' })
			}
		} catch (error) {
			res.status(500).json({ error: 'Invalid request' })
		}
	}
}
