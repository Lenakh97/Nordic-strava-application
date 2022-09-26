import { startOfDay, startOfWeek } from 'date-fns'
import { readdir, readFile, stat } from 'fs/promises'
import * as path from 'path'
import { getPreviousFolderName } from './getPreviousFolderName'

/**
 * GO THROUGH ALL FILES AND FIND THE TIMESTAMP OF THE LATEST FETCH
 */
export const getStartTimeStamp = async ({
	dataFolder,
	weekFolder,
	now,
}: {
	dataFolder: string
	weekFolder?: string
	now?: Date
}): Promise<number> => {
	if (weekFolder === undefined) {
		const fileArray = await readdir(dataFolder)
		const latestWeekFolder: string | undefined = fileArray
			.filter((folderName) => folderName.includes('week'))
			.sort((folderA, folderB) => folderB.localeCompare(folderA))[0] as
			| string
			| undefined

		console.log(`Latest week folder`, latestWeekFolder)
		if (latestWeekFolder === undefined) {
			// Start midnight today
			return startOfDay(now ?? new Date()).getTime()
		}
		weekFolder = latestWeekFolder
	} else {
		// Week folder is given, check if it exists
		try {
			await stat(path.join(dataFolder, weekFolder))
		} catch {
			// if not return start of week
			return startOfWeek(now ?? new Date()).getTime()
		}
	}

	const allFilesInFolder = await readdir(path.join(dataFolder, weekFolder))
	const latestJSONFile: string | undefined = allFilesInFolder
		.filter((fileName) => fileName.includes('.json'))
		.sort((fileA, fileB) => fileB.localeCompare(fileA))[0] as string | undefined
	if (latestJSONFile === undefined) {
		return getStartTimeStamp({
			dataFolder,
			weekFolder: getPreviousFolderName(weekFolder),
		})
	}

	const JSONFilePath = path.join(dataFolder, weekFolder, latestJSONFile)
	console.log(`Latest week file`, JSONFilePath)
	const rawData = await readFile(JSONFilePath)
	const JSONdata = JSON.parse(rawData.toString())
	if (JSONdata.timestamp === undefined) {
		// JSON is of invalid format, start today at midnight
		return startOfDay(now ?? new Date()).getTime()
	}
	return JSONdata.timestamp
}
