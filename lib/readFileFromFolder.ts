import { readdir, readFile } from 'fs/promises'
import * as path from 'path'
import { Summary } from './summarizeStravaData'

export const readFileFromFolder = async ({
	folderPath,
}: {
	folderPath: string
}): Promise<Summary[]> => {
	const fileArray = await readdir(folderPath)
	const JSONdataArray = []

	for (const files of fileArray) {
		const rawData = await readFile(path.join(folderPath, files))
		JSONdataArray.push(JSON.parse(rawData.toString()))
	}

	return JSONdataArray
}
