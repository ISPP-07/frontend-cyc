import axios from 'axios'

export async function fetchDeliveries(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		if (
			limit !== undefined &&
			limit !== null &&
			offset !== undefined &&
			offset !== null
		) {
			const deliveries = await axios.get(
				`${BASEURL}/cyc/delivery?limit=${limit}&offset=${offset}`
			)
			return deliveries.data
		} else {
			const deliveries = await axios.get(`${BASEURL}/cyc/delivery`)
			return deliveries.data
		}
	} catch (err) {
		return null
	}
}
