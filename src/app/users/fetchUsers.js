import axios from 'axios'

export async function fetchUsers() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const users = await axios.get(`${BASEURL}/shared/user/`)
		return users.data
	} catch (err) {
		return null
	}
}
