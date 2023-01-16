import { readdir, readFile } from 'fs/promises'
import * as path from 'path'
import { Summary } from './summarizeStravaData'

/**
 * Find and parse all files as JSON in a directory
 *
 * Assumptions:
 * - folder does ONLY contain JSON files
 * - all JSON files are Summaries
 */
export const collectJSONFilesFromFolder = async ({
	folderPath,
}: {
	folderPath: string
}): Promise<Summary[]> => {
	const files = await readdir(folderPath)
	const parsedFiles = []

	for (const fileName of files) {
		const rawData = await readFile(path.join(folderPath, fileName))
		parsedFiles.push(JSON.parse(rawData.toString()))
	}

	return parsedFiles
}
