import axios from 'axios'

export async function fetchDataWarehouse() {
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
    try	{		
        const deliveries = await axios.get(
            `${BASEURL}/cyc/warehouse`)
        return deliveries.data
    } catch (err) {
       return null
    }
}