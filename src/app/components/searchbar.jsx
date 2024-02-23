import { BrowserRouter as Router } from 'react-router-dom'

const Searchbar = () => {
	return (
		<Router>
			<input className="relative top-[20px] left-[350px] rounded-3xl border  h-10 font-Varela w-[1000px] text-black indent-2.5" type="text" placeholder=" Buscar.. " />
		</Router>
	)
}
export default Searchbar
