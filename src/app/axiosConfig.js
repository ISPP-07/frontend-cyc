import axios from 'axios'
/**
 * Wrap the interceptor in a function, so that it can be re-instantiated
 */
export function createAxiosInterceptors() {
	// clean all the interceptors
	axios.interceptors.request.eject(axios.interceptors.request)
	axios.interceptors.response.eject(axios.interceptors.response)
	// Add a request interceptor
	axios.interceptors.request.use(
		config => {
			// Do something before request is sent
			const token = localStorage.getItem('jwt')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		error => {
			// Do something with request error
			return Promise.reject(error)
		}
	)
	axios.interceptors.response.use(
		response => response,
		error => {
			// Reject promise if usual error
			if (error.response.status !== 403) {
				return Promise.reject(error)
			}

			/*
			 * When response code is 401, try to refresh the token.
			 * Eject the interceptor so it doesn't loop in case
			 * token refresh causes the 401 response.
			 *
			 * Must be re-attached later on or the token refresh will only happen once
			 */
			axios.interceptors.response.eject(axios.interceptors.response)

			return axios
				.post(process.env.NEXT_PUBLIC_BASE_URL + '/shared/auth/refresh', {
					refresh_token: localStorage.getItem('refresh')
				})
				.then(response => {
					localStorage.setItem('jwt', response.data.access_token)
					localStorage.setItem('refresh', response.data.refresh_token)
					error.response.config.headers.Authorization =
						'Bearer ' + response.data.access_token
					// Retry the initial call, but with the updated token in the headers.
					// Resolves the promise if successful
					return axios(error.response.config)
				})
				.catch(error2 => {
					// Retry failed, clean up and reject the promise
					localStorage.removeItem('jwt')
					localStorage.removeItem('refresh')
					window.location.href = '/'
					return Promise.reject(error2)
				})
				.finally(createAxiosInterceptors) // Re-attach the interceptor by running the method
		}
	)
}
