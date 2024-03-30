import axios from 'axios'

export async function fetchDeliveryFamily(familyId) {
    const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
    try	{		
        const deliveries = await axios.get(
            `${BASEURL}/cyc/delivery/family/${familyId}`)
        return deliveries.data
    } catch (err) {
       return null
    }
}