import { BrowserRouter as Router } from 'react-router-dom'
import './components.css'

const Sidebar = () => {
	function redirect(event) {
		event.preventDefault()
		const targetUrl = event.currentTarget
			.querySelector('a')
			.getAttribute('href')
		window.location.href = targetUrl
	}
	return (
		<Router>
			<div className="sidebar">
				<div className="box">
					<img src="../../static/cyc.png" className="image"></img>
					<p className="text2">Cirio y Costal</p>
				</div>
				<div className="sidebar-menu">
					<div className="sidebar-menu-item" onClick={redirect}>
						<img src="../../static/family.png" className="lit-img"></img>
						<a href="/link1" className="text3">
							Familias
						</a>
					</div>
					<div className="sidebar-menu-item" onClick={redirect}>
						<img src="../../static/square-plus.png" className="lit-img"></img>
						<a href="/link2" className="text4">
							Dar de alta
						</a>
					</div>
					<div className="sidebar-menu-item" onClick={redirect}>
						<img src="../../static/no-family.png" className="lit-img"></img>
						<a href="/link3" className="text4">
							Familias de baja
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/box.png" className="lit-img"></img>
						<a href="/link4" className="text3">
							Inventario
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/square-plus.png" className="lit-img"></img>
						<a href="/link5" className="text4">
							Añadir elemento
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/truck.png" className="lit-img"></img>

						<a href="/link6" className="text3">
							Entregas
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/square-plus.png" className="lit-img"></img>
						<a href="/link7" className="text4">
							Añadir entregas
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/bell.png" className="lit-img"></img>
						<a href="/link8" className="text3">
							Notificaciones
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/face.png" className="lit-img"></img>
						<a href="/link9" className="text3">
							Usuarios
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/face-plus.png" className="lit-img"></img>
						<a href="/link10" className="text4">
							Crear nuevo ususario
						</a>
					</div>
					<button className="button">Cerrar Sesion</button>
				</div>
			</div>
		</Router>
	)
}
export default Sidebar
