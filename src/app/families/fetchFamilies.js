import axios from 'axios'

export function fetchFamilies() {
	const BASEURL = process.env.BASEURL
	const beneficiaries = axios.get(
		`${BASEURL}/cyc/family`)
	return beneficiaries.then(response => {
		return response.data
	})
}
