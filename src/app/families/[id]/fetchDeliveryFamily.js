import axios from 'axios'

export async function fetchDeliveryFamily(familyId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const deliveries = await axios
			.get(`${BASEURL}/cyc/delivery/family/${familyId}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})
		return deliveries.data
	} catch (err) {
		return null
	}
}
