import axios from 'axios'
/**
 * Wrap the interceptor in a function, so that it can be re-instantiated
 */
export function createAxiosInterceptors() {
	// Add a request interceptor if not already attached
	if (axios.interceptors.request.handlers.length === 0) {
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
	}
	if (axios.interceptors.response.handlers.length === 0) {
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
				// Eject all the response interceptors
				axios.interceptors.response.eject(axios.interceptors.response)

				// Use a different axios instance to avoid infinite loop
				const axiosInstance = axios.create()
				return axiosInstance
					.post(process.env.NEXT_PUBLIC_BASE_URL + '/shared/auth/refresh', {
						refresh_token: localStorage.getItem('refresh')
					})
					.catch(error2 => {
						// Retry failed, clean up and reject the promise
						localStorage.removeItem('jwt')
						localStorage.removeItem('refresh')
						window.location.href = '/'
						return Promise.reject(error2)
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
					.finally(createAxiosInterceptors) // Re-attach the interceptor by running the method
			}
		)
	}
}
