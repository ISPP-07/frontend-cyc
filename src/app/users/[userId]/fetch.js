import axios from 'axios'
export async function fetchDataUser(userId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const user = await axios.get(`${BASEURL}/shared/user/${userId}`)
		return user.data
	} catch (error) {
		return null
	}
}
