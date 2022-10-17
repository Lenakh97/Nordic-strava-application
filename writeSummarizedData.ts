import { promises as fs } from 'fs'
import * as path from 'path'
import { collectJSONFilesFromFolder } from './lib/collectJSONFilesFromFolder.js'
import { summarizeWeeklyDataTeam } from './lib/summarizeWeeklyDataTeam.js'
import { weekNumber } from './lib/weekNumber.js'

collectJSONFilesFromFolder({
	folderPath: path.join('data', `week-${weekNumber()}`),
})
	.then(async (data) => {
		const weekly_summary = summarizeWeeklyDataTeam({ summaries: data })
		await fs.writeFile(
			`./data/summary-week-${weekNumber()}.json`,
			JSON.stringify(weekly_summary, null, 2),
			'utf-8',
		)
	})
	.catch((error) => {
		console.error('Failed to write file')
		console.error(error)
		process.exit(1)
	})
