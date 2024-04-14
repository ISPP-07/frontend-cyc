import axios from 'axios'

export async function fetchFamily(familyId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const families = await axios
			.get(`${BASEURL}/cyc/family/${familyId}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})
		return families.data
	} catch (error) {
		return null
	}
}
