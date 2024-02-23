'use client'
import Searchbar from './components/searchbar'
import Sidebar from './components/sidebar'

export default function Home() {
	return (
		<main className='wallpaper'>
			<Sidebar/>
			<Searchbar/>
		</main>
	)
}
