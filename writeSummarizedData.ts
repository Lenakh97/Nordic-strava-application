import { promises as fs } from 'fs'
import * as path from 'path'
import { collectJSONFilesFromFolder } from './lib/collectJSONFilesFromFolder.js'
import { summarizeWeeklyDataTeam } from './lib/summarizeWeeklyDataTeam.js'
import { weekFolderName } from './lib/weekFolderName.js'

collectJSONFilesFromFolder({
	folderPath: path.join('data', `${weekFolderName()}`),
})
	.then(async (data) => {
		const weekly_summary = summarizeWeeklyDataTeam({ summaries: data })
		await fs.writeFile(
			`./data/summary-${weekFolderName()}.json`,
			JSON.stringify(weekly_summary, null, 2),
			'utf-8',
		)
	})
	.catch((error) => {
		console.error('Failed to write file')
		console.error(error)
		process.exit(1)
	})
