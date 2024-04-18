import axios from 'axios'

export async function fetchDataWarehouse() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const deliveries = await axios
			.get(`${BASEURL}/cyc/warehouse`)
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
