import axios from 'axios'

export async function fetchDataFoods() {
	const BASEURL = process.env.BASEURL
	try {
		const foods = await axios.get(`${BASEURL}/cyc/product`)
		return foods.data
	} catch (err) {
		console.log(err)
	}
}
