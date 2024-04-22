import axios from 'axios'

export async function fetchFamilies() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const beneficiaries = await axios
			.get(`${BASEURL}/cyc/family`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})
		return beneficiaries.data.elements.filter(
			family => family.derecognition_state === 'Suspended'
		)
	} catch (err) {
		return null
	}
}
