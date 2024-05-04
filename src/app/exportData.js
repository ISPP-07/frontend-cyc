export function exportData(datos, nombre, columnas, duplicatedColumns = false) {
	try {
		const xlsx = require('xlsx')
		let ws
		if (!duplicatedColumns) {
			const translated = []
			// Columnas contains translations for the object keys. ej. {name: 'Nombre'}
			for (let i = 0; i < datos.length; i++) {
				translated.push({})
				for (const key in datos[i]) {
					if (columnas[key]) {
						translated[i][columnas[key]] = datos[i][key]
					}
				}
			}
			ws = xlsx.utils.json_to_sheet(translated)
		} else {
			ws = xlsx.utils.json_to_sheet(datos)
			// Create array of column names
			const headers = []
			for (const key in columnas) {
				headers.push(columnas[key])
			}
			xlsx.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' })
		}

		// Create file
		const wb = xlsx.utils.book_new()
		xlsx.utils.book_append_sheet(wb, ws, 'Data')
		xlsx.writeFile(wb, `${nombre}.xlsx`)

		// Download file to user browser
		const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'array' })
		const blob = new Blob([wbout], { type: 'application/octet-stream' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `${nombre}.xlsx`
		a.click()
		URL.revokeObjectURL(url)
	} catch (error) {
		console.error(error)
		alert('No se han encontrado datos')
	}
}
