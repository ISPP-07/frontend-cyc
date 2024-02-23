import { BrowserRouter as Router } from 'react-router-dom'
import "./components.css"

export default function Sidebar ({children}) {
	return (
		<Router>
			<div className="absolute h-screen rounded-md border border-solid w-[300px] shadow-xl">
				<div className="absolute h-32 bg-white rounded-none w-[299px] ">
					<img src="../../static/cyc.png" className="absolute w-24 h-24 rounded-none top-[21px] left-[27px]"></img>
					<p className="absolute text-3xl font-bolds top-[21px] left-[171px] right-[20px] text-black font-Varela">Cirio y Costal</p>
				</div>
				<div className="absolute top-[138px] w-[300px] flex flex-col leading-6 opacity-100 gap-[12px]">
					<div className="sidebar-menu-item" onClick>
						<img src="../../static/family.png" className="relative left-[10px]"></img>
						<a href="/link1" className="text3">
							Familias
						</a>
					</div>
					<div className="sidebar-menu-item" onClick>
						<img src="../../static/square-plus.png" className="relative left-[30px]"></img>
						<a href="/link2" className="text4">
							Dar de alta
						</a>
					</div>
					<div className="sidebar-menu-item" onClick>
						<img src="../../static/no-family.png" className="relative left-[30px]"></img>
						<a href="/link3" className="text4">
							Familias de baja
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/box.png" className="relative left-[10px]"></img>
						<a href="/link4" className="text3">
							Inventario
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/square-plus.png" className="relative left-[30px]"></img>
						<a href="/link5" className="text4">
							Añadir elemento
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/truck.png" className="relative left-[10px]"></img>

						<a href="/link6" className="text3">
							Entregas
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/square-plus.png" className="relative left-[30px]"></img>
						<a href="/link7" className="text4">
							Añadir entregas
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/bell.png" className="relative left-[10px]"></img>
						<a href="/link8" className="text3">
							Notificaciones
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/face.png" className="relative left-[10px]"></img>
						<a href="/link9" className="text3">
							Usuarios
						</a>
					</div>
					<div className="sidebar-menu-item">
						<img src="../../static/face-plus.png" className="relative left-[30px]"></img>
						<a href="/link10" className="text4">
							Crear nuevo ususario
						</a>
					</div>
					<button className="absolute w-48 h-8 flex items-center justify-center text-sm font-normal leading-5 top-[450px] left-[45px] font-Varela text-black rounded-3xl bg-red-500 shadow-xl">
						Cerrar Sesión</button>
				</div>
			</div>
		</Router>
	)
}
