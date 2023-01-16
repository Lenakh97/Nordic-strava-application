import { folderNameForWeekNumber } from './lib/weekFolderName'

/**
 * Return the name of the folder for the week previous to the given currentWeekFolder
 */
export const getPreviousFolderName = (currentWeekFolder: string): string => {
	const [, weekNumber] = currentWeekFolder.split('-')
	const week = parseInt(weekNumber, 10)
	if (week <= 1) throw new Error('Strava challenge does not run in Winter!')
	return folderNameForWeekNumber(week - 1)
}
