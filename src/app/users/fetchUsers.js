import axios from 'axios'

export async function fetchUsers() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const users = await axios.get(`${BASEURL}/shared/user/`).catch(err => {
			if (err.response.status === 403 || err.response.status === 401) {
				// redirect to login
				window.location.href = '/'
			}
		})
		return users.data
	} catch (err) {
		return null
	}
}
