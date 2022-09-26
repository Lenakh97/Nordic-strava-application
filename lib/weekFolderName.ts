import { weekNumber } from './weekNumber.js'

export const weekFolderName = (now?: Date): string =>
	folderNameForWeekNumber(weekNumber(now))

export const folderNameForWeekNumber = (week: number): string =>
	`week-${week.toString().padStart(2, '0')}`
