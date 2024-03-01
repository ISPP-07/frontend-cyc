import axios from 'axios'

export function fetchFamily() {
	const beneficiaries = axios.get(
		'https://65d9c9f1bcc50200fcdc1cb8.mockapi.io/family'
	)
	return beneficiaries.then(response => {
		return response.data
	})
}
