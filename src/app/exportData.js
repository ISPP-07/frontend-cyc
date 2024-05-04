export function exportData(datos, nombre, columnas) {
	try {
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
		const xlsx = require('xlsx')
		// Create file
		const ws = xlsx.utils.json_to_sheet(translated)
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
