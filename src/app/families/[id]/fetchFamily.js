import axios from 'axios'

export function fetchFamily(familyId) {
	const BASEURL = process.env.BASEURL
	const beneficiaries = axios.get(
		`${BASEURL}/cyc/family/${familyId}`)
	return beneficiaries.then(response => {
		return response.data
	})
}
