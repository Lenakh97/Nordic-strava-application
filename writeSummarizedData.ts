import { promises as fs } from 'fs'
import { weekNumber } from './lib/getWeek.js'
import { summarizeData } from './lib/summarizeData.js'

summarizeData()
	.then(
		async (data) =>
			await fs.writeFile(
				`./data/summary-week-${weekNumber}.json`,
				JSON.stringify(data, null, 2),
				'utf-8',
			),
	)
	.catch((error) => {
		console.error('Failed to write file')
		console.error(error)
	})
