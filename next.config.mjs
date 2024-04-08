import withPWAInit from '@ducanh2912/next-pwa'
/** @type {import('next').NextConfig} */

const nextConfig = {}

const withPWA = withPWAInit({
	dest: 'public',
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	disable: false,
	workboxOptions: {
		disableDevLogs: true
	},
	fallbacks: {
		document: '/~offline'
	}
})

export default withPWA(nextConfig)
