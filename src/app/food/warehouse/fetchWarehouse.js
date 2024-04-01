import axios from 'axios'

export async function fetchWarehouse(warehouseId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const deliveries = await axios.get(
			`${BASEURL}/cyc/warehouse/${warehouseId}`
		)
		return deliveries.data
	} catch (err) {
		return null
	}
}
