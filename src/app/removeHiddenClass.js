/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function removeHiddenClass() {
	const loader = document.getElementById('loader')
	if (loader.classList.contains('hidden')) {
		loader.classList.remove('hidden')
	}
}
