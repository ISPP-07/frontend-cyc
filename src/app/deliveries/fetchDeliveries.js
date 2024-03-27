import axios from 'axios'

export async function fetchDeliveries() {
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
    try	{		
        const deliveries = await axios.get(
            `${BASEURL}/cyc/delivery`)
        return deliveries.data
    } catch (err) {
       return null
    }
}