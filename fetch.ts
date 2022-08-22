import { promises as fs } from 'fs'
import { getStravaData } from './getStravaData.js'

getStravaData()
	.then(
		async (data) =>
			await fs.writeFile(
				`data-${new Date().toISOString()}.json`,
				JSON.stringify(data, null, 2),
				'utf-8',
			),
	)
	.catch((error) => {
		console.error('Failed to write to shadow')
		console.error(error)
	})
