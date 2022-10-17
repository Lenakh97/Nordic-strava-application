import { promises as fs } from 'fs'
import * as path from 'path'
import { getSummaryFromFolder } from './lib/getSummaryFromFolder.js'
import { weekNumber } from './lib/weekNumber.js'

getSummaryFromFolder({
	folderPath: path.join('data', `week-${weekNumber()}`),
})
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
