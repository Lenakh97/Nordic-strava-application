import { readFile } from 'fs/promises'
import * as path from 'path'
import { Summary } from './summarizeStravaData'

export const readFileFromFolder = async ({
	folderPath,
	files,
}: {
	folderPath: string
	files: string
}): Promise<Summary> => {
	const rawData = await readFile(path.join(folderPath, files))
	return JSON.parse(rawData.toString())
}
