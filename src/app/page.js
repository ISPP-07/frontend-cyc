'use client'
import Sidebar from './components/sidebar'
import Searchbar from './components/searchbar'

export default function Home() {
	return (
		<main className="wallpaper">
			<Sidebar />
			<Searchbar />
		</main>
	)
}
