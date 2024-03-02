import axios from 'axios'

export function fetchDataFoods() {
	const foods = axios.get(
		'https://65e22f03a8583365b317ff53.mockapi.io/food/food'
	)
	return foods.then(response => {
		return response.data
	})
}