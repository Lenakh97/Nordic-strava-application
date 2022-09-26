import { promises as fs } from 'fs'
import { summarizeData } from './lib/summarizeData.js'
import { weekNumber } from './lib/weekNumber.js'

summarizeData()
	.then(
		async (data) =>
			await fs.writeFile(
				`./data/summary-week-${weekNumber()}.json`,
				JSON.stringify(data, null, 2),
				'utf-8',
			),
	)
	.catch((error) => {
		console.error('Failed to write file')
		console.error(error)
	})
