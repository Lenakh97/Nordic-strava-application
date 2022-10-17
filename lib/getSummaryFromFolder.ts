import { readFileFromFolder } from './readFileFromFolder'
import { Summary } from './summarizeStravaData'
import { summarizeWeeklyDataTeam } from './summarizeWeeklyDataTeam'

export const getSummaryFromFolder = async ({
	folderPath,
}: {
	folderPath: string
}): Promise<Summary> => {
	const JSONdataArray = await readFileFromFolder({ folderPath })
	const summarize_weekly = summarizeWeeklyDataTeam({ JSONdataArray })
	return summarize_weekly
}
