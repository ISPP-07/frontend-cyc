import axios from 'axios'
export async function fetchDataUser(userId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const user = await axios
			.get(`${BASEURL}/shared/user/${userId}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})

		return user.data
	} catch (error) {
		return null
	}
}
