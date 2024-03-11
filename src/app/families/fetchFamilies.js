import axios from 'axios'

export async function fetchFamilies() {
    const BASEURL = process.env.BASEURL
    try	{		
        const beneficiaries = await axios.get(
            `${BASEURL}/cyc/family/`)
        return beneficiaries.data
    } catch (err) {
        console.log(err)
    }
}