import axios from 'axios'

export async function fetchDataFoods(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		if (
			limit !== undefined &&
			limit !== null &&
			offset !== undefined &&
			offset !== null
		) {
			const foods = await axios.get(
				`${BASEURL}/cyc/warehouse/product?limit=${limit}&offset=${offset}`
			)
			return foods.data
		} else {
			const foods = await axios.get(`${BASEURL}/cyc/warehouse/product`)
			return foods.data
		}
	} catch (err) {
		return null
	}
}
