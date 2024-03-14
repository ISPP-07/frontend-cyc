import axios from 'axios'

export async function fetchDeliveries() {
    try	{		
        const deliveries = await axios.get(
            `https://65e22f03a8583365b317ff53.mockapi.io/food/deliveries`)
        return deliveries.data
    } catch (err) {
       return null
    }
}