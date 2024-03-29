import axios from 'axios'

export async function fetchDataFoods() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const foods = await axios.get(`${BASEURL}/cyc/warehouse/product/`)
		return foods.data
	} catch (err) {
		return null
	}
}
