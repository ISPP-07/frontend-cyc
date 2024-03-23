import axios from 'axios'

export async function fetchFamily(familyId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const families = await axios.get(`${BASEURL}/cyc/family/${familyId}`)
		return families.data
	} catch (error) {
		return null
	}
}
