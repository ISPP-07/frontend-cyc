import axios from 'axios'

export function fetchFamily() {
	const beneficiaries = axios.get(
		'https://65df0d8eff5e305f32a14ed5.mockapi.io/api/v1/cyc/family'
	)
	return beneficiaries.then(response => {
		return response.data
	})
}
