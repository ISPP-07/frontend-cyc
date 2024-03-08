import exportFromJSON from 'export-from-json'

function exportData(datos, nombre) {
	exportFromJSON({
		data: datos,
		fileName: nombre,
		exportType: exportFromJSON.types.xls
	})
}

export default exportData
