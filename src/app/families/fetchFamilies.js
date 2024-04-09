import axios from 'axios'

export async function fetchFamilies(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		if (
			limit !== undefined &&
			limit !== null &&
			offset !== undefined &&
			offset !== null
		) {
			const beneficiaries = await axios.get(
				`${BASEURL}/cyc/family?limit=${limit}&offset=${offset}`
			)
			return beneficiaries.data
		} else {
			const beneficiaries = await axios.get(`${BASEURL}/cyc/family`)
			return beneficiaries.data
		}
	} catch (err) {
		return null
	}
}
