import axios from 'axios'

export function fetchDataFoods() {
	const BASEURL = process.env.BASEURL
	const foods = axios.get(`${BASEURL}/cyc/product`)
	return foods.then(response => {
		return response.data
	})
}
