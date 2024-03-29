import exportFromJSON from 'export-from-json'

export default function exportData(datos, nombre) {
	try {
		exportFromJSON({
			data: datos,
			fileName: nombre,
			exportType: exportFromJSON.types.xls
		})
	} catch (error) {
		console.error(error)
		alert('No se han encontrado datos')
	}
}
