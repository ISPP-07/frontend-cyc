import { BrowserRouter as Router } from 'react-router-dom'

const Searchbar = () => {
	return (
		<Router>
			<input className="searchbar" type="text" placeholder=" Buscar.. " />
		</Router>
	)
}
export default Searchbar
